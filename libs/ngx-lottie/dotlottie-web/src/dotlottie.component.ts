import { ChangeDetectionStrategy, Component, output, ViewEncapsulation } from '@angular/core';

import { ɵɵBaseDotLottieDirective } from './base.directive';

/**
 * Separate DotLottie and DotLottieWorker components architecture
 *
 * WHY TWO COMPONENTS INSTEAD OF ONE WITH CONFIGURATION:
 *
 * 1. **Type Safety**: Each component has a precise output type (DotLottie vs DotLottieWorker).
 *    Users get compile-time guarantees about which instance type they're working with.
 *    A single configurable component would require runtime type checking and type assertions.
 *
 * 2. **Clear Intent**: The component selector itself (`ng-dotlottie` vs `ng-dotlottie-worker`)
 *    explicitly communicates which rendering strategy is being used. No need to inspect
 *    configuration to understand the behavior.
 *
 * 3. **Bundle Optimization**: Tree-shaking works better with separate components. If an app
 *    only uses `ng-dotlottie`, the DotLottieWorker code can be completely eliminated from
 *    the bundle. A single component would bundle both implementations.
 *
 * 4. **Simpler API**: No configuration prop needed (e.g., `useWorker` boolean). Less surface
 *    area for bugs - users can't accidentally misconfigure or change modes at runtime.
 *
 * 5. **Performance Predictability**: DotLottie and DotLottieWorker have different performance
 *    characteristics and browser support. Separate components make this distinction explicit
 *    and prevent unintended mode switching during the component lifecycle.
 *
 * 6. **Maintainability**: If DotLottie and DotLottieWorker diverge in their APIs or
 *    initialization logic in future library versions, handling them separately is cleaner
 *    than conditional logic scattered throughout a single component.
 *
 * 7. **Testing**: Each component can be tested independently with focused test suites.
 *    No need for parameterized tests or complex setup to cover both modes.
 *
 * TRADE-OFF:
 * - Slight code duplication (two component classes), but shared implementation in
 *   ɵɵBaseDotLottieDirective minimizes this. The duplication is purely declarative
 *   (selector, output type override) which is acceptable for the benefits gained.
 */
@Component({
  selector: 'ng-dotlottie',
  template: `
    <div [class]="className()" [style]="mergedContainerStyles()">
      <canvas #canvas class="ng-dotlottie-canvas" [style]="canvasStyles"></canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DotLottieComponent extends ɵɵBaseDotLottieDirective {
  override readonly dotLottieCreated = output<import('@lottiefiles/dotlottie-web').DotLottie>();
}
