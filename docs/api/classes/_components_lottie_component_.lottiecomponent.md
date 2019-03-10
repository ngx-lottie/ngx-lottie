[API](../README.md) > ["components/lottie.component"](../modules/_components_lottie_component_.md) > [LottieComponent](../classes/_components_lottie_component_.lottiecomponent.md)

# Class: LottieComponent

## Hierarchy

 [BaseDirective](_directives_base_directive_.basedirective.md)

**↳ LottieComponent**

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](_components_lottie_component_.lottiecomponent.md#constructor)

### Properties

* [animationCreated](_components_lottie_component_.lottiecomponent.md#animationcreated)
* [complete](_components_lottie_component_.lottiecomponent.md#complete)
* [configReady](_components_lottie_component_.lottiecomponent.md#configready)
* [container](_components_lottie_component_.lottiecomponent.md#container)
* [containerClass](_components_lottie_component_.lottiecomponent.md#containerclass)
* [dataFailed](_components_lottie_component_.lottiecomponent.md#datafailed)
* [dataReady](_components_lottie_component_.lottiecomponent.md#dataready)
* [destroy](_components_lottie_component_.lottiecomponent.md#destroy)
* [domLoaded](_components_lottie_component_.lottiecomponent.md#domloaded)
* [enterFrame](_components_lottie_component_.lottiecomponent.md#enterframe)
* [height](_components_lottie_component_.lottiecomponent.md#height)
* [loadedImages](_components_lottie_component_.lottiecomponent.md#loadedimages)
* [loopComplete](_components_lottie_component_.lottiecomponent.md#loopcomplete)
* [options](_components_lottie_component_.lottiecomponent.md#options)
* [segmentStart](_components_lottie_component_.lottiecomponent.md#segmentstart)
* [styles](_components_lottie_component_.lottiecomponent.md#styles)
* [width](_components_lottie_component_.lottiecomponent.md#width)

### Methods

* [loadAnimation](_components_lottie_component_.lottiecomponent.md#loadanimation)
* [ngOnInit](_components_lottie_component_.lottiecomponent.md#ngoninit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieComponent**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)*): [LottieComponent](_components_lottie_component_.lottiecomponent.md)

*Defined in [components/lottie.component.ts:33](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/components/lottie.component.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md) |

**Returns:** [LottieComponent](_components_lottie_component_.lottiecomponent.md)

___

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[animationCreated](_directives_base_directive_.basedirective.md#animationcreated)*

*Defined in [directives/base.directive.ts:41](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L41)*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[complete](_directives_base_directive_.basedirective.md#complete)*

*Defined in [directives/base.directive.ts:47](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L47)*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[configReady](_directives_base_directive_.basedirective.md#configready)*

*Defined in [directives/base.directive.ts:72](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L72)*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="container"></a>

###  container

**● container**: *`ElementRef`<`HTMLElement`>* =  null!

*Defined in [components/lottie.component.ts:33](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/components/lottie.component.ts#L33)*

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[LottieContainerClass](../modules/_symbols_.md#lottiecontainerclass)* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[containerClass](_directives_base_directive_.basedirective.md#containerclass)*

*Defined in [directives/base.directive.ts:26](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L26)*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[dataFailed](_directives_base_directive_.basedirective.md#datafailed)*

*Defined in [directives/base.directive.ts:87](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L87)*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[dataReady](_directives_base_directive_.basedirective.md#dataready)*

*Defined in [directives/base.directive.ts:79](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L79)*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[destroy](_directives_base_directive_.basedirective.md#destroy)*

*Defined in [directives/base.directive.ts:108](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L108)*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[domLoaded](_directives_base_directive_.basedirective.md#domloaded)*

*Defined in [directives/base.directive.ts:101](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L101)*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[enterFrame](_directives_base_directive_.basedirective.md#enterframe)*

*Defined in [directives/base.directive.ts:59](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L59)*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[height](_directives_base_directive_.basedirective.md#height)*

*Defined in [directives/base.directive.ts:35](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L35)*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loadedImages](_directives_base_directive_.basedirective.md#loadedimages)*

*Defined in [directives/base.directive.ts:94](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L94)*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loopComplete](_directives_base_directive_.basedirective.md#loopcomplete)*

*Defined in [directives/base.directive.ts:53](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L53)*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[options](_directives_base_directive_.basedirective.md#options)*

*Defined in [directives/base.directive.ts:23](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L23)*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[segmentStart](_directives_base_directive_.basedirective.md#segmentstart)*

*Defined in [directives/base.directive.ts:65](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L65)*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[styles](_directives_base_directive_.basedirective.md#styles)*

*Defined in [directives/base.directive.ts:29](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L29)*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[width](_directives_base_directive_.basedirective.md#width)*

*Defined in [directives/base.directive.ts:32](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/directives/base.directive.ts#L32)*

___

## Methods

<a id="loadanimation"></a>

### `<Protected>` loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)*, container: *`HTMLElement` \| `HTMLCanvasElement`*, instance: *[LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md)*): `Promise`<`void`>

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loadAnimation](_directives_base_directive_.basedirective.md#loadanimation)*

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
<a id="ngoninit"></a>

###  ngOnInit

▸ **ngOnInit**(): `void`

*Defined in [components/lottie.component.ts:43](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/components/lottie.component.ts#L43)*

**Returns:** `void`

___

