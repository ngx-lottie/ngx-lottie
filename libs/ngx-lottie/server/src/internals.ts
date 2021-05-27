import { join } from 'path';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { AnimationFilename, transformAnimationFilenameToKey } from 'ngx-lottie';

import { readFileWithAnimationData } from './utils';
import { LottieServerOptions, PathToAnimation, AnimationData } from './symbols';

function readAndTransferAnimationData(
  transferState: TransferState,
  animations: AnimationFilename[],
  pathsToAnimations: PathToAnimation[],
): Promise<void>[] {
  const sources: Promise<void>[] = [];

  for (let i = 0, length = animations.length; i < length; i++) {
    const path = pathsToAnimations[i];

    const source = readFileWithAnimationData(path).then(animationData => {
      transferAnimationData(transferState, animations[i], animationData);
    });

    sources.push(source);
  }

  return sources;
}

function transferAnimationData(
  state: TransferState,
  animation: AnimationFilename,
  animationData: AnimationData,
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
    pathsToAnimations,
  );

  return () => Promise.all(sources);
}

export function resolveLottiePaths({ preloadAnimations }: LottieServerOptions): PathToAnimation[] {
  const { folder, animations } = preloadAnimations;
  const path = join(process.cwd(), folder);

  return animations.map(animation => join(path, animation));
}
