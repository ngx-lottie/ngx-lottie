import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AnimationLoader } from '../animation-loader';
import { AnimationItem, AnimationConfigWithData, AnimationConfigWithPath } from '../symbols';

@Injectable()
export class CacheableAnimationLoader extends AnimationLoader {
  private cache = new Map<string, unknown>();

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
        this.cache.set(options.path!, animationItem['animationData']);
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
        animationData: this.cache.get(options.path!),
      };
    } else {
      return options;
    }
  }

  private isAnimationConfigWithPath(options: any): options is AnimationConfigWithPath {
    return typeof options.path === 'string';
  }
}
