[API](../README.md) > ["directives/lottie.directive"](../modules/_directives_lottie_directive_.md) > [LottieDirective](../classes/_directives_lottie_directive_.lottiedirective.md)

# Class: LottieDirective

## Hierarchy

 [BaseDirective](_directives_base_directive_.basedirective.md)

**↳ LottieDirective**

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](_directives_lottie_directive_.lottiedirective.md#constructor)

### Properties

* [animationCreated](_directives_lottie_directive_.lottiedirective.md#animationcreated)
* [complete](_directives_lottie_directive_.lottiedirective.md#complete)
* [configReady](_directives_lottie_directive_.lottiedirective.md#configready)
* [containerClass](_directives_lottie_directive_.lottiedirective.md#containerclass)
* [dataFailed](_directives_lottie_directive_.lottiedirective.md#datafailed)
* [dataReady](_directives_lottie_directive_.lottiedirective.md#dataready)
* [destroy](_directives_lottie_directive_.lottiedirective.md#destroy)
* [domLoaded](_directives_lottie_directive_.lottiedirective.md#domloaded)
* [enterFrame](_directives_lottie_directive_.lottiedirective.md#enterframe)
* [height](_directives_lottie_directive_.lottiedirective.md#height)
* [loadedImages](_directives_lottie_directive_.lottiedirective.md#loadedimages)
* [loopComplete](_directives_lottie_directive_.lottiedirective.md#loopcomplete)
* [options](_directives_lottie_directive_.lottiedirective.md#options)
* [segmentStart](_directives_lottie_directive_.lottiedirective.md#segmentstart)
* [styles](_directives_lottie_directive_.lottiedirective.md#styles)
* [width](_directives_lottie_directive_.lottiedirective.md#width)

### Methods

* [loadAnimation](_directives_lottie_directive_.lottiedirective.md#loadanimation)
* [ngOnInit](_directives_lottie_directive_.lottiedirective.md#ngoninit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieDirective**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)*, host: *`ElementRef`<`HTMLElement`>*): [LottieDirective](_directives_lottie_directive_.lottiedirective.md)

*Defined in directives/lottie.directive.ts:10*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md) |
| host | `ElementRef`<`HTMLElement`> |

**Returns:** [LottieDirective](_directives_lottie_directive_.lottiedirective.md)

___

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[animationCreated](_directives_base_directive_.basedirective.md#animationcreated)*

*Defined in directives/base.directive.ts:41*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[complete](_directives_base_directive_.basedirective.md#complete)*

*Defined in directives/base.directive.ts:47*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[configReady](_directives_base_directive_.basedirective.md#configready)*

*Defined in directives/base.directive.ts:72*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[LottieContainerClass](../modules/_symbols_.md#lottiecontainerclass)* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[containerClass](_directives_base_directive_.basedirective.md#containerclass)*

*Defined in directives/base.directive.ts:26*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[dataFailed](_directives_base_directive_.basedirective.md#datafailed)*

*Defined in directives/base.directive.ts:87*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[dataReady](_directives_base_directive_.basedirective.md#dataready)*

*Defined in directives/base.directive.ts:79*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[destroy](_directives_base_directive_.basedirective.md#destroy)*

*Defined in directives/base.directive.ts:108*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[domLoaded](_directives_base_directive_.basedirective.md#domloaded)*

*Defined in directives/base.directive.ts:101*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[enterFrame](_directives_base_directive_.basedirective.md#enterframe)*

*Defined in directives/base.directive.ts:59*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[height](_directives_base_directive_.basedirective.md#height)*

*Defined in directives/base.directive.ts:35*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loadedImages](_directives_base_directive_.basedirective.md#loadedimages)*

*Defined in directives/base.directive.ts:94*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loopComplete](_directives_base_directive_.basedirective.md#loopcomplete)*

*Defined in directives/base.directive.ts:53*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[options](_directives_base_directive_.basedirective.md#options)*

*Defined in directives/base.directive.ts:23*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[segmentStart](_directives_base_directive_.basedirective.md#segmentstart)*

*Defined in directives/base.directive.ts:65*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[styles](_directives_base_directive_.basedirective.md#styles)*

*Defined in directives/base.directive.ts:29*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[width](_directives_base_directive_.basedirective.md#width)*

*Defined in directives/base.directive.ts:32*

___

## Methods

<a id="loadanimation"></a>

### `<Protected>` loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)*, container: *`HTMLElement` \| `HTMLCanvasElement`*, instance: *[LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md)*): `Promise`<`void`>

*Inherited from [BaseDirective](_directives_base_directive_.basedirective.md).[loadAnimation](_directives_base_directive_.basedirective.md#loadanimation)*

*Defined in directives/base.directive.ts:110*

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

*Defined in directives/lottie.directive.ts:20*

**Returns:** `void`

___

