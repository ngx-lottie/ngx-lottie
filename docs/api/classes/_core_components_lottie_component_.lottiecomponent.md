[API](../README.md) > ["core/components/lottie.component"](../modules/_core_components_lottie_component_.md) > [LottieComponent](../classes/_core_components_lottie_component_.lottiecomponent.md)

# Class: LottieComponent

## Hierarchy

 [BaseDirective](_core_directives_base_directive_.basedirective.md)

**↳ LottieComponent**

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](_core_components_lottie_component_.lottiecomponent.md#constructor)

### Properties

* [animationCreated](_core_components_lottie_component_.lottiecomponent.md#animationcreated)
* [complete](_core_components_lottie_component_.lottiecomponent.md#complete)
* [configReady](_core_components_lottie_component_.lottiecomponent.md#configready)
* [container](_core_components_lottie_component_.lottiecomponent.md#container)
* [containerClass](_core_components_lottie_component_.lottiecomponent.md#containerclass)
* [dataFailed](_core_components_lottie_component_.lottiecomponent.md#datafailed)
* [dataReady](_core_components_lottie_component_.lottiecomponent.md#dataready)
* [destroy](_core_components_lottie_component_.lottiecomponent.md#destroy)
* [domLoaded](_core_components_lottie_component_.lottiecomponent.md#domloaded)
* [enterFrame](_core_components_lottie_component_.lottiecomponent.md#enterframe)
* [height](_core_components_lottie_component_.lottiecomponent.md#height)
* [loadedImages](_core_components_lottie_component_.lottiecomponent.md#loadedimages)
* [loopComplete](_core_components_lottie_component_.lottiecomponent.md#loopcomplete)
* [options](_core_components_lottie_component_.lottiecomponent.md#options)
* [segmentStart](_core_components_lottie_component_.lottiecomponent.md#segmentstart)
* [styles](_core_components_lottie_component_.lottiecomponent.md#styles)
* [width](_core_components_lottie_component_.lottiecomponent.md#width)

### Methods

* [loadAnimation](_core_components_lottie_component_.lottiecomponent.md#loadanimation)
* [ngOnInit](_core_components_lottie_component_.lottiecomponent.md#ngoninit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieComponent**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md)*): [LottieComponent](_core_components_lottie_component_.lottiecomponent.md)

*Defined in core/components/lottie.component.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md) |

**Returns:** [LottieComponent](_core_components_lottie_component_.lottiecomponent.md)

___

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[animationCreated](_core_directives_base_directive_.basedirective.md#animationcreated)*

*Defined in core/directives/base.directive.ts:39*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[complete](_core_directives_base_directive_.basedirective.md#complete)*

*Defined in core/directives/base.directive.ts:45*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[configReady](_core_directives_base_directive_.basedirective.md#configready)*

*Defined in core/directives/base.directive.ts:70*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="container"></a>

###  container

**● container**: *`ElementRef`<`HTMLElement`>* =  null!

*Defined in core/components/lottie.component.ts:33*

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[LottieContainerClass](../modules/_symbols_.md#lottiecontainerclass)* =  null

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[containerClass](_core_directives_base_directive_.basedirective.md#containerclass)*

*Defined in core/directives/base.directive.ts:24*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[dataFailed](_core_directives_base_directive_.basedirective.md#datafailed)*

*Defined in core/directives/base.directive.ts:85*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[dataReady](_core_directives_base_directive_.basedirective.md#dataready)*

*Defined in core/directives/base.directive.ts:77*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[destroy](_core_directives_base_directive_.basedirective.md#destroy)*

*Defined in core/directives/base.directive.ts:106*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[domLoaded](_core_directives_base_directive_.basedirective.md#domloaded)*

*Defined in core/directives/base.directive.ts:99*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[enterFrame](_core_directives_base_directive_.basedirective.md#enterframe)*

*Defined in core/directives/base.directive.ts:57*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[height](_core_directives_base_directive_.basedirective.md#height)*

*Defined in core/directives/base.directive.ts:33*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[loadedImages](_core_directives_base_directive_.basedirective.md#loadedimages)*

*Defined in core/directives/base.directive.ts:92*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[loopComplete](_core_directives_base_directive_.basedirective.md#loopcomplete)*

*Defined in core/directives/base.directive.ts:51*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[options](_core_directives_base_directive_.basedirective.md#options)*

*Defined in core/directives/base.directive.ts:21*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[segmentStart](_core_directives_base_directive_.basedirective.md#segmentstart)*

*Defined in core/directives/base.directive.ts:63*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[styles](_core_directives_base_directive_.basedirective.md#styles)*

*Defined in core/directives/base.directive.ts:27*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[width](_core_directives_base_directive_.basedirective.md#width)*

*Defined in core/directives/base.directive.ts:30*

___

## Methods

<a id="loadanimation"></a>

### `<Protected>` loadAnimation

▸ **loadAnimation**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md)*, container: *`HTMLElement` \| `HTMLCanvasElement`*, instance: *[BaseDirective](_core_directives_base_directive_.basedirective.md)*): `Promise`<`void`>

*Inherited from [BaseDirective](_core_directives_base_directive_.basedirective.md).[loadAnimation](_core_directives_base_directive_.basedirective.md#loadanimation)*

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
<a id="ngoninit"></a>

###  ngOnInit

▸ **ngOnInit**(): `void`

*Defined in core/components/lottie.component.ts:43*

**Returns:** `void`

___

