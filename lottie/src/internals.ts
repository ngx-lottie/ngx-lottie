import { NgZone, EventEmitter } from '@angular/core';

const player: Lottie = require('lottie-web/build/player/lottie.js');

import {
  LottieOptions,
  Lottie,
  LottieEventName,
  AnimationItem,
  MappedLottieEventName,
  LottieEvent,
  LottieComponentConfigurable
} from './symbols';

export function resolveOptions(options: LottieOptions, container: HTMLElement): LottieOptions {
  const defaulOptions: LottieOptions = {
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true
  };

  return Object.assign(defaulOptions, options);
}

export function loadAnimation(zone: NgZone, options: LottieOptions): AnimationItem {
  return zone.runOutsideAngular(() => player.loadAnimation(options));
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

export function getEventEmitterFromComponentInstance(
  instance: LottieComponentConfigurable,
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
