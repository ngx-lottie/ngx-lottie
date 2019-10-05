import { EventEmitter } from '@angular/core';

import {
  LottiePlayer,
  AnimationOptions,
  AnimationFilename,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  LottieEvent,
  CamelizedAnimationEventName
} from './symbols';
import { BaseDirective } from './base.directive';
import { AnimationCache } from './animation-cache';

export function transformAnimationFilenameToKey(animation: AnimationFilename): string {
  return `animation-${animation.split('.json')[0]}`;
}

export function setPlayerLocationHref(player: LottiePlayer, href: string, isSafari: boolean): void {
  // This is a fix for the mask on Safari/iOS
  // https://github.com/airbnb/lottie-web/issues/1198
  if (isSafari) {
    ((player as unknown) as { setLocationHref: (href: string) => void }).setLocationHref(href);
  }
}

export function mergeOptionsWithDefault(
  options: AnimationOptions | null,
  container: HTMLElement,
  animationCache: AnimationCache | null
): AnimationConfigWithData | AnimationConfigWithPath {
  const merged: AnimationConfigWithData | AnimationConfigWithPath = Object.assign(
    {
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true
    },
    options
  );

  if (animationCache !== null) {
    return animationCache.transformOptions(merged);
  }

  return merged;
}

export function isSafariFactory(): boolean {
  // This `try-catch` block will also handle server-side rendering
  // as `navigator` is not accessable there
  try {
    const { vendor, userAgent } = navigator;
    return (
      vendor.indexOf('Apple') > -1 &&
      userAgent.indexOf('CriOS') === -1 &&
      userAgent.indexOf('FxiOS') === -1
    );
  } catch {
    return false;
  }
}

export function isAnimationConfigWithData(
  options: AnimationConfigWithPath | AnimationConfigWithData
): options is AnimationConfigWithData {
  const animationData = (options as AnimationConfigWithData).animationData;
  return animationData !== null && typeof animationData === 'object';
}

export function awaitConfigAndCache(
  animationCache: AnimationCache | null,
  options: AnimationConfigWithPath | AnimationConfigWithData,
  animationItem: AnimationItem
): void {
  if (animationCache === null) {
    return;
  }

  animationItem.addEventListener('config_ready', () => {
    animationCache.set(options, animationItem);
  });
}

export function retrieveEventEmitter(
  instance: BaseDirective,
  name: CamelizedAnimationEventName
): EventEmitter<LottieEvent> {
  return instance[name] as EventEmitter<LottieEvent>;
}
