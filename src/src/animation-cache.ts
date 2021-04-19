import {
  LottieOptions,
  AnimationItem,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationOptions,
} from './symbols';

export class AnimationCache {
  private cache = new Map<string, unknown>();

  static create(options: LottieOptions): AnimationCache | null {
    return options.useCache ? new AnimationCache() : null;
  }

  transformOptions(options: AnimationConfigWithData | AnimationConfigWithPath): void {
    const path = (options as AnimationConfigWithPath).path;
    if (path && this.cache.has(path)) {
      delete (options as AnimationConfigWithPath).path;
      (options as AnimationConfigWithData).animationData = this.cache.get(path);
    }
  }

  set(options: AnimationOptions, animationItem: AnimationItem): void {
    const animationData = (options as AnimationConfigWithData).animationData;
    if (animationData) {
      return;
    }

    this.cache.set((options as AnimationConfigWithPath).path!, animationItem['animationData']);
  }
}
