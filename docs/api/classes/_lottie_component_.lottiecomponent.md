[API](../README.md) > ["lottie.component"](../modules/_lottie_component_.md) > [LottieComponent](../classes/_lottie_component_.lottiecomponent.md)

# Class: LottieComponent

## Hierarchy

**LottieComponent**

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](_lottie_component_.lottiecomponent.md#constructor)

### Properties

* [animationCreated](_lottie_component_.lottiecomponent.md#animationcreated)
* [complete](_lottie_component_.lottiecomponent.md#complete)
* [configReady](_lottie_component_.lottiecomponent.md#configready)
* [container](_lottie_component_.lottiecomponent.md#container)
* [containerClass](_lottie_component_.lottiecomponent.md#containerclass)
* [dataFailed](_lottie_component_.lottiecomponent.md#datafailed)
* [dataReady](_lottie_component_.lottiecomponent.md#dataready)
* [destroy](_lottie_component_.lottiecomponent.md#destroy)
* [domLoaded](_lottie_component_.lottiecomponent.md#domloaded)
* [enterFrame](_lottie_component_.lottiecomponent.md#enterframe)
* [height](_lottie_component_.lottiecomponent.md#height)
* [loadedImages](_lottie_component_.lottiecomponent.md#loadedimages)
* [loopComplete](_lottie_component_.lottiecomponent.md#loopcomplete)
* [options](_lottie_component_.lottiecomponent.md#options)
* [segmentStart](_lottie_component_.lottiecomponent.md#segmentstart)
* [styles](_lottie_component_.lottiecomponent.md#styles)
* [width](_lottie_component_.lottiecomponent.md#width)

### Methods

* [ngOnInit](_lottie_component_.lottiecomponent.md#ngoninit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieComponent**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_lottie_events_service_.lottieeventsservice.md)*): [LottieComponent](_lottie_component_.lottiecomponent.md)

*Defined in lottie.component.ts:136*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_lottie_events_service_.lottieeventsservice.md) |

**Returns:** [LottieComponent](_lottie_component_.lottiecomponent.md)

___

## Properties

<a id="animationcreated"></a>

###  animationCreated

**● animationCreated**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Defined in lottie.component.ts:69*

`animationCreated` is dispatched after calling `loadAnimation`

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Defined in lottie.component.ts:75*

`complete` is dispatched after completing the last frame

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in lottie.component.ts:100*

Original event name is `config_ready`. `config_ready` is dispatched after the needed renderer is configured

___
<a id="container"></a>

###  container

**● container**: *`ElementRef`<`HTMLElement`>* =  null!

*Defined in lottie.component.ts:51*

___
<a id="containerclass"></a>

###  containerClass

**● containerClass**: *[ContainerClass](../modules/_symbols_.md#containerclass)* =  null

*Defined in lottie.component.ts:54*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in lottie.component.ts:115*

Original event name is `data_failed`. `data_failed` can be dispatched if the `XMLHttpRequest`, that tried to load animation data using provided `path`, has errored

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in lottie.component.ts:107*

Original event name is `data_ready`. `data_ready` is dispatched when all parts of the animation have been loaded

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Defined in lottie.component.ts:136*

`destroy` will be dispatched in the `ngOnDestroy` hook of the service, it's useful for releasing resources

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in lottie.component.ts:129*

Original event name is `DOMLoaded`. `DOMLoaded` is dispatched when elements have been added to the DOM

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Defined in lottie.component.ts:87*

`enterFrame` is dispatched after entering the new frame

___
<a id="height"></a>

###  height

**● height**: *`string`* =  null!

*Defined in lottie.component.ts:63*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Defined in lottie.component.ts:122*

Original event name is `loaded_images`. `loaded_images` can be dispatched after all assets are preloaded

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Defined in lottie.component.ts:81*

`loopComplete` is dispatched after completing frame loop

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md) \| `null`* =  null

*Defined in lottie.component.ts:48*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Defined in lottie.component.ts:93*

`segmentStart` is dispatched when the new segment is adjusted

___
<a id="styles"></a>

###  styles

**● styles**: *[LottieCSSStyleDeclaration](../modules/_symbols_.md#lottiecssstyledeclaration) \| `null`* =  null

*Defined in lottie.component.ts:57*

___
<a id="width"></a>

###  width

**● width**: *`string`* =  null!

*Defined in lottie.component.ts:60*

___

## Methods

<a id="ngoninit"></a>

###  ngOnInit

▸ **ngOnInit**(): `void`

*Defined in lottie.component.ts:144*

**Returns:** `void`

___

