import { Injectable, NgZone, Inject, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';

import { from, of, Observable, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import {
  LottiePlayer,
  LottieOptions,
  AnimationConfig,
  AnimationItem,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LottiePlayerFactoryOrLoader,
  LOTTIE_PLAYER_FACTORY_OR_LOADER
} from './symbols';
import { setPlayerLocationHref } from './utils';
import { BaseDirective } from './base.directive';
import { LottieEventsService } from './events.service';

// This has to be dynamic as `Document` interface is not
// accepted by the ngc compiler
// @dynamic
@Injectable()
export class AnimationLoader {
  private cachedLottiePlayer$: Observable<LottiePlayer> | null = null;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOTTIE_PLAYER_FACTORY_OR_LOADER)
    private playerFactoryOrLoader: LottiePlayerFactoryOrLoader
  ) {}

  resolveLoaderAndLoadAnimation(
    options: LottieOptions | null,
    container: HTMLElement,
    lottieEventsService: LottieEventsService,
    animationCreated: EventEmitter<AnimationItem>,
    instance: BaseDirective
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const resolvedOptions = this.resolveOptions(options, container);

    this.wrapPlayerOrLoaderIntoObservable().subscribe(player => {
      this.loadAnimation(player, resolvedOptions, lottieEventsService, animationCreated, instance);
    });
  }

  private resolveOptions(
    options: LottieOptions | null,
    container: HTMLElement
  ): AnimationConfigWithData | AnimationConfigWithPath {
    const defaultOptions: AnimationConfig = {
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true
    };

    return Object.assign(defaultOptions, options);
  }

  private loadAnimation(
    player: LottiePlayer,
    options: AnimationConfigWithData | AnimationConfigWithPath,
    lottieEventsService: LottieEventsService,
    animationCreated: EventEmitter<AnimationItem>,
    instance: BaseDirective
  ): void {
    setPlayerLocationHref(player, this.document.location.href);
    const animationItem = this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
    // Dispatch `animationCreated` event after animation is loaded successfully
    animationCreated.emit(animationItem);
    lottieEventsService.bootstrapEventsService(instance, animationItem);
  }

  private wrapPlayerOrLoaderIntoObservable(): Observable<LottiePlayer> {
    if (this.cachedLottiePlayer$ !== null) {
      return this.cachedLottiePlayer$;
    }

    const playerOrLoader = this.playerFactoryOrLoader();

    if (playerOrLoader instanceof Promise) {
      this.cachedLottiePlayer$ = from(playerOrLoader).pipe(
        map(module => module.default || module),
        catchError(error => {
          console.error(`
            Could not retrieve the "lottie-web" player, did you provide
            the "player" property correctly?
            export function playerFactory() {
              return import('lottie-web');
            }
            LottieModule.forRoot({ player: playerFactory })
          `);
          return throwError(error);
        }),
        shareReplay(1)
      );
    } else {
      this.cachedLottiePlayer$ = of(playerOrLoader);
    }

    return this.cachedLottiePlayer$;
  }
}
