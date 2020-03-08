<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/master/docs/assets/lottie.gif">
</h1>

<div align="center">
  <strong>A minimal customizable performance-stable Angular component for rendering After Effects animations. Compatible with Angular 9+.</strong>
</div>

<br/>

<div align="center">
  <!-- CircleCI -->
  <a href="https://circleci.com/gh/ngx-lottie/ngx-lottie/tree/master">
    <img src="https://circleci.com/gh/ngx-lottie/ngx-lottie/tree/master.svg?style=svg" alt="CircleCI">
  </a>

  <!-- License -->
  <a href="https://github.com/ngx-lottie/ngx-lottie/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="Licence: MIT">
  </a>

  <!-- Package -->
  <a href="https://www.npmjs.com/package/ngx-lottie">
    <img src="https://badge.fury.io/js/ngx-lottie.svg" alt="npm version" height="18">
  </a>

  <!-- Dependecies -->
  <img alt="David" src="https://img.shields.io/david/ngx-lottie/ngx-lottie.svg">
</div>

## Table of contents

- [Features](#features)
- [Quick example](#quick-example)
- [Installation](#installation)
- [Usage](#usage)
- [Caching](#caching)
- [API](#api)
- [Optimizations](#optimizations)
- [Server side rendering](#server-side-rendering)

## Features

- **rich:** `ngx-lottie` provides more opportunities to work with API exposed by Lottie
- **strict:** all types of objects and events are available to you
- **performant:** the `lottie-web` library can be loaded synchronously or on demand

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

To install `ngx-lottie` run the following command:

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
  return import('lottie-web');
}

@NgModule({
  imports: [LottieModule.forRoot({ player: playerFactory })],
})
export class AppModule {}
```

Now you can simply use the `ng-lottie` component and provide your custom options via the `options` binding:

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

Also it's possible to use the `lottie` directive if you'd like to provide your own custom container and control it:

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

Notice that you will need to import the `LottieModule` into other modules as it exports `ng-lottie` component and `lottie` directive. But `forRoot` has to be called only once!

## Caching

`lottie-web` will load your JSON file every time when animation is created. When importing the `LottieModule` into the root module you can provide the `useCache` option:

```ts
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    LottieModule.forRoot({
      player: playerFactory,
      useCache: true,
    }),
  ],
})
export class AppModule {}
```

This will enable cache under the hood. Since the cache is enabled your JSON file will be loaded only once.

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

## Optimizations

The `ng-lottie` component is marked with `OnPush` change detection strategy. This means it will not be checked in any phase of the change detection mechanism until you change the reference to some binding. For example if you use an `svg` renderer and there are a lot DOM elements projected — you would like to avoid checking this component, as it's not necessary.

`AnimationItem` events are listened outside of the Angular zone. You shouldn't worry that animation events will cause change detection every ms.

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
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }
}
```

## Server side rendering

By default, `lottie` will load your `json` file with animation data every time you create an animation. You may have some problems with the connection, so there may be some delay or even timeout. It's worth loading animation data only once and cache it on the client side, so every time you create an animation — the animation data will be retrieved from cache.

`ngx-lottie/server` package gives you the opportunity to preload animation data and cache it using `TransferState`.

### How2?

TL;DR - see `integration` folder.

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
        folder: 'dist/assets',
        animations: ['data.json'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

Don't forget to import `BrowserTransferStateModule` into your `AppModule`. Let's look at these options. `animations` is an array of `json` files, that contain animation data, that should be read on the server side, cached and transfered on the client. `folder` is a path where your `json` files are located, but you should use it properly, this path is joined with the `process.cwd()`. Imagine such project structure:

```
— dist (here you store your output artifacts)
  — project-name
    — assets
    — index.html
    — main.hash.js
— dist-server
  — server.js
— src (here is your app)
— angular.json
— package.json
— webpack.config.js
```

If you start a server from the root folder like `node dist-server/server`, thus the `folder` property should equal `dist/project-name/assets`.

After installing `LottieServerModule` - now you have to import `LottieTransferState` from the `ngx-lottie` package. Don't worry, this service is tree-shakable and won't be bundled if you don't inject it anywhere.

Inject this service into your component where you declare animation options:

```typescript
import { Component } from '@angular/core';
import { AnimationOptions, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options"></ng-lottie>
  `,
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
