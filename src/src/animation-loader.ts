import { Injectable, NgZone, Inject } from '@angular/core';

import { Subject, BehaviorSubject, Observable, from, of } from 'rxjs';
import { takeUntil, map, publishReplay, refCount } from 'rxjs/operators';

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

  resolveLoaderAndLoadAnimation(
    options: AnimationOptions | null,
    container: HTMLElement,
    animationItem$: BehaviorSubject<AnimationItem | null>,
    destroy$: Subject<void>,
  ): void {
    this.player$.pipe(takeUntil(destroy$)).subscribe(player => {
      options = Object.assign(
        {
          container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        },
        options,
      );

      if (this.animationCache !== null) {
        options = this.animationCache.transformOptions(
          options as AnimationConfigWithData | AnimationConfigWithPath,
        );
      }

      this.loadAnimation(player, options, animationItem$);
    });
  }

  private loadAnimation(
    player: LottiePlayer,
    options: AnimationOptions,
    animationItem$: BehaviorSubject<AnimationItem | null>,
  ): void {
    const animationItem = this.ngZone.runOutsideAngular(() =>
      player.loadAnimation(options as AnimationConfigWithData | AnimationConfigWithPath),
    );
    awaitConfigAndCache(this.animationCache, options, animationItem);
    animationItem$.next(animationItem);
  }
}
