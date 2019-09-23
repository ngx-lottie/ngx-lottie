import { Injectable, NgZone, Inject, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { from, of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
import { BaseDirective } from './base.directive';
import { LottieEventsService } from './events.service';

@Injectable()
export class AnimationLoader {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
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
    const animationItem = this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
    // Dispatch `animationCreated` event after animation is loaded successfully
    animationCreated.emit(animationItem);
    lottieEventsService.bootstrapEventsService(instance, animationItem);
  }

  private wrapPlayerOrLoaderIntoObservable(): Observable<LottiePlayer> {
    const playerOrLoader = this.playerFactoryOrLoader();

    if (playerOrLoader instanceof Promise) {
      return from(playerOrLoader).pipe(
        map(module => module.default || module),
        catchError(error => {
          console.error(`
            Could retrieve "lottie-web" player, did you provide
            the "player" property correctly?
            export function playerFactory() {
              return import('lottie-web');
            }
            LottieModule.forRoot({ player: playerFactory })
          `);
          return throwError(error);
        })
      );
    }

    return of(playerOrLoader);
  }
}
