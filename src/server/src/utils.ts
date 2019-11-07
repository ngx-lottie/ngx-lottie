import { readFile } from 'fs';

import { AnimationData } from './symbols';

export function readFileWithAnimationData(path: string) {
  return new Promise<AnimationData>((resolve, reject) => {
    readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      resolve(data.toString());
    });
  });
}
