<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/master/docs/assets/icon_lottie.png">
</h1>

<div align="center">
  <strong>A minimal customizable performance-stable Angular component for rendering After Effects animations.</strong>
</div>

<br/>

<div align="center">
  <!-- AppVeyor -->
  <a href="https://ci.appveyor.com/project/arturovt/ngx-lottie/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/96b90w7hnxpo2lgr/branch/master?svg=true" alt="Build status">
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
- [API](#api)
- [Optimizations](#optimizations)
- [Server side rendering](#server-side-rendering)

## Features
- __rich:__ `ngx-lottie` provides more opportunities to work with API exposed by Lottie
- __strict:__ all types of objects and events are available to you
- __performant:__ the `lottie` library is loaded on demand

## Quick example

```html
<ng-lottie
  width="600"
  height="500"
  containerClass="moving-box"
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
></ng-lottie>
```

## Installation

To install `ngx-lottie` run the following command:

```console
npm i lottie-web ngx-lottie
# or if you're using yarn
yarn add lottie-web ngx-lottie
```

## Usage

First, import the `LottieModule` to any of your modules:

```typescript
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  imports: [
    LottieModule
  ]
})
export class AppModule {}
```

Now you can simple use an `ng-lottie` component and provide your custom options via the `options` binding:

```typescript
import { Component } from '@angular/core';
import { LottieOptions, AnimationItem } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `
})
export class AppComponent {
  public options: LottieOptions = {
    path: '/assets/animation.json'
  };

  public animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
```

Also it's possible to use a `lottie` directive if you'd like to provide your own custom container and play with it:

```typescript
import { Component } from '@angular/core';
import { LottieOptions, AnimationItem } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <main
      lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></main>
  `
})
export class AppComponent {
  public options: LottieOptions = {
    path: '/assets/animation.json'
  };

  public animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
```

## API

### Bindings

| @Input() | Type | Required | Default | Description
| --- | --- | --- | --- | --- |
| options | `LottieOptions` | required | `{ renderer: 'svg', loop: true, autoplay: true }` | Configuration that's used by `AnimationItem`
| width | `string` | optional | `null` | Custom container width
| height | `string` | optional | `null` | Custom container height
| styles | `LottieCSSStyleDeclaration` | optional | `null` | Custom container styles
| containerClass | `LottieContainerClass` | optional | `null` | Custom class applied to the container
| detach | `boolean` | optional | `false` | Determines whether to detach view from the change-detection tree or not

### Events

| @Output() | Type | Required | Description
| --- | --- | --- | --- |
| animationCreated | `AnimationItem` | optional | Dispatched after the `lottie` successfully creates animation
| configReady | `void` | optional | Dispatched after the needed renderer is configured
| dataReady | `void` | optional | Dispatched when all parts of the animation have been loaded
| dataFailed | `void` | optional | Dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored
| domLoaded | `void` | optional | Dispatched when elements have been added to the DOM
| enterFrame | `BMEnterFrameEvent` | optional | Dispatched after entering the new frame
| segmentStart | `BMSegmentStartEvent` | optional | Dispatched when the new segment is adjusted
| loopComplete | `BMCompleteLoopEvent` | optional | Dispatched after completing frame loop
| complete | `BMCompleteEvent` | optional | Dispatched after completing the last frame
| loadedImages | `void` | optional | Dispatched after all assets are preloaded
| destroy | `BMDestroyEvent` | optional | Dispatched in the `ngOnDestroy` hook of the service that manages `lottie`'s events, it's useful for releasing resources

## Optimizations

The `ng-lottie` component is marked with `OnPush` change detection strategy. This means it will not be checked in any phase of the change detection mechanism until you change the reference to some binding. For example if you use an `svg` renderer and there are a lot DOM elements projected — you would like to avoid checking this component, as it's not necessary.

Also, events, dispatched by `AnimationItem`, are listened outside Angular's zone, thus you shouldn't worry that every dispatch will be intercepted by Angular's zone.

Also you can provide a `detach` binding:

```html
<ng-lottie [options]="options" [detach]="true"></ng-lottie>
```

This will tell `ng-lottie` component or `lottie` directive to detach its view from the change-detection tree, so this component or directive will never be checked.

## Server side rendering

By default, `lottie` will load your `json` file with animation data every time you create an animation. You may have some problems with the connection, so there may be some delay or even timeout. It's worth loading animation data only once and cache it on the client side, so every time you create an animation — the animation data will be retrieved from cache.

`ngx-lottie/server` package gives you the opportunity to preload animation data and cache it using `TransferState`.

### How2?

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
        animations: ['data.json']
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
```

Also, don't forget to import `BrowserTransferStateModule` into your `AppModule`. Let's look at these options. `animations` is an array of `json` files, that contain animation data, that should be read on the server side, cached and transfered on the client. `folder` is a path where your `json` files are located, but you should use it properly, this path is joined with the `process.cwd()`. Imagine such project structure:

```
-- dist (here you store your output artifacts)
  -- project-name
    -- assets
    -- index.html
    -- main.hash.js
-- dist-server
  -- server.js
-- src (here is your app)
-- angular.json
-- package.json
-- webpack.config.js
```

If you start a server from the root folder like `node dist-server/server`, thus the `folder` property should equal `dist/project-name/assets`.

After installing `LottieServerModule` - now you have to import `LottieTransferState` from the `ngx-lottie` package. Don't worry, this service is tree-shakable and won't be bundled if you don't inject it anywhere.

Inject this service into your component where you declare animation options:

```typescript
import { Component } from '@angular/core';
import { LottieOptions, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-lottie [options]="options"></ng-lottie>
  `
})
export class AppComponent {
  public options: LottieOptions = {
    animationData: this.lottieTransferState.get('data.json')
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
