import { ChangeDetectionStrategy, Component } from '@angular/core';
 
@Component({ 
  standalone: true,
  imports: [],
  templateUrl: './old-state-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OldStateComponent {
 
}
