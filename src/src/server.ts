import { AnimationFilename } from './symbols';

export function transformAnimationFilenameToKey(animation: AnimationFilename): string {
  const [animationName] = animation.split('.json');
  return `animation-${animationName}`;
}
