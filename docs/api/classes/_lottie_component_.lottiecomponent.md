[API](../README.md) > ["lottie.component"](../modules/_lottie_component_.md) > [LottieComponent](../classes/_lottie_component_.lottiecomponent.md)

# Class: LottieComponent

## Hierarchy

**LottieComponent**

## Implements

* `OnInit`
* [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md)

## Index

### Constructors

* [constructor](_lottie_component_.lottiecomponent.md#constructor)

### Properties

* [animationLoaded](_lottie_component_.lottiecomponent.md#animationloaded)
* [complete](_lottie_component_.lottiecomponent.md#complete)
* [configReady](_lottie_component_.lottiecomponent.md#configready)
* [container](_lottie_component_.lottiecomponent.md#container)
* [dataFailed](_lottie_component_.lottiecomponent.md#datafailed)
* [dataReady](_lottie_component_.lottiecomponent.md#dataready)
* [destroy](_lottie_component_.lottiecomponent.md#destroy)
* [domLoaded](_lottie_component_.lottiecomponent.md#domloaded)
* [enterFrame](_lottie_component_.lottiecomponent.md#enterframe)
* [loadedImages](_lottie_component_.lottiecomponent.md#loadedimages)
* [loopComplete](_lottie_component_.lottiecomponent.md#loopcomplete)
* [options](_lottie_component_.lottiecomponent.md#options)
* [segmentStart](_lottie_component_.lottiecomponent.md#segmentstart)

### Methods

* [ngOnInit](_lottie_component_.lottiecomponent.md#ngoninit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieComponent**(zone: *`NgZone`*, platformId: *`string`*, lottieEventsService: *[LottieEventsService](_lottie_events_service_.lottieeventsservice.md)*): [LottieComponent](_lottie_component_.lottiecomponent.md)

*Defined in lottie.component.ts:76*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |
| lottieEventsService | [LottieEventsService](_lottie_events_service_.lottieeventsservice.md) |

**Returns:** [LottieComponent](_lottie_component_.lottiecomponent.md)

___

## Properties

<a id="animationloaded"></a>

###  animationLoaded

**● animationLoaded**: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>* =  new EventEmitter<AnimationItem>()

*Defined in lottie.component.ts:46*

___
<a id="complete"></a>

###  complete

**● complete**: *`EventEmitter`<[BMCompleteEvent](../interfaces/_symbols_.bmcompleteevent.md)>* =  new EventEmitter<BMCompleteEvent>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[complete](../interfaces/_symbols_.lottiecomponentconfigurable.md#complete)*

*Defined in lottie.component.ts:49*

___
<a id="configready"></a>

###  configReady

**● configReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[configReady](../interfaces/_symbols_.lottiecomponentconfigurable.md#configready)*

*Defined in lottie.component.ts:61*

___
<a id="container"></a>

###  container

**● container**: *`ElementRef`<`HTMLElement`>* =  null!

*Defined in lottie.component.ts:43*

___
<a id="datafailed"></a>

###  dataFailed

**● dataFailed**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[dataFailed](../interfaces/_symbols_.lottiecomponentconfigurable.md#datafailed)*

*Defined in lottie.component.ts:67*

___
<a id="dataready"></a>

###  dataReady

**● dataReady**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[dataReady](../interfaces/_symbols_.lottiecomponentconfigurable.md#dataready)*

*Defined in lottie.component.ts:64*

___
<a id="destroy"></a>

###  destroy

**● destroy**: *`EventEmitter`<[BMDestroyEvent](../interfaces/_symbols_.bmdestroyevent.md)>* =  new EventEmitter<BMDestroyEvent>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[destroy](../interfaces/_symbols_.lottiecomponentconfigurable.md#destroy)*

*Defined in lottie.component.ts:76*

___
<a id="domloaded"></a>

###  domLoaded

**● domLoaded**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[domLoaded](../interfaces/_symbols_.lottiecomponentconfigurable.md#domloaded)*

*Defined in lottie.component.ts:73*

___
<a id="enterframe"></a>

###  enterFrame

**● enterFrame**: *`EventEmitter`<[BMEnterFrameEvent](../interfaces/_symbols_.bmenterframeevent.md)>* =  new EventEmitter<BMEnterFrameEvent>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[enterFrame](../interfaces/_symbols_.lottiecomponentconfigurable.md#enterframe)*

*Defined in lottie.component.ts:55*

___
<a id="loadedimages"></a>

###  loadedImages

**● loadedImages**: *`EventEmitter`<`void`>* =  new EventEmitter<void>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[loadedImages](../interfaces/_symbols_.lottiecomponentconfigurable.md#loadedimages)*

*Defined in lottie.component.ts:70*

___
<a id="loopcomplete"></a>

###  loopComplete

**● loopComplete**: *`EventEmitter`<[BMCompleteLoopEvent](../interfaces/_symbols_.bmcompleteloopevent.md)>* =  new EventEmitter<BMCompleteLoopEvent>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[loopComplete](../interfaces/_symbols_.lottiecomponentconfigurable.md#loopcomplete)*

*Defined in lottie.component.ts:52*

___
<a id="options"></a>

###  options

**● options**: *[LottieOptions](../interfaces/_symbols_.lottieoptions.md)*

*Defined in lottie.component.ts:40*

___
<a id="segmentstart"></a>

###  segmentStart

**● segmentStart**: *`EventEmitter`<[BMSegmentStartEvent](../interfaces/_symbols_.bmsegmentstartevent.md)>* =  new EventEmitter<BMSegmentStartEvent>()

*Implementation of [LottieComponentConfigurable](../interfaces/_symbols_.lottiecomponentconfigurable.md).[segmentStart](../interfaces/_symbols_.lottiecomponentconfigurable.md#segmentstart)*

*Defined in lottie.component.ts:58*

___

## Methods

<a id="ngoninit"></a>

###  ngOnInit

▸ **ngOnInit**(): `void`

*Defined in lottie.component.ts:84*

**Returns:** `void`

___

