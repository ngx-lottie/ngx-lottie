# ngx-lottie/dotlottie

A performance-optimized Angular package for rendering `.lottie` animations using `@lottiefiles/dotlottie-web` with WebAssembly and Web Worker support.

## Table of contents

- [Features](#features)
- [Quick example](#quick-example)
- [Installation](#installation)
- [Usage](#usage)
- [Main Thread Component](#main-thread-component)
- [Web Worker Component](#web-worker-component)
- [Updating animations](#updating-animations)
- [API](#api)
- [Custom WASM URL](#custom-wasm-url)
- [Optimizations](#optimizations)

## Features

- **performant:** WebAssembly-powered rendering with optional Web Worker support
- **modern:** Supports the `.lottie` format for smaller file sizes
- **flexible:** Two rendering modes - main thread and Web Worker
- **reactive:** Signal-based inputs with fine-grained change detection
- **powerful:** State machine support for interactive animations (Worker mode)

## Quick example

```html
<!-- Main thread rendering -->
<ng-dotlottie
  src="animation.lottie"
  autoplay
  loop
  containerClass="my-animation"
  (dotLottieCreated)="onCreated($event)"
  (load)="onLoad($event)"
  (complete)="onComplete($event)"
/>

<!-- Web Worker rendering -->
<ng-dotlottie-worker src="animation.lottie" autoplay loop (dotLottieCreated)="onCreated($event)" />
```

## Installation

To install `ngx-lottie/dotlottie`, run the following command:

```bash
npm i @lottiefiles/dotlottie-web ngx-lottie
# Or if you use yarn
yarn add @lottiefiles/dotlottie-web ngx-lottie
# Or if you use pnpm
pnpm i @lottiefiles/dotlottie-web ngx-lottie
```

## Usage

First, add `provideDotLottie` to your `app.config.ts`:

```typescript
// src/app/app.config.ts
import { provideDotLottie } from 'ngx-lottie/dotlottie';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDotLottie({
      player: () => DotLottie,
    }),
  ],
};
```

The `@lottiefiles/dotlottie-web` library can be loaded on demand using dynamic import:

```typescript
// src/app/app.config.ts
import { provideDotLottie } from 'ngx-lottie/dotlottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDotLottie({
      player: () => import('@lottiefiles/dotlottie-web').then(m => m.DotLottie),
    }),
  ],
};
```

## Main Thread Component

Use `ng-dotlottie` for standard rendering on the main thread. This is suitable for most use cases where Web Worker overhead isn't needed.

```typescript
import { Component } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { DotLottieComponent } from 'ngx-lottie/dotlottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie
      src="/assets/animation.lottie"
      autoplay
      loop
      (dotLottieCreated)="onDotLottieCreated($event)"
    />
  `,
  imports: [DotLottieComponent],
})
export class AppComponent {
  onDotLottieCreated(dotLottie: DotLottie): void {
    console.log('DotLottie instance:', dotLottie);
  }
}
```

You can also provide animation data directly instead of using a URL:

```typescript
import { Component } from '@angular/core';
import { DotLottieComponent } from 'ngx-lottie/dotlottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie
      [data]="animationData"
      autoplay
      loop
    />
  `,
  imports: [DotLottieComponent],
})
export class AppComponent {
  animationData: ArrayBuffer | string = /* your animation data */;
}
```

## Web Worker Component

Use `ng-dotlottie-worker` to offload animation rendering to a Web Worker. This is recommended for complex animations or when you need better performance on the main thread.

```typescript
import { Component } from '@angular/core';
import { DotLottieWorker } from '@lottiefiles/dotlottie-web';
import { DotLottieWorkerComponent } from 'ngx-lottie/dotlottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie-worker
      src="/assets/animation.lottie"
      autoplay
      loop
      [speed]="1.5"
      (dotLottieCreated)="onDotLottieCreated($event)"
    />
  `,
  imports: [DotLottieWorkerComponent],
})
export class AppComponent {
  onDotLottieCreated(dotLottie: DotLottieWorker): void {
    console.log('DotLottieWorker instance:', dotLottie);
  }
}
```

The Web Worker component supports all the same inputs as the main thread component, plus additional state machine features.

## Updating animations

DotLottie components use signal-based inputs for reactive updates. You can update any input and the component will automatically re-render:

```typescript
import { Component, signal } from '@angular/core';
import { DotLottieComponent } from 'ngx-lottie/dotlottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie [src]="animationSrc()" [speed]="playbackSpeed()" [loop]="shouldLoop()" />
    <button (click)="changeAnimation()">Change Animation</button>
    <button (click)="increaseSpeed()">Faster</button>
  `,
  imports: [DotLottieComponent],
})
export class AppComponent {
  animationSrc = signal('/assets/animation1.lottie');
  playbackSpeed = signal(1);
  shouldLoop = signal(true);

  changeAnimation(): void {
    this.animationSrc.set('/assets/animation2.lottie');
  }

  increaseSpeed(): void {
    this.playbackSpeed.update(speed => speed + 0.5);
  }
}
```

## API

### Inputs (Both Components)

Both `ng-dotlottie` and `ng-dotlottie-worker` support the following inputs:

| Input                 | Type                                                     | Default     | Description                           |
| --------------------- | -------------------------------------------------------- | ----------- | ------------------------------------- |
| src                   | `string`                                                 | `undefined` | URL to the `.lottie` file             |
| data                  | `string \| ArrayBuffer`                                  | `undefined` | Animation data (alternative to `src`) |
| autoplay              | `boolean`                                                | `false`     | Auto-play animation on load           |
| loop                  | `boolean`                                                | `false`     | Loop the animation                    |
| speed                 | `number`                                                 | `1`         | Playback speed multiplier             |
| mode                  | `'forward' \| 'reverse' \| 'bounce' \| 'reverse-bounce'` | `'forward'` | Playback mode                         |
| backgroundColor       | `string`                                                 | `undefined` | Background color                      |
| segment               | `[number, number]`                                       | `undefined` | Play specific segment [start, end]    |
| marker                | `string`                                                 | `undefined` | Play from marker                      |
| layout                | `Layout`                                                 | `{}`        | Canvas layout configuration           |
| renderConfig          | `RenderConfig`                                           | `undefined` | Render configuration                  |
| useFrameInterpolation | `boolean`                                                | `false`     | Enable frame interpolation            |
| animationId           | `string`                                                 | `undefined` | Specific animation ID to play         |
| themeId               | `string`                                                 | `undefined` | Theme ID to apply                     |
| containerClass        | `string`                                                 | `undefined` | Custom container CSS class            |
| containerStyles       | `Partial<CSSStyleDeclaration>`                           | `undefined` | Custom container styles               |

### Additional Inputs (Worker Component Only)

| Input          | Type     | Default     | Description              |
| -------------- | -------- | ----------- | ------------------------ |
| stateMachineId | `string` | `undefined` | State machine ID to load |

### Events (Both Components)

| Output      | Type               | Description                                        |
| ----------- | ------------------ | -------------------------------------------------- |
| complete    | `CompleteEvent`    | Emitted when the animation completes playback      |
| load        | `LoadEvent`        | Emitted when the animation has successfully loaded |
| loadError   | `LoadErrorEvent`   | Emitted when an error occurs during loading        |
| renderError | `RenderErrorEvent` | Emitted when an error occurs during rendering      |
| pause       | `PauseEvent`       | Emitted when the animation is paused               |
| play        | `PlayEvent`        | Emitted when the animation starts playing          |
| stop        | `StopEvent`        | Emitted when the animation is stopped              |
| destroy     | `DestroyEvent`     | Emitted when the instance is destroyed             |
| ready       | `ReadyEvent`       | Emitted when the WASM module is ready              |
| frame       | `FrameEvent`       | Emitted on each frame change                       |
| freeze      | `FreezeEvent`      | Emitted when rendering is paused                   |
| unfreeze    | `UnfreezeEvent`    | Emitted when rendering is resumed                  |

## State Machine Support

The `ng-dotlottie-worker` component includes state machine functionality for interactive animations:

```typescript
import { Component, viewChild } from '@angular/core';
import { DotLottieWorkerComponent } from 'ngx-lottie/dotlottie';
import { StateMachineTransitionEvent } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie-worker
      src="/assets/interactive.lottie"
      stateMachineId="buttonStateMachine"
      (stateMachineTransition)="onTransition($event)"
      (stateMachineStateEntered)="onStateEntered($event)"
    />
    <button (click)="start()">Start State Machine</button>
    <button (click)="stop()">Stop State Machine</button>
  `,
  imports: [DotLottieWorkerComponent],
})
export class AppComponent {
  onTransition(event: StateMachineTransitionEvent): void {
    console.log(`Transition: ${event.fromState} → ${event.toState}`);
  }

  onStateEntered(event: StateMachineStateEnteredEvent): void {
    console.log(`Entered state: ${event.state}`);
  }
}
```

## Custom WASM URL

If you need to host the WASM file at a custom location, use the `withDotLottieWasmUrl` feature:

```typescript
// src/app/app.config.ts
import { provideDotLottie, withDotLottieWasmUrl } from 'ngx-lottie/dotlottie';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDotLottie(
      {
        player: () => DotLottie,
      },
      withDotLottieWasmUrl(() => {
        const document = inject(DOCUMENT);
        return `${document.location.origin}/assets/dotlottie-player.wasm`;
      }),
    ),
  ],
};
```

The WASM URL is configured lazily when the first component renders, so it won't block your application bootstrap.

## Optimizations

Both DotLottie components are highly optimized for performance:

- **OnPush change detection:** Components only update when inputs change
- **Outside Angular zone:** All DotLottie operations run outside Angular's zone to prevent unnecessary change detection
- **Signal-based reactivity:** Fine-grained updates only when specific inputs change
- **Web Worker support:** Offload rendering to a separate thread (Worker component)

**Best practices when interacting with DotLottie instances:**

```typescript
import { Component, NgZone } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { DotLottieComponent } from 'ngx-lottie/dotlottie';

@Component({
  selector: 'app-root',
  template: `
    <ng-dotlottie src="/assets/animation.lottie" (dotLottieCreated)="onCreated($event)" />
    <button (click)="play()">Play</button>
    <button (click)="pause()">Pause</button>
  `,
  imports: [DotLottieComponent],
})
export class AppComponent {
  private dotLottie: DotLottie | null = null;

  constructor(private ngZone: NgZone) {}

  onCreated(dotLottie: DotLottie): void {
    this.dotLottie = dotLottie;
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => {
      this.dotLottie?.play();
    });
  }

  pause(): void {
    this.ngZone.runOutsideAngular(() => {
      this.dotLottie?.pause();
    });
  }
}
```
