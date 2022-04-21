import { Injectable, NgZone, Inject } from '@angular/core';

import { Observable, from, of, animationFrameScheduler } from 'rxjs';
import { map, observeOn, shareReplay, tap } from 'rxjs/operators';

import {
  LOTTIE_OPTIONS,
  LottiePlayer,
  LottieOptions,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LottiePlayerFactoryOrLoader,
} from './symbols';

function convertPlayerOrLoaderToObservable(
  player: LottiePlayerFactoryOrLoader,
  useWebWorker?: boolean,
): Observable<LottiePlayer> {
  const playerOrLoader = player();
  const player$ =
    playerOrLoader instanceof Promise
      ? from(playerOrLoader).pipe(map(module => module.default || module))
      : of(playerOrLoader);

  return player$.pipe(
    tap(player =>
      (player as unknown as { useWebWorker: (useWebWorker?: boolean) => void }).useWebWorker(
        useWebWorker,
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}

@Injectable()
export class AnimationLoader {
  protected player$ = convertPlayerOrLoaderToObservable(
    this.options.player,
    this.options.useWebWorker,
  ).pipe(observeOn(animationFrameScheduler));

  constructor(private ngZone: NgZone, @Inject(LOTTIE_OPTIONS) private options: LottieOptions) {}

  loadAnimation(
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): Observable<AnimationItem> {
    return this.player$.pipe(map(player => this.createAnimationItem(player, options)));
  }

  resolveOptions(
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

  protected createAnimationItem(
    player: LottiePlayer,
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): AnimationItem {
    return this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
  }
}
