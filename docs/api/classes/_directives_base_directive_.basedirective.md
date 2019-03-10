[API](../README.md) > ["directives/base.directive"](../modules/_directives_base_directive_.md) > [BaseDirective](../classes/_directives_base_directive_.basedirective.md)

# Class: BaseDirective

## Hierarchy

**BaseDirective**

↳  [LottieDirective](_directives_lottie_directive_.lottiedirective.md)

↳  [LottieComponent](_components_lottie_component_.lottiecomponent.md)

## Index

### Properties

* [animationCreated](_directives_base_directive_.basedirective.md#animationcreated)
* [complete](_directives_base_directive_.basedirective.md#complete)
* [configReady](_directives_base_directive_.basedirective.md#configready)
* [containerClass](_directives_base_directive_.basedirective.md#containerclass)
* [dataFailed](_directives_base_directive_.basedirective.md#datafailed)
* [dataReady](_directives_base_directive_.basedirective.md#dataready)
* [destroy](_directives_base_directive_.basedirective.md#destroy)
* [domLoaded](_directives_base_directive_.basedirective.md#domloaded)
* [enterFrame](_directives_base_directive_.basedirective.md#enterframe)
* [height](_directives_base_directive_.basedirective.md#height)
* [loadedImages](_directives_base_directive_.basedirective.md#loadedimages)
* [loopComplete](_directives_base_directive_.basedirective.md#loopcomplete)
* [options](_directives_base_directive_.basedirective.md#options)
* [segmentStart](_directives_base_directive_.basedirective.md#segmentstart)
* [styles](_directives_base_directive_.basedirective.md#styles)
* [width](_directives_base_directive_.basedirective.md#width)

### Methods

* [loadAnimation](_directives_base_directive_.basedirective.md#loadanimation)

---

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Defined in [directives/base.directive.ts:41](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L41)*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Defined in [directives/base.directive.ts:47](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L47)*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in [directives/base.directive.ts:72](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L72)*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[LottieContainerClass](../modules/_symbols_.md#lottiecontainerclass)* =  null

*Defined in [directives/base.directive.ts:26](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L26)*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in [directives/base.directive.ts:87](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L87)*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in [directives/base.directive.ts:79](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L79)*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Defined in [directives/base.directive.ts:108](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L108)*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in [directives/base.directive.ts:101](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L101)*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Defined in [directives/base.directive.ts:59](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L59)*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Defined in [directives/base.directive.ts:35](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L35)*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in [directives/base.directive.ts:94](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L94)*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Defined in [directives/base.directive.ts:53](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L53)*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Defined in [directives/base.directive.ts:23](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L23)*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Defined in [directives/base.directive.ts:65](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L65)*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Defined in [directives/base.directive.ts:29](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L29)*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Defined in [directives/base.directive.ts:32](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L32)*

___

## Methods

<a id="loadanimation"></a>

### `<Protected>` loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)*, container: *`HTMLElement` \| `HTMLCanvasElement`*, instance: *[LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md)*): `Promise`<`void`>

*Defined in [directives/base.directive.ts:110](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md) |
| container | `HTMLElement` \| `HTMLCanvasElement` |
| instance | [LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md) |

**Returns:** `Promise`<`void`>

___

