[API](../README.md) > ["internals"](../modules/_internals_.md)

# External module: "internals"

## Index

### Variables

* [lottieEvents](_internals_.md#lottieevents)

### Functions

* [getEventEmitterFromComponentInstance](_internals_.md#geteventemitterfromcomponentinstance)
* [getLottiePlayer](_internals_.md#getlottieplayer)
* [loadAnimation](_internals_.md#loadanimation)
* [mapEventToCamelCase](_internals_.md#mapeventtocamelcase)
* [resolveOptions](_internals_.md#resolveoptions)

### Object literals

* [eventsMap](_internals_.md#eventsmap)

---

## Variables

<a id="lottieevents"></a>

### `<Const>` lottieEvents

**● lottieEvents**: *`ReadonlyArray`<[LottieEventName](_symbols_.md#lottieeventname)>* =  [
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
]

*Defined in internals.ts:74*

Events that can be dispatched by `Animationitem`

*__see__*: [https://github.com/airbnb/lottie-web#events](https://github.com/airbnb/lottie-web#events)

___

## Functions

<a id="geteventemitterfromcomponentinstance"></a>

###  getEventEmitterFromComponentInstance

▸ **getEventEmitterFromComponentInstance**(instance: *[LottieComponent](../classes/_lottie_component_.lottiecomponent.md)*, name: *[LottieEventName](_symbols_.md#lottieeventname)*): `EventEmitter`<`void` \| [BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md) \| [BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md) \| [BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md) \| [BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md) \| [BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>

*Defined in internals.ts:63*

**Parameters:**

| Name | Type |
| ------ | ------ |
| instance | [LottieComponent](../classes/_lottie_component_.lottiecomponent.md) |
| name | [LottieEventName](_symbols_.md#lottieeventname) |

**Returns:** `EventEmitter`<`void` \| [BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md) \| [BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md) \| [BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md) \| [BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md) \| [BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>

___
<a id="getlottieplayer"></a>

### `<Const>` getLottiePlayer

▸ **getLottiePlayer**(): `Promise`<[Lottie](../interfaces/_symbols_.lottie.md)>

*Defined in internals.ts:13*

**Returns:** `Promise`<[Lottie](../interfaces/_symbols_.lottie.md)>

___
<a id="loadanimation"></a>

###  loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, options: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`*, container: *`HTMLElement`*): `Promise`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>

*Defined in internals.ts:28*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| options | [LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null` |
| container | `HTMLElement` |

**Returns:** `Promise`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>

___
<a id="mapeventtocamelcase"></a>

###  mapEventToCamelCase

▸ **mapEventToCamelCase**(name: *[LottieEventName](_symbols_.md#lottieeventname)*): [MappedLottieEventName](_symbols_.md#mappedlottieeventname)

*Defined in internals.ts:59*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | [LottieEventName](_symbols_.md#lottieeventname) |  Name of the event in the \`snake\_case\` dispatched by Lottie |

**Returns:** [MappedLottieEventName](_symbols_.md#mappedlottieeventname)
- Resolved event name in the `camelCase`

___
<a id="resolveoptions"></a>

###  resolveOptions

▸ **resolveOptions**(options: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`*, container: *`HTMLElement`*): [LottieOptions](../interfaces/_symbols_.lottieoptions.md)

*Defined in internals.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null` |
| container | `HTMLElement` |

**Returns:** [LottieOptions](../interfaces/_symbols_.lottieoptions.md)

___

## Object literals

<a id="eventsmap"></a>

### `<Const>` eventsMap

**eventsMap**: *`object`*

*Defined in internals.ts:42*

Some dispatched events are in the `snake_case` registry, for convenience, we create this object that will map event name to the `camelCase` registry

<a id="eventsmap.domloaded"></a>

####  DOMLoaded

**● DOMLoaded**: *"domLoaded"* = "domLoaded"

*Defined in internals.ts:51*

___
<a id="eventsmap.complete"></a>

####  complete

**● complete**: *"complete"* = "complete"

*Defined in internals.ts:43*

___
<a id="eventsmap.config_ready"></a>

####  config_ready

**● config_ready**: *"configReady"* = "configReady"

*Defined in internals.ts:47*

___
<a id="eventsmap.data_failed"></a>

####  data_failed

**● data_failed**: *"dataFailed"* = "dataFailed"

*Defined in internals.ts:49*

___
<a id="eventsmap.data_ready"></a>

####  data_ready

**● data_ready**: *"dataReady"* = "dataReady"

*Defined in internals.ts:48*

___
<a id="eventsmap.destroy"></a>

####  destroy

**● destroy**: *"destroy"* = "destroy"

*Defined in internals.ts:52*

___
<a id="eventsmap.enterframe"></a>

####  enterFrame

**● enterFrame**: *"enterFrame"* = "enterFrame"

*Defined in internals.ts:45*

___
<a id="eventsmap.loaded_images"></a>

####  loaded_images

**● loaded_images**: *"loadedImages"* = "loadedImages"

*Defined in internals.ts:50*

___
<a id="eventsmap.loopcomplete"></a>

####  loopComplete

**● loopComplete**: *"loopComplete"* = "loopComplete"

*Defined in internals.ts:44*

___
<a id="eventsmap.segmentstart"></a>

####  segmentStart

**● segmentStart**: *"segmentStart"* = "segmentStart"

*Defined in internals.ts:46*

___

___

