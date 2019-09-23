import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { AnimationFilename } from './symbols';
import { transformAnimationFilenameToKey } from './utils';

@Injectable({ providedIn: 'root' })
export class LottieTransferState {
  constructor(private state: TransferState) {}

  get<T>(animation: AnimationFilename): T | null {
    const animationKey = transformAnimationFilenameToKey(animation);
    const key = makeStateKey<T>(animationKey);
    return this.state.get(key, null);
  }
}
