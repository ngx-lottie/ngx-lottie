import { DestroyRef, inject, Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';

import { AnimationLoader } from '../animation-loader';
import type { AnimationConfigWithData, AnimationConfigWithPath, AnimationItem } from '../symbols';

@Injectable({ providedIn: 'root' })
export class CacheableAnimationLoader extends AnimationLoader {
  /** Cache storing animation data as JSON strings, keyed by file path */
  private cache = new Map<string, string>();

  /** Tracks in-flight HTTP requests to prevent duplicate fetches for the same animation */
  private pending = new Map<string, Promise<string>>();

  constructor() {
    super();

    inject(DestroyRef).onDestroy(() => {
      this.cache.clear();
      this.pending.clear();
    });
  }

  loadAnimation(options: AnimationConfigWithData | AnimationConfigWithPath) {
    return this.player$.pipe(
      map(async player => {
        // Transform options to either use cached data or wait for pending requests.
        // This prevents duplicate HTTP requests when multiple animations with the
        // same path are loaded simultaneously before the first request completes.
        const transformedOptions = await this.transformOptions(options);
        const animationItem = this.createAnimationItem(player, transformedOptions);

        // For path-based animations, listen for `config_ready` to cache the data.
        this.awaitConfigAndCache(options, animationItem);

        return animationItem;
      }),
      // Flatten Promise<AnimationItem> to AnimationItem for RxJS stream compatibility.
      switchMap(promise => promise),
    );
  }

  /**
   * Sets up caching for path-based animations by listening to the `config_ready` event.
   * Only the first request for a given path will register this listener - subsequent
   * requests will be handled by transformOptions.
   */
  private awaitConfigAndCache(
    options: AnimationConfigWithData | AnimationConfigWithPath,
    animationItem: AnimationItem,
  ): void {
    if (!this.isAnimationConfigWithPath(options)) {
      return;
    }

    const path = options.path!;

    // Skip if already cached or another instance is already listening.
    if (this.cache.has(path) || this.pending.has(path)) {
      return;
    }

    // Create a promise that resolves when lottie-web fires `config_ready`.
    const promise = new Promise<string>(resolve => {
      animationItem.addEventListener('config_ready', () => {
        // Serialize animation data to string to avoid object mutation issues.
        // lottie-web cannot re-use animationData objects between animations.
        const data = JSON.stringify(animationItem['animationData']);
        this.cache.set(path, data);
        this.pending.delete(path);
        resolve(data);
      });
    });

    this.pending.set(path, promise);
  }

  /**
   * Transforms animation options to use cached data when available or wait for
   * pending requests to complete. This prevents duplicate HTTP requests.
   *
   * Flow:
   * 1. If cached: return immediately with `animationData`
   * 2. If loading: await the pending promise, then return with `animationData`
   * 3. If first request: return original options with path (triggers HTTP fetch)
   */
  private async transformOptions(
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): Promise<AnimationConfigWithData | AnimationConfigWithPath> {
    if (!this.isAnimationConfigWithPath(options)) {
      return options;
    }

    const path = options.path!;

    // Cache hit: return parsed `animationData` immediately.
    if (this.cache.has(path)) {
      return {
        ...options,
        path: undefined,
        // Parse JSON to create a new object - lottie-web requires fresh objects.
        animationData: JSON.parse(this.cache.get(path)!),
      };
    }

    // Pending request: wait for the first request to complete, then use its data.
    if (this.pending.has(path)) {
      const data = await this.pending.get(path)!;
      return {
        ...options,
        path: undefined,
        animationData: JSON.parse(data),
      };
    }

    // First request: let lottie-web fetch the animation via the path option.
    return options;
  }

  private isAnimationConfigWithPath(
    options: Record<string, unknown>,
  ): options is AnimationConfigWithPath {
    return typeof options.path === 'string';
  }
}
