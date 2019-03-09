<h1 align="center">
  <img src="https://raw.githubusercontent.com/ngx-lottie/ngx-lottie/master/docs/assets/logo.png">
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
</div>

## Table of contents
- [Features](#features)
- [Quick example](#quick-example)

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
