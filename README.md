<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/master/docs/assets/lottie.gif">
</h1>

<div align="center">
  <strong>A minimal customizable performance-stable Angular component for rendering After Effects animations. Compatible with Angular 9+.</strong>
</div>

<br/>

<div align="center">
  <!-- GitHub Actions -->
  <a href="https://github.com/ngx-lottie/ngx-lottie/actions/workflows/ngx-lottie.yml">
    <img src="https://github.com/ngx-lottie/ngx-lottie/actions/workflows/ngx-lottie.yml/badge.svg?branch=master" alt="GitHubActions" />
  </a>

  <!-- License -->
  <a href="https://github.com/ngx-lottie/ngx-lottie/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="Licence: MIT" />
  </a>

  <!-- Package -->
  <a href="https://www.npmjs.com/package/ngx-lottie">
    <img src="https://badge.fury.io/js/ngx-lottie.svg" alt="npm version" height="18" />
  </a>

  <!-- Dependecies -->
  <img alt="David" src="https://img.shields.io/david/ngx-lottie/ngx-lottie.svg" />
</div>

## Table of contents

- [Features](#features)
- [Quick example](#quick-example)
- [Installation](#installation)
- [Usage](#usage)
- [Updating animation](#updating-animation)
- [Listening to lottie-web events](#listening-to-lottie-web-events)
- [Caching](#caching)
- [API](#api)
- [Reducing lottie-web bundle size](#reducing-lottie-web-bundle-size)
- [Optimizations](#optimizations)
- [Server side rendering](#server-side-rendering)
- [Potential pitfalls](#potential-pitfalls)

## Features

- **rich:** `ngx-lottie` provides more opportunities to work with API exposed by Lottie
- **strict:** all types of objects and events are available to you
- **performant:** the `lottie-web` library can be loaded synchronously or on-demand

## Quick example

```html
<ng-lottie
  width="600px"
  height="500px"
  containerClass="moving-box another-class"
  [styles]="styles"
  [options]="options"
  (animationCreated)="animationCreated($event)"
  (configReady)="configReady()"
  (dataReady)="dataReady()"
  (domLoaded)="domLoaded()"
  (enterFrame)="enterFrame($event)"
  (segmentStart)="segmentStart($event)"
  (complete)="complete($event)"
  (loopComplete)="loopComplete($event)"
  (destroy)="destroy($event)"
  (error)="error($event)"
></ng-lottie>
```

## Installation

To install `ngx-lottie`, run the following command:

```bash
npm i lottie-web ngx-lottie
# Or if you use yarn
yarn add lottie-web ngx-lottie
```

## Usage

First, import the `LottieModule` into the `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [LottieModule.forRoot({ player: playerFactory })],
})
export class AppModule {}
```

The `lottie-web` library can be loaded on demand using dynamic import. Webpack will load this library only when your animation gets rendered for the first time. Given the following code:

```ts
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  imports: [LottieModule.forRoot({ player: playerFactory })],
})
export class AppModule {}
```

Now you can use the `ng-lottie` component and provide your custom options via the `options` binding.

```typescript
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
  `,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
```

Also, it's possible to use the `lottie` directive if you'd like to provide your custom container and manage it:

```typescript
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <main lottie [options]="options" (animationCreated)="animationCreated($event)"></main>
  `,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
```

Note that you will need to import the `LottieModule` into other modules as it exports the `ng-lottie` component, and the `lottie` directive. `forRoot` has to be called only once!

## Updating animation

If you want to update the animation dynamically then you have to update the animation options immutably. Let's look at the following example:

```ts
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
    <button (click)="updateAnimation()">Update animation</button>
  `,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  updateAnimation(): void {
    // ⚠️⚠️ Don't do this!
    this.options.path = '/assets/new-animation.json';

    // ✔️✔️ Update `options` in this way
    this.options = {
      ...this.options, // In case you have other properties that you want to copy
      path: '/assets/new-animation.json',
    };
  }
}
```

If you want to update options relying on a response from the server, then you'll have to call `markForCheck` to make sure that Angular will run the change detection if `ng-lottie` is inside a `ChangeDetectionStrategy.OnPush` component:

```ts
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
    <button (click)="updateAnimation()">Update animation</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  constructor(private ref: ChangeDetectorRef, private animationService: AnimationService) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  updateAnimation(): void {
    this.animationService.loadAnimationOptions().subscribe(options => {
      this.options = options;
      this.ref.markForCheck();
    });
  }
}
```

You can also store options in `BehaviorSubject` and bind them via the `async` pipe in a template:

```ts
@Component({
  selector: 'app-root',
  template: `
    <ng-lottie
      [options]="options$ | async"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>

    <button (click)="updateAnimation()">Update animation</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  options$ = new BehaviorSubject<AnimationOptions>({
    path: '/assets/animation.json',
  });

  constructor(private ref: ChangeDetectorRef, private animationService: AnimationService) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  updateAnimation(): void {
    this.animationService.loadAnimationOptions().subscribe(options => {
      this.options$.next(options);
    });
  }
}
```

## Listening to `lottie-web` events

The `ng-lottie` adds event listeners to those events that are listened outside. This means that if you've got the following code:

```html
<ng-lottie (loopComplete)="onLoopComplete()"></ng-lottie>
```

In the above example, the `ng-lottie` will only listen to the `loopComplete` event on the `AnimationItem` under the hood. One important note that all events are handled outside of the Angular zone:

```ts
ngZone.runOutsideAngular(() => {
  animationItem.addEventListener('loopComplete', () => {});
});
```

I made such a design decision because animation items can emit hundreds and thousands of events every second. The `lottie-web` emits some events asynchronously by wrapping them into `setTimeout` internally. If thousands of events occur during a single second, then Angular will run change detection a thousand times, drastically decreasing performance.

Therefore, event handlers will be called outside of the Angular zone:

```ts
import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: ` <ng-lottie [options]="options" (loopComplete)="onLoopComplete()"></ng-lottie> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  onLoopComplete(): void {
    NgZone.assertNotInAngularZone();
    console.log(NgZone.isInAngularZone()); // false
  }
}
```

Therefore you need:

- either call `NgZone.run()`
- either call change detection manually via `ChangeDetectorRef.detectChanges()`
- either mark component to be checked via `ChangeDetectorRef.markForCheck()`

```ts
import { Component, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

// Angular 9+
import { ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options" (loopComplete)="onLoopComplete()"></ng-lottie>
    <p>On loop complete called times = {{ onLoopCompleteCalledTimes }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  onLoopCompleteCalledTimes = 0;

  constructor(private ngZone: NgZone, private ref: ChangeDetectorRef) {}

  onLoopComplete(): void {
    // * first option via `NgZone.run()`
    this.ngZone.run(() => {
      this.onLoopCompleteCalledTimes++;
    });

    // * second option via `ChangeDetectorRef.detectChanges()`
    this.onLoopCompleteCalledTimes++;
    this.ref.detectChanges();
    // Angular 9+
    detectChanges(this);

    // * third option via `ChangeDetectorRef.markForCheck()`
    this.onLoopCompleteCalledTimes++;
    this.ref.markForCheck();
    // Angular 9+
    markDirty(this);
  }
}
```

## Caching

The `lottie-web` will load your JSON file whenever animation is created. When importing the `LottieModule` into the root module, you can also import the `LottieCacheModule`:

```ts
import { NgModule } from '@angular/core';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  imports: [LottieModule.forRoot({ player: playerFactory }), LottieCacheModule.forRoot()],
})
export class AppModule {}
```

This will enable cache under the hood. Since the cache is enabled, `ngx-lottie` will load your JSON file only once.

## API

### Bindings

The `ng-lottie` component supports the following bindings:

```ts
@Component({
  selector: 'app-root',
  template: `
    <ng-lottie
      width="500px"
      height="600px"
      containerClass="moving-box"
      [styles]="styles"
      [options]="options"
    ></ng-lottie>
  `,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };
}
```

- `options: AnimationOptions` options used by `AnimationItem`
- `width?: string` container element width in pixels. Bound to `[style.width]`. You can provide any CSS unit, e.g. `100em`
- `height?: string` container element height in pixels. Bound to `[style.height]`. You can provide any CSS unit, e.g. `100em`
- `styles?: Partial<CSSStyleDeclaration>` custom styles object. Bound to `[ngStyle]`
- `containerClass?: string` custom container class(es). Bound to `[ngClass]`.

The `lottie` directive supports only `options` binding.

### Events

| @Output()        | Type                                            | Required | Description                                                                                                             |
| ---------------- | ----------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| animationCreated | `AnimationItem`                                 | optional | Dispatched after the `lottie` successfully creates animation                                                            |
| configReady      | `void`                                          | optional | Dispatched after the needed renderer is configured                                                                      |
| dataReady        | `void`                                          | optional | Dispatched when all parts of the animation have been loaded                                                             |
| domLoaded        | `void`                                          | optional | Dispatched when elements have been added to the DOM                                                                     |
| enterFrame       | `BMEnterFrameEvent`                             | optional | Dispatched after entering the new frame                                                                                 |
| segmentStart     | `BMSegmentStartEvent`                           | optional | Dispatched when the new segment is adjusted                                                                             |
| loopComplete     | `BMCompleteLoopEvent`                           | optional | Dispatched after completing frame loop                                                                                  |
| complete         | `BMCompleteEvent`                               | optional | Dispatched after completing the last frame                                                                              |
| destroy          | `BMDestroyEvent`                                | optional | Dispatched in the `ngOnDestroy` hook of the service that manages `lottie`'s events, it's useful for releasing resources |
| error            | `BMRenderFrameErrorEvent OR BMConfigErrorEvent` | optional | Dispatched if the lottie player could not render some frame or parse the config                                         |

## Reducing `lottie-web` bundle size

The size of the `lottie-web` library is quite large. Because when we write this:

```ts
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

// Or if you load `lottie-web` on demand
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
```

It bundles all 3 renderers: `CanvasRenderer`, `SVGRenderer` and `HybridRenderer`. The `SVGRenderer` is used by default. If you don't care which renderer is used and never provide the `renderer` option, you might want to exclude `CanvasRenderer` and `HybridRenderer`. To do this, just import the `lottie_svg` file that is inside the `lottie-web/build/player` folder:

```ts
import player from 'lottie-web/build/player/lottie_svg';

export function playerFactory() {
  return player;
}

// Or if you load `lottie-web` on demand
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web/build/player/lottie_svg');
}
```

Its minified size is `198 KiB`.

You can also use the `lottie-web` light version. As Hernan Torrisi (author of `lottie-web`) explains:

> It should work fine, but animations won't render correctly if they have expressions or effects.

The light version can be imported using the following code:

```ts
import player from 'lottie-web/build/player/lottie_light';

export function playerFactory() {
  return player;
}

// Or if you load `lottie-web` on demand
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web/build/player/lottie_light');
}
```

Its minified size is `148 KiB`. Use this at your own risk because I can't know if your animations contain expressions or effects.

## Optimizations

The `ng-lottie` component is marked with the `OnPush` change detection strategy. This means Angular will not check it in any phase of the change detection mechanism until you change the reference to some binding. For example, if you use an `svg` renderer and there are a lot of DOM elements projected — you would like to avoid checking this component, as it's not necessary.

The `ngx-lottie` listens to `AnimationItem` events outside of the Angular zone. It would be best if you didn't worry that animation events will cause change detection every ms.

**But be careful!** Always wrap any calls to `AnimationItem` methods in `runOutsideAngular`. See the below code:

```ts
import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>

    <button (click)="stop()">Stop</button>
    <button (click)="play()">Play</button>
  `,
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {}

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.stop();
    });
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.play();
    });
  }
}
```

## Server-side rendering

By default, `lottie-web` will load your JSON file with animation data every time you create an animation. You may have some problems with the connection, so there may be some delay or even timeout. It's worth loading animation data only once and cache it on the client-side, so every time you create an animation — `ngx-lottie` will retrieve the animation data from the cache.

`ngx-lottie/server` package gives you the opportunity to preload animation data and cache it using `TransferState`.

### How2?

TL;DR - see the `integration` folder.

Import the `LottieServerModule` into your `AppServerModule`:

```typescript
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { LottieServerModule } from 'ngx-lottie/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // `AppModule` first as you know
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    LottieServerModule.forRoot({
      preloadAnimations: {
        folder: 'dist/browser/assets',
        animations: ['data.json'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

Don't forget to import the `BrowserTransferStateModule` into your `AppModule`. Let's look at these options. `animations` is an array of JSON files that contain animation data that Node.js should read on the server-side, cache and transfer to the client. `folder` is a path where your JSON files are located, but you should use it properly, this path is joined with the `process.cwd()`. Assume such a project structure:

```
— dist (here you store your output artifacts)
  — browser
    — assets
    — index.html
    — main.hash.js
  - server
    - main.js
— src (here is your app)
— angular.json
— package.json
— webpack.config.js
```

If you start a server from the root folder like `node dist/server/main`, thus the `folder` property should equal `dist/browser/assets`.

You now can inject the `LottieTransferState` in your components from the `ngx-lottie` package. It's tree-shakable by default and won't get bundled until you inject it anywhere:

```typescript
import { Component } from '@angular/core';
import { AnimationOptions, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: ` <ng-lottie [options]="options"></ng-lottie> `,
})
export class AppComponent {
  options: AnimationOptions = {
    animationData: this.lottieTransferState.get('data.json'),
  };

  constructor(private lottieTransferState: LottieTransferState) {}
}
```

Notice, `data.json` is a filename that you pass to the `preloadAnimations.animations` property. Finally change this:

```typescript
platformBrowserDynamic().bootstrapModule(AppModule);
```

To this:

```typescript
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
```

## Potential pitfalls

There is only one potential pitfall associated with animations in the Safari browser. Also, this known issue is in the `lottie-web` library itself. Library consumers have been trying to resolve that issue using different solutions. The only solution that helped most people was installing the latest version of the `lottie-web`.
