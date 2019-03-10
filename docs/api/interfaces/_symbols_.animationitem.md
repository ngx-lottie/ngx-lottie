[API](../README.md) > ["symbols"](../modules/_symbols_.md) > [AnimationItem](../interfaces/_symbols_.animationitem.md)

# Interface: AnimationItem

## Hierarchy

**AnimationItem**

## Index

### Properties

* [_cbs](_symbols_.animationitem.md#_cbs)
* [_completedLoop](_symbols_.animationitem.md#_completedloop)
* [_idle](_symbols_.animationitem.md#_idle)
* [animType](_symbols_.animationitem.md#animtype)
* [animationData](_symbols_.animationitem.md#animationdata)
* [animationID](_symbols_.animationitem.md#animationid)
* [assets](_symbols_.animationitem.md#assets)
* [assetsPath](_symbols_.animationitem.md#assetspath)
* [autoloadSegments](_symbols_.animationitem.md#autoloadsegments)
* [autoplay](_symbols_.animationitem.md#autoplay)
* [currentFrame](_symbols_.animationitem.md#currentframe)
* [currentRawFrame](_symbols_.animationitem.md#currentrawframe)
* [fileName](_symbols_.animationitem.md#filename)
* [firstFrame](_symbols_.animationitem.md#firstframe)
* [frameModifier](_symbols_.animationitem.md#framemodifier)
* [frameMult](_symbols_.animationitem.md#framemult)
* [frameRate](_symbols_.animationitem.md#framerate)
* [isLoaded](_symbols_.animationitem.md#isloaded)
* [isPaused](_symbols_.animationitem.md#ispaused)
* [loop](_symbols_.animationitem.md#loop)
* [name](_symbols_.animationitem.md#name)
* [path](_symbols_.animationitem.md#path)
* [playCount](_symbols_.animationitem.md#playcount)
* [playDirection](_symbols_.animationitem.md#playdirection)
* [playSpeed](_symbols_.animationitem.md#playspeed)
* [renderer](_symbols_.animationitem.md#renderer)
* [segmentPos](_symbols_.animationitem.md#segmentpos)
* [segments](_symbols_.animationitem.md#segments)
* [subframeEnabled](_symbols_.animationitem.md#subframeenabled)
* [timeCompleted](_symbols_.animationitem.md#timecompleted)
* [totalFrames](_symbols_.animationitem.md#totalframes)
* [wrapper](_symbols_.animationitem.md#wrapper)

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
* [loadNextSegment](_symbols_.animationitem.md#loadnextsegment)
* [loadSegments](_symbols_.animationitem.md#loadsegments)
* [pause](_symbols_.animationitem.md#pause)
* [play](_symbols_.animationitem.md#play)
* [playSegments](_symbols_.animationitem.md#playsegments)
* [preloadImages](_symbols_.animationitem.md#preloadimages)
* [removeEventListener](_symbols_.animationitem.md#removeeventlistener)
* [renderFrame](_symbols_.animationitem.md#renderframe)
* [resize](_symbols_.animationitem.md#resize)
* [setCurrentRawFrameValue](_symbols_.animationitem.md#setcurrentrawframevalue)
* [setDirection](_symbols_.animationitem.md#setdirection)
* [setSpeed](_symbols_.animationitem.md#setspeed)
* [setSubframe](_symbols_.animationitem.md#setsubframe)
* [show](_symbols_.animationitem.md#show)
* [stop](_symbols_.animationitem.md#stop)
* [togglePause](_symbols_.animationitem.md#togglepause)

---

## Properties

<a id="_cbs"></a>

###  _cbs

**● _cbs**: *`function`[]*

*Defined in [symbols.ts:79](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L79)*

___
<a id="_completedloop"></a>

###  _completedLoop

**● _completedLoop**: *`boolean`*

*Defined in [symbols.ts:80](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L80)*

___
<a id="_idle"></a>

###  _idle

**● _idle**: *`boolean`*

*Defined in [symbols.ts:81](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L81)*

___
<a id="animtype"></a>

###  animType

**● animType**: *`string`*

*Defined in [symbols.ts:50](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L50)*

___
<a id="animationdata"></a>

###  animationData

**● animationData**: *`any`*

*Defined in [symbols.ts:51](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L51)*

___
<a id="animationid"></a>

###  animationID

**● animationID**: *`string`*

*Defined in [symbols.ts:52](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L52)*

___
<a id="assets"></a>

###  assets

**● assets**: *`any`[]*

*Defined in [symbols.ts:53](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L53)*

___
<a id="assetspath"></a>

###  assetsPath

**● assetsPath**: *`string` \| `undefined`*

*Defined in [symbols.ts:54](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L54)*

___
<a id="autoloadsegments"></a>

###  autoloadSegments

**● autoloadSegments**: *`boolean`*

*Defined in [symbols.ts:55](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L55)*

___
<a id="autoplay"></a>

###  autoplay

**● autoplay**: *`boolean`*

*Defined in [symbols.ts:56](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L56)*

___
<a id="currentframe"></a>

###  currentFrame

**● currentFrame**: *`number`*

*Defined in [symbols.ts:57](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L57)*

___
<a id="currentrawframe"></a>

###  currentRawFrame

**● currentRawFrame**: *`number`*

*Defined in [symbols.ts:58](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L58)*

___
<a id="filename"></a>

###  fileName

**● fileName**: *`string` \| `undefined`*

*Defined in [symbols.ts:59](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L59)*

___
<a id="firstframe"></a>

###  firstFrame

**● firstFrame**: *`number`*

*Defined in [symbols.ts:60](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L60)*

___
<a id="framemodifier"></a>

###  frameModifier

**● frameModifier**: *`number`*

*Defined in [symbols.ts:61](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L61)*

___
<a id="framemult"></a>

###  frameMult

**● frameMult**: *`number`*

*Defined in [symbols.ts:62](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L62)*

___
<a id="framerate"></a>

###  frameRate

**● frameRate**: *`number`*

*Defined in [symbols.ts:63](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L63)*

___
<a id="isloaded"></a>

###  isLoaded

**● isLoaded**: *`boolean`*

*Defined in [symbols.ts:64](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L64)*

___
<a id="ispaused"></a>

###  isPaused

**● isPaused**: *`boolean`*

*Defined in [symbols.ts:65](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L65)*

___
<a id="loop"></a>

###  loop

**● loop**: *`boolean`*

*Defined in [symbols.ts:66](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L66)*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in [symbols.ts:67](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L67)*

___
<a id="path"></a>

###  path

**● path**: *`string`*

*Defined in [symbols.ts:68](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L68)*

___
<a id="playcount"></a>

###  playCount

**● playCount**: *`number`*

*Defined in [symbols.ts:69](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L69)*

___
<a id="playdirection"></a>

###  playDirection

**● playDirection**: *`number`*

*Defined in [symbols.ts:70](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L70)*

___
<a id="playspeed"></a>

###  playSpeed

**● playSpeed**: *`number`*

*Defined in [symbols.ts:71](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L71)*

___
<a id="renderer"></a>

###  renderer

**● renderer**: *`any` \| `null`*

*Defined in [symbols.ts:72](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L72)*

___
<a id="segmentpos"></a>

###  segmentPos

**● segmentPos**: *`number`*

*Defined in [symbols.ts:73](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L73)*

___
<a id="segments"></a>

###  segments

**● segments**: *`any`[]*

*Defined in [symbols.ts:74](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L74)*

___
<a id="subframeenabled"></a>

###  subframeEnabled

**● subframeEnabled**: *`boolean`*

*Defined in [symbols.ts:75](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L75)*

___
<a id="timecompleted"></a>

###  timeCompleted

**● timeCompleted**: *`number`*

*Defined in [symbols.ts:76](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L76)*

___
<a id="totalframes"></a>

###  totalFrames

**● totalFrames**: *`number`*

*Defined in [symbols.ts:77](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L77)*

___
<a id="wrapper"></a>

###  wrapper

**● wrapper**: *`HTMLElement` \| `HTMLCanvasElement`*

*Defined in [symbols.ts:78](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L78)*

___

## Methods

<a id="addeventlistener"></a>

###  addEventListener

▸ **addEventListener**(name: *[LottieEventName](../modules/_symbols_.md#lottieeventname)*, callback: *`function`*): `void`

*Defined in [symbols.ts:104](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L104)*

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

*Defined in [symbols.ts:116](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L116)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| animationData | `any` |

**Returns:** `void`

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(): `void`

*Defined in [symbols.ts:100](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L100)*

**Returns:** `void`

___
<a id="getassetdata"></a>

###  getAssetData

▸ **getAssetData**(id: *`number`*): `any` \| `undefined`

*Defined in [symbols.ts:118](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L118)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `any` \| `undefined`

___
<a id="getassetspath"></a>

###  getAssetsPath

▸ **getAssetsPath**(assetData: *`any`*): `string`

*Defined in [symbols.ts:117](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L117)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| assetData | `any` |

**Returns:** `string`

___
<a id="getduration"></a>

###  getDuration

▸ **getDuration**(inFrames: *`boolean`*): `number`

*Defined in [symbols.ts:102](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| inFrames | `boolean` |

**Returns:** `number`

___
<a id="gotoandplay"></a>

###  goToAndPlay

▸ **goToAndPlay**(value: *`number`*, isFrame: *`boolean`*): `void`

*Defined in [symbols.ts:92](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L92)*

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

*Defined in [symbols.ts:95](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L95)*

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

*Defined in [symbols.ts:108](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L108)*

**Returns:** `void`

___
<a id="loadnextsegment"></a>

###  loadNextSegment

▸ **loadNextSegment**(): `void`

*Defined in [symbols.ts:120](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L120)*

**Returns:** `void`

___
<a id="loadsegments"></a>

###  loadSegments

▸ **loadSegments**(): `void`

*Defined in [symbols.ts:119](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L119)*

**Returns:** `void`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `void`

*Defined in [symbols.ts:84](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L84)*

**Returns:** `void`

___
<a id="play"></a>

###  play

▸ **play**(): `void`

*Defined in [symbols.ts:82](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L82)*

**Returns:** `void`

___
<a id="playsegments"></a>

###  playSegments

▸ **playSegments**(segments: *`number`[] \| `number`[][]*, forceFlag: *`boolean`*): `void`

*Defined in [symbols.ts:98](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L98)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| segments | `number`[] \| `number`[][] |
| forceFlag | `boolean` |

**Returns:** `void`

___
<a id="preloadimages"></a>

###  preloadImages

▸ **preloadImages**(): `void`

*Defined in [symbols.ts:121](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L121)*

**Returns:** `void`

___
<a id="removeeventlistener"></a>

###  removeEventListener

▸ **removeEventListener**(name: *[LottieEventName](../modules/_symbols_.md#lottieeventname)*, callback: *`function`*): `void`

*Defined in [symbols.ts:106](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L106)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | [LottieEventName](../modules/_symbols_.md#lottieeventname) |
| callback | `function` |

**Returns:** `void`

___
<a id="renderframe"></a>

###  renderFrame

▸ **renderFrame**(): `void`

*Defined in [symbols.ts:123](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L123)*

**Returns:** `void`

___
<a id="resize"></a>

###  resize

▸ **resize**(): `void`

*Defined in [symbols.ts:110](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L110)*

**Returns:** `void`

___
<a id="setcurrentrawframevalue"></a>

###  setCurrentRawFrameValue

▸ **setCurrentRawFrameValue**(value: *`number`*): `void`

*Defined in [symbols.ts:124](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L124)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `void`

___
<a id="setdirection"></a>

###  setDirection

▸ **setDirection**(direction: *[Direction](../modules/_symbols_.md#direction)*): `void`

*Defined in [symbols.ts:114](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L114)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| direction | [Direction](../modules/_symbols_.md#direction) |

**Returns:** `void`

___
<a id="setspeed"></a>

###  setSpeed

▸ **setSpeed**(speed: *`number`*): `void`

*Defined in [symbols.ts:86](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L86)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| speed | `number` |

**Returns:** `void`

___
<a id="setsubframe"></a>

###  setSubframe

▸ **setSubframe**(flag: *`boolean`*): `void`

*Defined in [symbols.ts:89](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L89)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| flag | `boolean` |

**Returns:** `void`

___
<a id="show"></a>

###  show

▸ **show**(): `void`

*Defined in [symbols.ts:112](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L112)*

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in [symbols.ts:83](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L83)*

**Returns:** `void`

___
<a id="togglepause"></a>

###  togglePause

▸ **togglePause**(): `void`

*Defined in [symbols.ts:122](https://github.com/ngx-lottie/ngx-lottie/blob/2a463f9/src/lottie/src/symbols.ts#L122)*

**Returns:** `void`

___

