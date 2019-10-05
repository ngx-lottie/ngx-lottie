import {
  LottieOptions,
  AnimationItem,
  AnimationConfigWithData,
  AnimationConfigWithPath
} from './symbols';
import { isAnimationConfigWithData } from './utils';

export class AnimationCache {
  private cache = new Map<string, unknown>();

  static create(options: LottieOptions): AnimationCache | null {
    if (options.useCache) {
      return new AnimationCache();
    }

    return null;
  }

  transformOptions(
    options: AnimationConfigWithData | AnimationConfigWithPath
  ): AnimationConfigWithData | AnimationConfigWithPath {
    const path = (options as AnimationConfigWithPath).path;
    if (path && this.cache.has(path)) {
      delete (options as AnimationConfigWithPath).path;
      (options as AnimationConfigWithData).animationData = this.cache.get(path);
    }
    return options;
  }

  set(
    options: AnimationConfigWithData | AnimationConfigWithPath,
    animationItem: AnimationItem
  ): void {
    if (isAnimationConfigWithData(options)) {
      return;
    }

    const animationData = animationItem['animationData'];
    this.cache.set(options.path!, animationData);
  }
}
