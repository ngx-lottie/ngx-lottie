import {
  AnimationFilename,
  LottiePlayer,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath
} from './symbols';

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

export function resolveOptions(
  options: AnimationOptions | null,
  container: HTMLElement
): AnimationConfigWithData | AnimationConfigWithPath {
  const defaultOptions = {
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true
  };

  return Object.assign(defaultOptions, options);
}
