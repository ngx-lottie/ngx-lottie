import { readFile } from 'fs';
import { Observable } from 'rxjs';

import { AnimationData } from './symbols';

export function readFileWithAnimationData(path: string) {
  // `Promise` is not used here to avoid creation of microtasks
  return new Observable<AnimationData>((observer) => {
    readFile(path, { encoding: 'utf-8' }, (error, data) => {
      if (error) {
        observer.error(error);
      } else {
        observer.next(data);
      }

      observer.complete();
    });
  });
}
