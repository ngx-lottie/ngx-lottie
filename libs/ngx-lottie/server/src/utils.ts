import { readFile } from 'fs';

import { AnimationData } from './symbols';

/** A simple cache used to store the serialized animation data. */
const cache = new Map<string, AnimationData>();

export function readFileWithAnimationData(path: string): Promise<AnimationData> {
  return cache.has(path)
    ? Promise.resolve(cache.get(path)!)
    : new Promise((resolve, reject) => {
        readFile(path, (error, buffer) => {
          if (error) {
            reject(error);
          } else {
            const data = buffer.toString();
            cache.set(path, data);
            resolve(data);
          }
        });
      });
}
