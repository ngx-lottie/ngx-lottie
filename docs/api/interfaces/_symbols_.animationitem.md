[API](../README.md) > ["symbols"](../modules/_symbols_.md) > [AnimationItem](../interfaces/_symbols_.animationitem.md)

# Interface: AnimationItem

## Hierarchy

**AnimationItem**

## Index

### Methods

* [addEventListener](_symbols_.animationitem.md#addeventlistener)
* [configAnimation](_symbols_.animationitem.md#configanimation)
* [destroy](_symbols_.animationitem.md#destroy)
* [getAssetData](_symbols_.animationitem.md#getassetdata)
* [getAssetsPath](_symbols_.animationitem.md#getassetspath)
* [getDuration](_symbols_.animationitem.md#getduration)
* [goToAndPlay](_symbols_.animationitem.md#gotoandplay)
* [goToAndStop](_symbols_.animationitem.md#gotoandstop)
* [hide](_symbols_.animationitem.md#hide)
* [pause](_symbols_.animationitem.md#pause)
* [play](_symbols_.animationitem.md#play)
* [playSegments](_symbols_.animationitem.md#playsegments)
* [removeEventListener](_symbols_.animationitem.md#removeeventlistener)
* [resize](_symbols_.animationitem.md#resize)
* [setDirection](_symbols_.animationitem.md#setdirection)
* [setSpeed](_symbols_.animationitem.md#setspeed)
* [setSubframe](_symbols_.animationitem.md#setsubframe)
* [show](_symbols_.animationitem.md#show)
* [stop](_symbols_.animationitem.md#stop)

---

## Methods

<a id="addeventlistener"></a>

###  addEventListener

▸ **addEventListener**(name: *[LottieEventName](../modules/_symbols_.md#lottieeventname)*, callback: *`function`*): `void`

*Defined in symbols.ts:73*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | [LottieEventName](../modules/_symbols_.md#lottieeventname) |
| callback | `function` |

**Returns:** `void`

___
<a id="configanimation"></a>

###  configAnimation

▸ **configAnimation**(animationData: *`any`*): `void`

*Defined in symbols.ts:85*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationData | `any` |

**Returns:** `void`

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(): `void`

*Defined in symbols.ts:69*

**Returns:** `void`

___
<a id="getassetdata"></a>

###  getAssetData

▸ **getAssetData**(id: *`number`*): `any` \| `undefined`

*Defined in symbols.ts:87*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `any` \| `undefined`

___
<a id="getassetspath"></a>

###  getAssetsPath

▸ **getAssetsPath**(assetData: *`any`*): `string`

*Defined in symbols.ts:86*

**Parameters:**

| Name | Type |
| ------ | ------ |
| assetData | `any` |

**Returns:** `string`

___
<a id="getduration"></a>

###  getDuration

▸ **getDuration**(inFrames: *`boolean`*): `number`

*Defined in symbols.ts:71*

**Parameters:**

| Name | Type |
| ------ | ------ |
| inFrames | `boolean` |

**Returns:** `number`

___
<a id="gotoandplay"></a>

###  goToAndPlay

▸ **goToAndPlay**(value: *`number`*, isFrame: *`boolean`*): `void`

*Defined in symbols.ts:61*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |
| isFrame | `boolean` |

**Returns:** `void`

___
<a id="gotoandstop"></a>

###  goToAndStop

▸ **goToAndStop**(value: *`number`*, isFrame: *`boolean`*): `void`

*Defined in symbols.ts:64*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |
| isFrame | `boolean` |

**Returns:** `void`

___
<a id="hide"></a>

###  hide

▸ **hide**(): `void`

*Defined in symbols.ts:77*

**Returns:** `void`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `void`

*Defined in symbols.ts:53*

**Returns:** `void`

___
<a id="play"></a>

###  play

▸ **play**(): `void`

*Defined in symbols.ts:51*

**Returns:** `void`

___
<a id="playsegments"></a>

###  playSegments

▸ **playSegments**(segments: *`number`[] \| `number`[][]*, forceFlag: *`boolean`*): `void`

*Defined in symbols.ts:67*

**Parameters:**

| Name | Type |
| ------ | ------ |
| segments | `number`[] \| `number`[][] |
| forceFlag | `boolean` |

**Returns:** `void`

___
<a id="removeeventlistener"></a>

###  removeEventListener

▸ **removeEventListener**(name: *[LottieEventName](../modules/_symbols_.md#lottieeventname)*, callback: *`function`*): `void`

*Defined in symbols.ts:75*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | [LottieEventName](../modules/_symbols_.md#lottieeventname) |
| callback | `function` |

**Returns:** `void`

___
<a id="resize"></a>

###  resize

▸ **resize**(): `void`

*Defined in symbols.ts:79*

**Returns:** `void`

___
<a id="setdirection"></a>

###  setDirection

▸ **setDirection**(direction: *[Direction](../modules/_symbols_.md#direction)*): `void`

*Defined in symbols.ts:83*

**Parameters:**

| Name | Type |
| ------ | ------ |
| direction | [Direction](../modules/_symbols_.md#direction) |

**Returns:** `void`

___
<a id="setspeed"></a>

###  setSpeed

▸ **setSpeed**(speed: *`number`*): `void`

*Defined in symbols.ts:55*

**Parameters:**

| Name | Type |
| ------ | ------ |
| speed | `number` |

**Returns:** `void`

___
<a id="setsubframe"></a>

###  setSubframe

▸ **setSubframe**(flag: *`boolean`*): `void`

*Defined in symbols.ts:58*

**Parameters:**

| Name | Type |
| ------ | ------ |
| flag | `boolean` |

**Returns:** `void`

___
<a id="show"></a>

###  show

▸ **show**(): `void`

*Defined in symbols.ts:81*

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in symbols.ts:52*

**Returns:** `void`

___

