[API](../README.md) > ["lottie-events.service"](../modules/_lottie_events_service_.md) > [LottieEventsService](../classes/_lottie_events_service_.lottieeventsservice.md)

# Class: LottieEventsService

## Hierarchy

**LottieEventsService**

## Implements

* `OnDestroy`

## Index

### Constructors

* [constructor](_lottie_events_service_.lottieeventsservice.md#constructor)

### Methods

* [animationCreated](_lottie_events_service_.lottieeventsservice.md#animationcreated)
* [ngOnDestroy](_lottie_events_service_.lottieeventsservice.md#ngondestroy)
* [setAnimationItemAndLottieEventListeners](_lottie_events_service_.lottieeventsservice.md#setanimationitemandlottieeventlisteners)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieEventsService**(zone: *`NgZone`*): [LottieEventsService](_lottie_events_service_.lottieeventsservice.md)

*Defined in lottie-events.service.ts:15*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |

**Returns:** [LottieEventsService](_lottie_events_service_.lottieeventsservice.md)

___

## Methods

<a id="animationcreated"></a>

###  animationCreated

▸ **animationCreated**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, animationCreated: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>*): `void`

*Defined in lottie-events.service.ts:27*

This method is invoked after calling `loadAnimation` and dispatches the new one created `AnimationItem` instance

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationItem | [AnimationItem](../interfaces/_symbols_.animationitem.md) |
| animationCreated | `EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)> |

**Returns:** `void`

___
<a id="ngondestroy"></a>

###  ngOnDestroy

▸ **ngOnDestroy**(): `void`

*Defined in lottie-events.service.ts:19*

**Returns:** `void`

___
<a id="setanimationitemandlottieeventlisteners"></a>

###  setAnimationItemAndLottieEventListeners

▸ **setAnimationItemAndLottieEventListeners**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, instance: *[LottieComponent](_lottie_component_.lottiecomponent.md)*): `void`

*Defined in lottie-events.service.ts:34*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationItem | [AnimationItem](../interfaces/_symbols_.animationitem.md) |
| instance | [LottieComponent](_lottie_component_.lottiecomponent.md) |

**Returns:** `void`

___

