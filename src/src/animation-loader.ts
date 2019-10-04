import { Injectable, NgZone, Inject, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';

import { from, of, Observable, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import {
  LottiePlayer,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LottiePlayerFactoryOrLoader,
  LOTTIE_PLAYER_FACTORY_OR_LOADER,
  IS_SAFARI
} from './symbols';
import { BaseDirective } from './base.directive';
import { LottieEventsFacade } from './events-facade';
import { setPlayerLocationHref, resolveOptions } from './utils';

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
    @Inject(IS_SAFARI) private isSafari: boolean,
    @Inject(LOTTIE_PLAYER_FACTORY_OR_LOADER)
    private playerFactoryOrLoader: LottiePlayerFactoryOrLoader
  ) {}

  resolveLoaderAndLoadAnimation(
    options: AnimationOptions | null,
    container: HTMLElement,
    eventsFacade: LottieEventsFacade,
    animationCreated: EventEmitter<AnimationItem>,
    instance: BaseDirective
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const resolvedOptions = resolveOptions(options, container);

    this.wrapPlayerOrLoaderIntoObservable().subscribe(player => {
      this.loadAnimation(player, resolvedOptions, eventsFacade, animationCreated, instance);
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
    // Dispatch `animationCreated` event after animation is loaded successfully
    animationCreated.emit(animationItem);
    eventsFacade.addEventListeners(instance, animationItem);
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
