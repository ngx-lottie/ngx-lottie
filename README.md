<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/master/docs/assets/logo.jpg">
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
npm i ngx-lottie
# or if you're using yarn
yarn add ngx-lottie
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
| options | LottieOptions | required | `{ renderer: 'svg', loop: true, autoplay: true }` | Configuration that's used by `AnimationItem`
| width | string | optional | null | Custom container width
| height | string | optional | null | Custom container height
| styles | LottieCSSStyleDeclaration | optional | null | Custom container styles
| containerClass | LottieContainerClass | optional | null | Custom class applied to the container

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

The `ng-lottie` component is marked with `OnPush` change detection strategy. This means it will not be checked in any phase of the change detection mechanism until you change the reference to some binding. For example if you use an `svg` renderer and there are a lot DOM elements projected - you would like to avoid checking this component, as it's not necessary.

Also, events, dispatched by `AnimationItem`, are listened outside Angular's zone, thus you shouldn't worry that every dispatch will be intercepted by Angular's zone.
