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

  transformOptions(
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): AnimationConfigWithData | AnimationConfigWithPath {
    const path = (<AnimationConfigWithPath>options).path;
    if (path && this.cache.has(path)) {
      delete (<AnimationConfigWithPath>options).path;
      (<AnimationConfigWithData>options).animationData = this.cache.get(path);
    }
    return options;
  }

  set(options: AnimationOptions, animationItem: AnimationItem): void {
    const animationData = (<AnimationConfigWithData>options).animationData;
    if (animationData) {
      return;
    }

    this.cache.set((<AnimationConfigWithPath>options).path!, animationItem['animationData']);
  }
}
