#### 6.4.3 (2020-09-24)

#### 6.4.2 (2020-09-24)

#### 6.4.1 (2020-09-24)

##### Build System / Dependencies

* **deps:**  bump http-proxy from 1.18.0 to 1.18.1 ([#73](https://github.com/ngx-lottie/ngx-lottie/pull/73)) ([147b0896](https://github.com/ngx-lottie/ngx-lottie/commit/147b08969d325a8423297e5292eac5847f61b9bc))

##### Bug Fixes

*  call `isPlatformServer` only once ([#72](https://github.com/ngx-lottie/ngx-lottie/pull/72)) ([4cae4f53](https://github.com/ngx-lottie/ngx-lottie/commit/4cae4f53c10e35c6c44074d92229d595085a077d))

##### Performance Improvements

*  add compatibility with es5 ([1735cf1d](https://github.com/ngx-lottie/ngx-lottie/commit/1735cf1d1fc77bdf42998b381fb1ca8c74bf8e5d))
*  remove `LottieEventsFacade` and reduce bundle size ([#70](https://github.com/ngx-lottie/ngx-lottie/pull/70)) ([53b71757](https://github.com/ngx-lottie/ngx-lottie/commit/53b7175747f189db8e051208a197b5bafe618378))

### 6.4.0 (2020-08-23)

##### Build System / Dependencies

* **deps:**  bump elliptic from 6.5.2 to 6.5.3 ([#68](https://github.com/ngx-lottie/ngx-lottie/pull/68)) ([f1c8c87a](https://github.com/ngx-lottie/ngx-lottie/commit/f1c8c87a8b47f5eae3e32b77d493876289724b53))

##### Bug Fixes

*  remove `beforeAnimationIsCreated` ([#69](https://github.com/ngx-lottie/ngx-lottie/pull/69)) ([eb3e0937](https://github.com/ngx-lottie/ngx-lottie/commit/eb3e0937a0f644abeb2b8c53d7e7314c32a79378))

### 6.3.0 (2020-07-26)

##### Build System / Dependencies

* **deps:**  bump npm-registry-fetch from 4.0.2 to 4.0.5 ([#63](https://github.com/ngx-lottie/ngx-lottie/pull/63)) ([f5798fba](https://github.com/ngx-lottie/ngx-lottie/commit/f5798fbad575f8c1d68167285613f011b9a75384))

##### Documentation Changes

*  update README.md ([eefdf8be](https://github.com/ngx-lottie/ngx-lottie/commit/eefdf8bed33bd0e5ff94e37c0b7890acbe4f0e9e))

##### New Features

*  add `beforeAnimationCreated` options method for doing anything before animation is created ([#66](https://github.com/ngx-lottie/ngx-lottie/pull/66)) ([82e18262](https://github.com/ngx-lottie/ngx-lottie/commit/82e182625195cfa34ea503853e302d38213e4cc4))

#### 6.2.1 (2020-07-04)

##### Documentation Changes

*  document how to reduce `lottie-web` bundle size ([#62](https://github.com/ngx-lottie/ngx-lottie/pull/62)) ([f18d8cc6](https://github.com/ngx-lottie/ngx-lottie/commit/f18d8cc6dc6382d474801927570d7bfbc25f937c))

### 6.2.0 (2020-07-04)

##### New Features

*  upgrade to Angular 10 ([#61](https://github.com/ngx-lottie/ngx-lottie/pull/61)) ([f69ba256](https://github.com/ngx-lottie/ngx-lottie/commit/f69ba256379ccbfab4f4bc98be35a099472a8531))

#### 6.1.2 (2020-07-04)

##### Documentation Changes

*  document how to properly listen to native events ([#60](https://github.com/ngx-lottie/ngx-lottie/pull/60)) ([6004d77d](https://github.com/ngx-lottie/ngx-lottie/commit/6004d77d1d7a708e53f8fe6dd08e18affec02bce))

#### 6.1.1 (2020-06-20)

##### Bug Fixes

*  replace `shareReplay(1)` with `publishReplay(1), refCount()` to exclude memory leak ([#59](https://github.com/ngx-lottie/ngx-lottie/pull/59)) ([406b1e5b](https://github.com/ngx-lottie/ngx-lottie/commit/406b1e5bfc6275f67200789fd408cc5c09862f8f))

### 6.1.0 (2020-06-14)

##### Build System / Dependencies

* **deps:**  bump websocket-extensions from 0.1.3 to 0.1.4 ([#55](https://github.com/ngx-lottie/ngx-lottie/pull/55)) ([4d053c01](https://github.com/ngx-lottie/ngx-lottie/commit/4d053c01cafce78d09cae5cedddb43683462af80))

##### Chores

*  update CHANGELOG.md ([a55d9adb](https://github.com/ngx-lottie/ngx-lottie/commit/a55d9adbfc5dff8783288e34289ed17b487ce6e7))

##### New Features

*  update animation when options change ([#57](https://github.com/ngx-lottie/ngx-lottie/pull/57)) ([185fc470](https://github.com/ngx-lottie/ngx-lottie/commit/185fc470315fdd8d521574ac14bfec6a098824b2))

## 6.0.0 (2020-05-01)

#### Bug Fixes

* fix: do not set location href on Safari ([#51](https://github.com/ngx-lottie/ngx-lottie/pull/51)) ([a2e642de](https://github.com/ngx-lottie/ngx-lottie/commit/3c4c56b25ca8bcd703fe9dd6eaf88f5b8cc07f0a))

### 5.4.0 (2020-03-08)

##### Build System / Dependencies

*  upgrade to Angular 9 ([#45](https://github.com/ngx-lottie/ngx-lottie/pull/45)) ([33f840f7](https://github.com/ngx-lottie/ngx-lottie/commit/33f840f73ac200b7652a10ba05720c0c30203f21))

##### Chores

*  update README.md ([#42](https://github.com/ngx-lottie/ngx-lottie/pull/42)) ([bfcb85d8](https://github.com/ngx-lottie/ngx-lottie/commit/bfcb85d8387dc26a79176173e0660425bbd8da01))

##### New Features

*  add possibility to provide multiple classes ([#46](https://github.com/ngx-lottie/ngx-lottie/pull/46)) ([cec160d8](https://github.com/ngx-lottie/ngx-lottie/commit/cec160d8dd45bb5ce7d78718952cd71730bf2add))

#### 5.3.2 (2019-12-19)

##### Bug Fixes

*  unsubscribe and release resources from async loader ([#41](https://github.com/ngx-lottie/ngx-lottie/pull/41)) ([a2e642de](https://github.com/ngx-lottie/ngx-lottie/commit/a2e642de0a8ac078721de5062a9ac59b3314812d))

#### 5.3.1 (2019-12-16)

##### Bug Fixes

*  check that `animationItem` is not null before destroying ([#39](https://github.com/ngx-lottie/ngx-lottie/pull/39)) ([4a2796a6](https://github.com/ngx-lottie/ngx-lottie/commit/4a2796a61227d794892c518aebf793fa38d919d0))

### 5.3.0 (2019-11-07)

##### New Features

*  listen only to those events whose emitters are observed ([#35](https://github.com/ngx-lottie/ngx-lottie/pull/35)) ([9c0640f7](https://github.com/ngx-lottie/ngx-lottie/commit/9c0640f704cd3af240e9ac1b642220ba077237cc))

### 5.2.0 (2019-10-05)

##### New Features

- support any CSS unit on the width/height ([#33](https://github.com/ngx-lottie/ngx-lottie/pull/33)) ([56696ab2](https://github.com/ngx-lottie/ngx-lottie/commit/56696ab2c95caebe20fa8d7b5a5e721fad792201))

#### 5.1.1 (2019-10-05)

##### Build System / Dependencies

- remove travis and enhance circle config ([#32](https://github.com/ngx-lottie/ngx-lottie/pull/32)) ([8065d379](https://github.com/ngx-lottie/ngx-lottie/commit/8065d3790ca3c3678e898e902fe1986984a2c73e))
- transfer pipelines to the CirleCI ([#31](https://github.com/ngx-lottie/ngx-lottie/pull/31)) ([d2903890](https://github.com/ngx-lottie/ngx-lottie/commit/d2903890250bcfff57f192e29cb87122164c9d17))

### 5.1.0 (2019-10-05)

##### New Features

- implement animation cache ([#30](https://github.com/ngx-lottie/ngx-lottie/pull/30)) ([1cf5b37a](https://github.com/ngx-lottie/ngx-lottie/commit/1cf5b37a98dcc5889e603e08977136b50e0a5dd4))

## 5.0.0 (2019-10-04)

##### Other Changes

- rename `LottieOptions` -> `AnimationOptions` ([#29](https://github.com/ngx-lottie/ngx-lottie/pull/29)) ([c6876fe2](https://github.com/ngx-lottie/ngx-lottie/commit/c6876fe28f736fa419dc5376fa095d3cc7d56a2f))

#### 4.1.3 (2019-10-04)

##### Chores

- replace service with facade ([#27](https://github.com/ngx-lottie/ngx-lottie/pull/27)) ([6714174c](https://github.com/ngx-lottie/ngx-lottie/commit/6714174cf8695428abcb52811a94e74bfeac5e50))

##### Bug Fixes

- set location href only on the Safari ([#28](https://github.com/ngx-lottie/ngx-lottie/pull/28)) ([e4f9e466](https://github.com/ngx-lottie/ngx-lottie/commit/e4f9e466b1724b902f53828c0ef1b8f3f18a09df))

#### 4.1.2 (2019-09-24)

##### Bug Fixes

- mark class as `@dynamic` to resolve ngc issue ([#26](https://github.com/ngx-lottie/ngx-lottie/pull/26)) ([58b3d175](https://github.com/ngx-lottie/ngx-lottie/commit/58b3d17554ed73ced0d66177d80891317bb6724d))

#### 4.1.1 (2019-09-24)

##### Bug Fixes

- set location href for Safari/iOS ([#25](https://github.com/ngx-lottie/ngx-lottie/pull/25)) ([2e8e1db5](https://github.com/ngx-lottie/ngx-lottie/commit/2e8e1db5f4c13085c0543c09cec479a4de515074))

### 4.1.0 (2019-09-24)

##### New Features

- update README.md ([915d356f](https://github.com/ngx-lottie/ngx-lottie/commit/915d356ffbe11167cd1dcb7abdcfb4bba721cd14))
- import "lottie-web" asynchronously only once ([#23](https://github.com/ngx-lottie/ngx-lottie/pull/23)) ([e3e25d14](https://github.com/ngx-lottie/ngx-lottie/commit/e3e25d14046332c101160a578a21865a95ccd82d))

## 4.0.0 (2019-09-23)

##### New Features

- add possibility load library syncy/asyncy ([#22](https://github.com/ngx-lottie/ngx-lottie/pull/22)) ([662a4949](https://github.com/ngx-lottie/ngx-lottie/commit/662a494909a1760ae3b255f250edf2adeb5b1c8d))

### 3.1.0 (2019-09-16)

##### Build System / Dependencies

- add cypress for E2E testing ([#20](https://github.com/ngx-lottie/ngx-lottie/pull/20)) ([1d066195](https://github.com/ngx-lottie/ngx-lottie/commit/1d06619535183d346d507f1b4ec3e8416d1e7a46))

##### Chores

- update script ([828acfea](https://github.com/ngx-lottie/ngx-lottie/commit/828acfeac056bfbe278aec3216e9f35bdb161beb))
- revert logo ([10552a4c](https://github.com/ngx-lottie/ngx-lottie/commit/10552a4cd3458ecff609f545f7afe5c1a5135f5b))
- remove typedoc generator ([653259cf](https://github.com/ngx-lottie/ngx-lottie/commit/653259cfa7e05ccc2663743377b20db7fca915c4))
- update deps ([#19](https://github.com/ngx-lottie/ngx-lottie/pull/19)) ([bd48dc18](https://github.com/ngx-lottie/ngx-lottie/commit/bd48dc18e19ff27383d6d420bff8165ffe3bd110))

##### Bug Fixes

- load `lottie-web` synchronously and remove `detach` attribute ([#21](https://github.com/ngx-lottie/ngx-lottie/pull/21)) ([91e7c329](https://github.com/ngx-lottie/ngx-lottie/commit/91e7c329b91a6db44177fcda1d96a5c1c1be816b))

## 3.0.0 (2019-07-10)

##### New Features

- support Ivy ([#16](https://github.com/ngx-lottie/ngx-lottie/pull/16)) ([874b9888](https://github.com/ngx-lottie/ngx-lottie/commit/874b9888f1ccbcfb96e5f37f0069450da292014d))

## 2.0.0 (2019-06-16)

##### New Features

- add travis badge ([#15](https://github.com/ngx-lottie/ngx-lottie/pull/15)) ([3b64d9d7](https://github.com/ngx-lottie/ngx-lottie/commit/3b64d9d7f75074bda9859fb75ec4267faef98f2e))
- add github templates for issues and PRs ([#14](https://github.com/ngx-lottie/ngx-lottie/pull/14)) ([4439d829](https://github.com/ngx-lottie/ngx-lottie/commit/4439d8297e588a3c4e3167e70526a8fc65ca4d3b))
- support Angular 8 ([#13](https://github.com/ngx-lottie/ngx-lottie/pull/13)) ([99c52fa4](https://github.com/ngx-lottie/ngx-lottie/commit/99c52fa4ed2b20be594a45aec787527c99d77b55))

### 1.3.0 (2019-05-15)

##### Bug Fixes

- change `renderSettings` to `rendererSettings` ([#12](https://github.com/ngx-lottie/ngx-lottie/pull/12)) ([bd1e850a](https://github.com/ngx-lottie/ngx-lottie/commit/bd1e850a131b1fe1afb38410a7831ddb12eb7cfc))

### 1.2.0 (2019-03-17)

##### New Features

- add new `detach` binding ([#10](https://github.com/ngx-lottie/ngx-lottie/pull/10)) ([ca62295f](https://github.com/ngx-lottie/ngx-lottie/commit/ca62295ffeb27f17438e91adf388735c1bb4e1ea))

### 1.1.0 (2019-03-15)

##### New Features

- add server side support ([#8](https://github.com/ngx-lottie/ngx-lottie/pull/8)) ([8cd74183](https://github.com/ngx-lottie/ngx-lottie/commit/8cd74183c1376398cb91923b5f3b8e4ac032820f))

##### Bug Fixes

- change `jpg` to `png` ([#9](https://github.com/ngx-lottie/ngx-lottie/pull/9)) ([80ae0414](https://github.com/ngx-lottie/ngx-lottie/commit/80ae0414ebb618f85c2dd5b9cc31a1552c9f794f))

#### 1.0.2 (2019-03-10)

##### Bug Fixes

- force users to install `lottie-web` ([#7](https://github.com/ngx-lottie/ngx-lottie/pull/7)) ([ccdfce94](https://github.com/ngx-lottie/ngx-lottie/commit/ccdfce94498fe7360bf4ab306c8f6911a74fd16b))

#### 1.0.1 (2019-03-10)

##### New Features

- update README.md ([73f6abfa](https://github.com/ngx-lottie/ngx-lottie/commit/73f6abfac850bf499fb248213ce9b07c82b4f8d1))
- first release ([365d5d85](https://github.com/ngx-lottie/ngx-lottie/commit/365d5d85e93b600a761138a3345faafb741f4913))

##### Bug Fixes

- add package info ([#6](https://github.com/ngx-lottie/ngx-lottie/pull/6)) ([f4999fa6](https://github.com/ngx-lottie/ngx-lottie/commit/f4999fa6460c3a11fa8ab1348094a267df3a7451))

## 1.0.0 (2019-03-10)

##### New Features

- add and expose `LottieDirective` ([#5](https://github.com/ngx-lottie/ngx-lottie/pull/5)) ([e5f30511](https://github.com/ngx-lottie/ngx-lottie/commit/e5f305115be88fec73cf6b254a5fec842ce3e7ed))
- move artifacts to the `src` folder ([#4](https://github.com/ngx-lottie/ngx-lottie/pull/4)) ([2a463f94](https://github.com/ngx-lottie/ngx-lottie/commit/2a463f9485c100527724b831353fc9f4779278ba))
- add readme and cohensive tests ([#2](https://github.com/ngx-lottie/ngx-lottie/pull/2)) ([980b78b2](https://github.com/ngx-lottie/ngx-lottie/commit/980b78b223649fbbbaad3ed014ab7d855318f3fc))
- setup appveyor CI ([#1](https://github.com/ngx-lottie/ngx-lottie/pull/1)) ([bbc9e519](https://github.com/ngx-lottie/ngx-lottie/commit/bbc9e519ac9ad60250492d2b36057a887b0afe5e))
- initial release ([4712f517](https://github.com/ngx-lottie/ngx-lottie/commit/4712f5177c9829ccbd6d14362582e28ebc4b5f7f))

##### Bug Fixes

- change logo ext to jpg ([#3](https://github.com/ngx-lottie/ngx-lottie/pull/3)) ([7f401351](https://github.com/ngx-lottie/ngx-lottie/commit/7f40135138cb55b4fe3c9b71d4b8a19612b99296))
