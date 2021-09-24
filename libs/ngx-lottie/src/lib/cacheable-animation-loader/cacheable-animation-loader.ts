import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AnimationLoader } from '../animation-loader';
import { AnimationItem, AnimationConfigWithData, AnimationConfigWithPath } from '../symbols';

@Injectable()
export class CacheableAnimationLoader extends AnimationLoader {
  private cache = new Map<string, string>();

  loadAnimation(options: AnimationConfigWithData | AnimationConfigWithPath) {
    return this.player$.pipe(
      map(player => {
        const animationItem = this.createAnimationItem(player, this.transformOptions(options));
        this.awaitConfigAndCache(options, animationItem);
        return animationItem;
      }),
    );
  }

  private awaitConfigAndCache(
    options: AnimationConfigWithData | AnimationConfigWithPath,
    animationItem: AnimationItem,
  ): void {
    if (this.isAnimationConfigWithPath(options)) {
      // Don't wait for the `config_ready` event if it has been cached previously.
      if (this.cache.has(options.path!)) {
        return;
      }

      animationItem.addEventListener('config_ready', () => {
        // See the comments below on why we're storing the animation data as a string.
        this.cache.set(options.path!, JSON.stringify(animationItem['animationData']));
      });
    }
  }

  private transformOptions(
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): AnimationConfigWithData | AnimationConfigWithPath {
    if (this.isAnimationConfigWithPath(options) && this.cache.has(options.path!)) {
      return {
        ...options,
        path: undefined,
        // Caretaker note: `lottie-web` cannot re-use the `animationData` object between animations, and we
        // have to retrieve a new object each time an animation is created.
        // https://github.com/airbnb/lottie-web#html
        // See comments for the `animationData` property.
        animationData: JSON.parse(this.cache.get(options.path!)!),
      };
    } else {
      return options;
    }
  }

  private isAnimationConfigWithPath(
    options: Record<string, unknown>,
  ): options is AnimationConfigWithPath {
    return typeof options.path === 'string';
  }
}
