import { NgZone, EventEmitter } from '@angular/core';

import {
  LottieOptions,
  Lottie,
  LottieEventName,
  AnimationItem,
  MappedLottieEventName,
  LottieEvent
} from './symbols';
import { BaseDirective } from './core/directives/base.directive';

const getLottiePlayer = (): Promise<Lottie> => {
  return import(/* webpackChunkName: 'lottie' */ 'lottie-web/build/player/lottie.js');
};

function resolveOptions(options: LottieOptions | null, container: HTMLElement): LottieOptions {
  const defaulOptions: LottieOptions = {
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true
  };

  return Object.assign(defaulOptions, options);
}

export async function loadAnimation(
  zone: NgZone,
  options: LottieOptions | null,
  container: HTMLElement
): Promise<AnimationItem> {
  options = resolveOptions(options, container);
  const player = await getLottiePlayer();
  return zone.runOutsideAngular(() => player.loadAnimation(options!));
}

/**
 * Some dispatched events are in the `snake_case` registry, for convenience,
 * we create this object that will map event name to the `camelCase` registry
 */
const eventsMap: { [key in LottieEventName]: MappedLottieEventName } = {
  complete: 'complete',
  loopComplete: 'loopComplete',
  enterFrame: 'enterFrame',
  segmentStart: 'segmentStart',
  config_ready: 'configReady',
  data_ready: 'dataReady',
  data_failed: 'dataFailed',
  loaded_images: 'loadedImages',
  DOMLoaded: 'domLoaded',
  destroy: 'destroy'
};

/**
 * @param name - Name of the event in the `snake_case` dispatched by Lottie
 * @returns - Resolved event name in the `camelCase`
 */
function mapEventToCamelCase(name: LottieEventName): MappedLottieEventName {
  return eventsMap[name];
}

export function getEventEmitterFromDirectiveInstance(
  instance: BaseDirective,
  name: LottieEventName
) {
  return instance[mapEventToCamelCase(name)] as EventEmitter<LottieEvent>;
}

/**
 * Events that can be dispatched by `Animationitem`
 * @see https://github.com/airbnb/lottie-web#events
 */
export const lottieEvents: ReadonlyArray<LottieEventName> = [
  'complete',
  'loopComplete',
  'enterFrame',
  'segmentStart',
  'config_ready',
  'data_ready',
  'data_failed',
  'loaded_images',
  'DOMLoaded',
  'destroy'
];
