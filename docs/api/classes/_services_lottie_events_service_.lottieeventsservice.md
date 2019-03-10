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

*Defined in [services/lottie-events.service.ts:15](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/services/lottie-events.service.ts#L15)*

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

*Defined in [services/lottie-events.service.ts:27](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/services/lottie-events.service.ts#L27)*

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

*Defined in [services/lottie-events.service.ts:19](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/services/lottie-events.service.ts#L19)*

**Returns:** `void`

___
<a id="setanimationitemandlottieeventlisteners"></a>

###  setAnimationItemAndLottieEventListeners

▸ **setAnimationItemAndLottieEventListeners**(animationItem: *[AnimationItem](../interfaces/_symbols_.animationitem.md)*, instance: *[BaseDirective](_directives_base_directive_.basedirective.md)*): `void`

*Defined in [services/lottie-events.service.ts:34](https://github.com/ngx-lottie/ngx-lottie/blob/c0534fc/src/lottie/src/services/lottie-events.service.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationItem | [AnimationItem](../interfaces/_symbols_.animationitem.md) |
| instance | [BaseDirective](_directives_base_directive_.basedirective.md) |

**Returns:** `void`

___

