import { from, throwError, of, Observable } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import {
  LottiePlayer,
  AnimationOptions,
  AnimationFilename,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  LottiePlayerFactoryOrLoader,
} from './symbols';
import { AnimationCache } from './animation-cache';

export function transformAnimationFilenameToKey(animation: AnimationFilename): string {
  return `animation-${animation.split('.json')[0]}`;
}

export function mergeOptionsWithDefault(
  options: AnimationOptions | null,
  container: HTMLElement,
  animationCache: AnimationCache | null,
): AnimationConfigWithData | AnimationConfigWithPath {
  const merged: AnimationConfigWithData | AnimationConfigWithPath = Object.assign(
    {
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    },
    options,
  );

  if (animationCache !== null) {
    return animationCache.transformOptions(merged);
  }

  return merged;
}

export function isAnimationConfigWithData(
  options: AnimationConfigWithPath | AnimationConfigWithData,
): options is AnimationConfigWithData {
  const animationData = (options as AnimationConfigWithData).animationData;
  return animationData !== null && typeof animationData === 'object';
}

export function awaitConfigAndCache(
  animationCache: AnimationCache | null,
  options: AnimationConfigWithPath | AnimationConfigWithData,
  animationItem: AnimationItem,
): void {
  if (animationCache === null) {
    return;
  }

  animationItem.addEventListener('config_ready', () => {
    animationCache.set(options, animationItem);
  });
}

export function streamifyPlayerOrLoader(
  player: LottiePlayerFactoryOrLoader,
): Observable<LottiePlayer> {
  const playerOrLoader = player();

  if (playerOrLoader instanceof Promise) {
    return from(playerOrLoader).pipe(
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
      shareReplay(1),
    );
  }

  return of(playerOrLoader);
}
