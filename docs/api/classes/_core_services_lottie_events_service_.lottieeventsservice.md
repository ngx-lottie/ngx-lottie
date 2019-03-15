[API](../README.md) > ["core/services/lottie-events.service"](../modules/_core_services_lottie_events_service_.md) > [LottieEventsService](../classes/_core_services_lottie_events_service_.lottieeventsservice.md)

# Class: LottieEventsService

## Hierarchy

**LottieEventsService**

## Implements

* `OnDestroy`

## Index

### Constructors

* [constructor](_core_services_lottie_events_service_.lottieeventsservice.md#constructor)

### Methods

* [animationCreated](_core_services_lottie_events_service_.lottieeventsservice.md#animationcreated)
* [ngOnDestroy](_core_services_lottie_events_service_.lottieeventsservice.md#ngondestroy)
* [setAnimationItemAndLottieEventListeners](_core_services_lottie_events_service_.lottieeventsservice.md#setanimationitemandlottieeventlisteners)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LottieEventsService**(zone: *`NgZone`*, platformId: *`string`*): [LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md)

*Defined in core/services/lottie-events.service.ts:16*

**Parameters:**

| Name | Type |
| ------ | ------ |
| zone | `NgZone` |
| platformId | `string` |

**Returns:** [LottieEventsService](_core_services_lottie_events_service_.lottieeventsservice.md)

___

## Methods

<a id="animationcreated"></a>

###  animationCreated

▸ **animationCreated**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, animationCreated: *`EventEmitter`<[AnimationItem](../interfaces/_symbols_.animationitem.md)>*): `void`

*Defined in core/services/lottie-events.service.ts:31*

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

*Defined in core/services/lottie-events.service.ts:23*

**Returns:** `void`

___
<a id="setanimationitemandlottieeventlisteners"></a>

###  setAnimationItemAndLottieEventListeners

▸ **setAnimationItemAndLottieEventListeners**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, instance: *[BaseDirective](_core_directives_base_directive_.basedirective.md)*): `void`

*Defined in core/services/lottie-events.service.ts:38*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationItem | [AnimationItem](../interfaces/_symbols_.animationitem.md) |
| instance | [BaseDirective](_core_directives_base_directive_.basedirective.md) |

**Returns:** `void`

___

