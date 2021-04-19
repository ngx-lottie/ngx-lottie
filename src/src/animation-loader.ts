import { Injectable, NgZone, Inject } from '@angular/core';

import { Observable, from, of, animationFrameScheduler } from 'rxjs';
import { map, observeOn, publishReplay, refCount } from 'rxjs/operators';

import {
  LottiePlayer,
  LottieOptions,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LOTTIE_OPTIONS,
  ANIMATION_CACHE,
  LottiePlayerFactoryOrLoader,
} from './symbols';
import { AnimationCache } from './animation-cache';

function awaitConfigAndCache(
  animationCache: AnimationCache | null,
  options: AnimationOptions,
  animationItem: AnimationItem,
): void {
  if (animationCache !== null) {
    animationItem.addEventListener('config_ready', () => {
      animationCache.set(options, animationItem);
    });
  }
}

function streamifyPlayerOrLoader(player: LottiePlayerFactoryOrLoader): Observable<LottiePlayer> {
  const playerOrLoader = player();

  if (playerOrLoader instanceof Promise) {
    return from(playerOrLoader).pipe(
      map(module => module.default || module),
      publishReplay(1),
      refCount(),
    );
  } else {
    return of(playerOrLoader);
  }
}

@Injectable()
export class AnimationLoader {
  private player$ = streamifyPlayerOrLoader(this.options.player);

  constructor(
    private ngZone: NgZone,
    @Inject(LOTTIE_OPTIONS) private options: LottieOptions,
    @Inject(ANIMATION_CACHE) private animationCache: AnimationCache | null,
  ) {}

  loadAnimation(
    userOptions: AnimationOptions | null,
    container: HTMLElement,
  ): Observable<AnimationItem> {
    return this.player$.pipe(
      observeOn(animationFrameScheduler),
      map(player => {
        const options = this.resolveOptions(userOptions, container);
        if (this.animationCache !== null) {
          this.animationCache.transformOptions(options);
        }
        const animationItem = this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
        awaitConfigAndCache(this.animationCache, options, animationItem);
        return animationItem;
      }),
    );
  }

  private resolveOptions(
    options: AnimationOptions | null,
    container: HTMLElement,
  ): AnimationConfigWithData | AnimationConfigWithPath {
    return Object.assign(
      {
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      },
      options,
    );
  }
}
