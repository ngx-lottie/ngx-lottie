import { Injectable, makeStateKey, TransferState } from '@angular/core';

import { AnimationFilename } from './symbols';
import { transformAnimationFilenameToKey } from './server';

@Injectable({ providedIn: 'root' })
export class LottieTransferState {
  constructor(private transferState: TransferState) {}

  get<T>(animation: AnimationFilename): T | null {
    const animationKey = transformAnimationFilenameToKey(animation);
    const stateKey = makeStateKey<T>(animationKey);
    return this.transferState.get(stateKey, null);
  }
}
