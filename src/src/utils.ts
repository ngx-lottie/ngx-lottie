import { AnimationFilename, LottiePlayer } from './symbols';

export function transformAnimationFilenameToKey(animation: AnimationFilename): string {
  return `animation-${animation.split('.json')[0]}`;
}

export function setPlayerLocationHref(player: LottiePlayer, href: string): void {
  // This is a fix for the mask on Safari/iOS
  // https://github.com/airbnb/lottie-web/issues/1198
  ((player as unknown) as { setLocationHref: (href: string) => void }).setLocationHref(href);
}
