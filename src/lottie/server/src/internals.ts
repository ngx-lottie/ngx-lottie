import { TransferState, makeStateKey } from '@angular/platform-browser';

import { join } from 'path';

import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AnimationFilename, transformAnimationFilenameToKey } from 'ngx-lottie';

import { LottieServerOptions, PathToAnimation, AnimationData } from './symbols';
import { readFileWithAnimationData } from './utils';

function readAndTransferAnimationData(
  state: TransferState,
  animations: AnimationFilename[],
  pathsToAnimations: PathToAnimation[]
): Observable<string>[] {
  const sources: Observable<string>[] = [];

  for (let i = 0, length = animations.length; i < length; i++) {
    const path = pathsToAnimations[i];

    const source = readFileWithAnimationData(path).pipe(
      tap((animationData) => {
        transferAnimationData(state, animations[i], animationData);
      })
    );

    sources.push(source);
  }

  return sources;
}

function transferAnimationData(
  state: TransferState,
  animation: AnimationFilename,
  animationData: AnimationData
): void {
  animation = transformAnimationFilenameToKey(animation);
  const key = makeStateKey(animation);
  state.set(key, JSON.parse(animationData));
}

export function appInitializerFactory(options: LottieServerOptions, state: TransferState) {
  const pathsToAnimations = resolveLottiePaths(options);
  const sources = readAndTransferAnimationData(
    state,
    options.preloadAnimations.animations,
    pathsToAnimations
  );

  return () => forkJoin(sources).toPromise();
}

export function resolveLottiePaths({ preloadAnimations }: LottieServerOptions): PathToAnimation[] {
  const { folder, animations } = preloadAnimations;
  const path = join(process.cwd(), folder);

  return animations.map((animation) => join(path, animation));
}
