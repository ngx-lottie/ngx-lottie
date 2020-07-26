import { from, of, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

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

  return animationCache !== null ? animationCache.transformOptions(merged) : merged;
}

export function awaitConfigAndCache(
  animationCache: AnimationCache | null,
  options: AnimationOptions,
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
      publishReplay(1),
      refCount(),
    );
  } else {
    return of(playerOrLoader);
  }
}
