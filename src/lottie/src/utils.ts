import { AnimationFilename } from './symbols';

export function transformAnimationFilenameToKey(animation: AnimationFilename): string {
  return `animation-${animation.split('.json')[0]}`;
}
