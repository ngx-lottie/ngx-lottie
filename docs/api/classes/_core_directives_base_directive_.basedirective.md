[API](../README.md) > ["core/directives/base.directive"](../modules/_core_directives_base_directive_.md) > [BaseDirective](../classes/_core_directives_base_directive_.basedirective.md)

# Class: BaseDirective

## Hierarchy

**BaseDirective**

↳  [LottieComponent](_core_components_lottie_component_.lottiecomponent.md)

↳  [LottieDirective](_core_directives_lottie_directive_.lottiedirective.md)

## Index

### Properties

* [animationCreated](_core_directives_base_directive_.basedirective.md#animationcreated)
* [complete](_core_directives_base_directive_.basedirective.md#complete)
* [configReady](_core_directives_base_directive_.basedirective.md#configready)
* [containerClass](_core_directives_base_directive_.basedirective.md#containerclass)
* [dataFailed](_core_directives_base_directive_.basedirective.md#datafailed)
* [dataReady](_core_directives_base_directive_.basedirective.md#dataready)
* [destroy](_core_directives_base_directive_.basedirective.md#destroy)
* [domLoaded](_core_directives_base_directive_.basedirective.md#domloaded)
* [enterFrame](_core_directives_base_directive_.basedirective.md#enterframe)
* [height](_core_directives_base_directive_.basedirective.md#height)
* [loadedImages](_core_directives_base_directive_.basedirective.md#loadedimages)
* [loopComplete](_core_directives_base_directive_.basedirective.md#loopcomplete)
* [options](_core_directives_base_directive_.basedirective.md#options)
* [segmentStart](_core_directives_base_directive_.basedirective.md#segmentstart)
* [styles](_core_directives_base_directive_.basedirective.md#styles)
* [width](_core_directives_base_directive_.basedirective.md#width)

### Methods

* [loadAnimation](_core_directives_base_directive_.basedirective.md#loadanimation)

---

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Defined in core/directives/base.directive.ts:39*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Defined in core/directives/base.directive.ts:45*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in core/directives/base.directive.ts:70*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[LottieContainerClass](../modules/_symbols_.md#lottiecontainerclass)* =  null

*Defined in core/directives/base.directive.ts:24*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in core/directives/base.directive.ts:85*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in core/directives/base.directive.ts:77*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Defined in core/directives/base.directive.ts:106*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in core/directives/base.directive.ts:99*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Defined in core/directives/base.directive.ts:57*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Defined in core/directives/base.directive.ts:33*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in core/directives/base.directive.ts:92*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Defined in core/directives/base.directive.ts:51*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Defined in core/directives/base.directive.ts:21*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Defined in core/directives/base.directive.ts:63*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Defined in core/directives/base.directive.ts:27*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Defined in core/directives/base.directive.ts:30*

___

## Methods

<a id="loadanimation"></a>

### `<Protected>` loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md)*, container: *`HTMLElement` \| `HTMLCanvasElement`*, instance: *[BaseDirective](_core_directives_base_directive_.basedirective.md)*): `Promise`<`void`>

*Defined in core/directives/base.directive.ts:108*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md) |
| container | `HTMLElement` \| `HTMLCanvasElement` |
| instance | [BaseDirective](_core_directives_base_directive_.basedirective.md) |

**Returns:** `Promise`<`void`>

___

