import { join } from 'node:path';
import { inject, makeStateKey, TransferState } from '@angular/core';
import { AnimationFilename, transformAnimationFilenameToKey } from 'ngx-lottie';

import { readFileWithAnimationData } from './utils';
import {
  LottieServerOptions,
  PathToAnimation,
  AnimationData,
  LOTTIE_SERVER_OPTIONS,
} from './symbols';

/** Will be provided through Terser global definitions when the app is build in production mode. */
declare const ngDevMode: boolean;

function readAndTransferAnimationData(
  transferState: TransferState,
  animations: AnimationFilename[],
  pathsToAnimations: PathToAnimation[],
): Promise<void>[] {
  const sources: Promise<void>[] = [];

  for (let i = 0, length = animations.length; i < length; i++) {
    const path = pathsToAnimations[i];

    const source = readFileWithAnimationData(path)
      .then(animationData => {
        transferAnimationData(transferState, animations[i], animationData);
      })
      .catch(error => {
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
          console.error(`Failed to read the following file ${path}. Error: `, error);
        }

        // This is empty since we don't have to do anything if the file was failed to read.
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
  if (state.hasKey(key)) {
    return;
  }
  state.set(key, JSON.parse(animationData));
}

export async function appInitializer() {
  const options = inject(LOTTIE_SERVER_OPTIONS);
  const transferState = inject(TransferState);
  const pathsToAnimations = resolveLottiePaths(options);
  const sources = readAndTransferAnimationData(
    transferState,
    options.preloadAnimations.animations,
    pathsToAnimations,
  );

  await Promise.all(sources);
}

export function resolveLottiePaths({ preloadAnimations }: LottieServerOptions): PathToAnimation[] {
  const { folder, animations } = preloadAnimations;
  const path = join(process.cwd(), folder);
  return animations.map(animation => join(path, animation));
}
