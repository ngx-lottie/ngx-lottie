import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { AnimationFilename } from '../../symbols';
import { transformAnimationFilenameToKey } from '../../utils';

@Injectable({ providedIn: 'root' })
export class LottieTransferState {
  constructor(private state: TransferState) {}

  public get<T>(animation: AnimationFilename): T | null {
    animation = transformAnimationFilenameToKey(animation);
    const key = makeStateKey<T>(animation);
    return this.state.get(key, null);
  }
}
