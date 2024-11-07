import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTabsModule],
  template: ` 

    <nav mat-tab-nav-bar [tabPanel]='tabPanel'>
      <a
        mat-tab-link
        routerLink='' 
      >
        <div>
          <span>Old State management examples</span> 
        </div>
      </a>

      <a
        mat-tab-link
        routerLink='new' 
      >
        <div>
          <span>New state management examples</span> 
        </div>
      </a>
    </nav>

    <mat-tab-nav-panel #tabPanel>
      <router-outlet />
    </mat-tab-nav-panel>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-signals';
}
