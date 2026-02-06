import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-duplicate',
  templateUrl: './duplicate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LottieComponent],
})
export default class DuplicateComponent {
  readonly options = {
    path: '/assets/animations/data.json',
  };
}
