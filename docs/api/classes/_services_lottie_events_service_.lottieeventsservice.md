[API](../README.md) > ["services/lottie-events.service"](../modules/_services_lottie_events_service_.md) > [LottieEventsService](../classes/_services_lottie_events_service_.lottieeventsservice.md)

# Class: LottieEventsService

## Hierarchy

**LottieEventsService**

## Implements

* `OnDestroy`

## Index

### Constructors

* [constructor](_services_lottie_events_service_.lottieeventsservice.md#constructor)

### Methods

* [animationCreated](_services_lottie_events_service_.lottieeventsservice.md#animationcreated)
* [ngOnDestroy](_services_lottie_events_service_.lottieeventsservice.md#ngondestroy)
* [setAnimationItemAndLottieEventListeners](_services_lottie_events_service_.lottieeventsservice.md#setanimationitemandlottieeventlisteners)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieEventsService**(zone: *`NgZone`*): [LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)

*Defined in services/lottie-events.service.ts:16*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |

**Returns:** [LottieEventsService](_services_lottie_events_service_.lottieeventsservice.md)

___

## Methods

<a id="animationcreated"></a>

###  animationCreated

▸ **animationCreated**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, animationCreated: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>*): `void`

*Defined in services/lottie-events.service.ts:28*

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

*Defined in services/lottie-events.service.ts:20*

**Returns:** `void`

___
<a id="setanimationitemandlottieeventlisteners"></a>

###  setAnimationItemAndLottieEventListeners

▸ **setAnimationItemAndLottieEventListeners**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, instance: *[LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md)*): `void`

*Defined in services/lottie-events.service.ts:35*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationItem | [AnimationItem](../interfaces/_symbols_.animationitem.md) |
| instance | [LottieComponent](_components_lottie_component_.lottiecomponent.md) \| [LottieDirective](_directives_lottie_directive_.lottiedirective.md) |

**Returns:** `void`

___

