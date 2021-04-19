import { Injectable, NgZone, Inject } from '@angular/core';

import { Observable, from, of, animationFrameScheduler } from 'rxjs';
import { map, observeOn, publishReplay, refCount } from 'rxjs/operators';

import {
  LOTTIE_OPTIONS,
  LottiePlayer,
  LottieOptions,
  AnimationItem,
  AnimationOptions,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  LottiePlayerFactoryOrLoader,
} from './symbols';

function streamifyPlayerOrLoader(player: LottiePlayerFactoryOrLoader): Observable<LottiePlayer> {
  const playerOrLoader = player();

  if (playerOrLoader instanceof Promise) {
    return from(playerOrLoader).pipe(
      map(module => module.default || module),
      publishReplay(1),
      refCount(),
    );
  } else {
    return of(playerOrLoader);
  }
}

@Injectable()
export class AnimationLoader {
  protected player$ = streamifyPlayerOrLoader(this.options.player).pipe(
    observeOn(animationFrameScheduler),
  );

  constructor(private ngZone: NgZone, @Inject(LOTTIE_OPTIONS) private options: LottieOptions) {}

  loadAnimation(
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): Observable<AnimationItem> {
    return this.player$.pipe(map(player => this.createAnimationItem(player, options)));
  }

  resolveOptions(
    options: AnimationOptions | null,
    container: HTMLElement,
  ): AnimationConfigWithData | AnimationConfigWithPath {
    return Object.assign(
      {
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      },
      options,
    );
  }

  protected createAnimationItem(
    player: LottiePlayer,
    options: AnimationConfigWithData | AnimationConfigWithPath,
  ): AnimationItem {
    return this.ngZone.runOutsideAngular(() => player.loadAnimation(options));
  }
}
