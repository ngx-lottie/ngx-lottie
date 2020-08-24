import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  LottiePlayer,
  LottieOptions,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LOTTIE_OPTIONS,
  ANIMATION_CACHE,
} from './symbols';
import { AnimationCache } from './animation-cache';
import { awaitConfigAndCache, mergeOptionsWithDefault, streamifyPlayerOrLoader } from './utils';

@Injectable()
export class AnimationLoader {
  private player$ = streamifyPlayerOrLoader(this.options.player);

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(LOTTIE_OPTIONS) private options: LottieOptions,
    @Inject(ANIMATION_CACHE) private animationCache: AnimationCache | null,
  ) {}

  resolveLoaderAndLoadAnimation(
    options: AnimationOptions | null,
    container: HTMLElement,
    animationItem$: BehaviorSubject<AnimationItem | null>,
    destroy$: Subject<void>,
  ): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.player$.pipe(takeUntil(destroy$)).subscribe(player => {
      const mergedOptions = mergeOptionsWithDefault(options, container, this.animationCache);
      this.loadAnimation(player, mergedOptions, animationItem$);
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
