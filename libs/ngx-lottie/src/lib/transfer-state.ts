import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';

import { AnimationFilename } from './symbols';
import { transformAnimationFilenameToKey } from './server';

@Injectable({ providedIn: 'root' })
export class LottieTransferState {
  private transferState = inject(TransferState);

  get<T>(animation: AnimationFilename): T | null {
    const animationKey = transformAnimationFilenameToKey(animation);
    const stateKey = makeStateKey<T>(animationKey);
    return this.transferState.get(stateKey, null);
  }
}
