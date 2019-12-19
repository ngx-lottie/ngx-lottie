import { Injectable, NgZone, Inject, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  LottiePlayer,
  LottieOptions,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  IS_SAFARI,
  LOTTIE_OPTIONS,
  ANIMATION_CACHE
} from './symbols';
import {
  awaitConfigAndCache,
  setPlayerLocationHref,
  mergeOptionsWithDefault,
  streamifyPlayerOrLoader
} from './utils';
import { BaseDirective } from './base.directive';
import { AnimationCache } from './animation-cache';
import { LottieEventsFacade } from './events-facade';

// This has to be dynamic as `Document` interface is not
// accepted by the ngc compiler
// @dynamic
@Injectable()
export class AnimationLoader {
  private player$ = streamifyPlayerOrLoader(this.options.player);

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(DOCUMENT) private document: Document,
    @Inject(IS_SAFARI) private isSafari: boolean,
    @Inject(LOTTIE_OPTIONS) private options: LottieOptions,
    @Inject(ANIMATION_CACHE) private animationCache: AnimationCache | null
  ) {}

  resolveLoaderAndLoadAnimation(
    options: AnimationOptions | null,
    container: HTMLElement,
    eventsFacade: LottieEventsFacade,
    animationCreated: EventEmitter<AnimationItem>,
    instance: BaseDirective,
    destroy$: Subject<void>
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.player$.pipe(takeUntil(destroy$)).subscribe(player => {
      const mergedOptions = mergeOptionsWithDefault(options, container, this.animationCache);
      this.loadAnimation(player, mergedOptions, eventsFacade, animationCreated, instance);
    });
  }

  private loadAnimation(
    player: LottiePlayer,
    options: AnimationConfigWithData | AnimationConfigWithPath,
    eventsFacade: LottieEventsFacade,
    animationCreated: EventEmitter<AnimationItem>,
    instance: BaseDirective
  ): void {
    setPlayerLocationHref(player, this.document.location.href, this.isSafari);
    const animationItem = this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
    awaitConfigAndCache(this.animationCache, options, animationItem);
    // Dispatch `animationCreated` event after animation is loaded successfully
    animationCreated.emit(animationItem);
    eventsFacade.addEventListeners(instance, animationItem);
  }
}
