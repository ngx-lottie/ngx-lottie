import { Injectable, NgZone, inject, ɵisPromise } from '@angular/core';

import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';

import {
  LOTTIE_OPTIONS,
  LottiePlayer,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
} from './symbols';

function convertPlayerOrLoaderToObservable(): Observable<LottiePlayer> {
  const ngZone = inject(NgZone);
  const { player, useWebWorker } = inject(LOTTIE_OPTIONS);

  const player$ = new Observable<LottiePlayer>(subscriber => {
    // Call the `player` function lazily — only when a subscriber
    // arrives — to avoid importing `lottie-web` on the server, as it will
    // fail with a "document is not defined" error.
    const playerOrLoader = ngZone.runOutsideAngular(() => player());

    // We need to use `isPromise` instead of checking whether
    // `result instanceof Promise`. In zone.js patched environments, `global.Promise`
    // is the `ZoneAwarePromise`. Some APIs, which are likely not patched by zone.js
    // for certain reasons, might not work with `instanceof`. For instance, the dynamic
    // import `() => import('./chunk.js')` returns a native promise (not a `ZoneAwarePromise`),
    // causing this check to be falsy.
    if (ɵisPromise(playerOrLoader)) {
      playerOrLoader
        .then(module => {
          subscriber.next(module.default || module);
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    } else {
      subscriber.next(playerOrLoader);
      subscriber.complete();
    }
  });

  return player$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tap(player => (player as any).useWebWorker?.(useWebWorker)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}

@Injectable({ providedIn: 'root' })
export class AnimationLoader {
  protected player$ = convertPlayerOrLoaderToObservable().pipe(
    mergeMap(player => raf$(this.ngZone).pipe(map(() => player))),
  );

  private ngZone = inject(NgZone);

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

function raf$(ngZone: NgZone) {
  return new Observable<void>(subscriber => {
    const requestId = ngZone.runOutsideAngular(() =>
      requestAnimationFrame(() => {
        subscriber.next();
        subscriber.complete();
      }),
    );
    return () => cancelAnimationFrame(requestId);
  });
}
