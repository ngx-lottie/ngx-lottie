import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { AnimationFilename } from './symbols';
import { transformAnimationFilenameToKey } from './utils';

@Injectable({ providedIn: 'root' })
export class LottieTransferState {
  constructor(private transferState: TransferState) {}

  get<T>(animation: AnimationFilename): T | null {
    const animationKey = transformAnimationFilenameToKey(animation);
    const stateKey = makeStateKey<T>(animationKey);
    return this.transferState.get(stateKey, null);
  }
}
