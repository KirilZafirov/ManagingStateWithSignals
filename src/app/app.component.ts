import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTabsModule, MatButtonModule],
  template: ` 
  <button  mat-raised-button class="primary" (click)="doAction()">
    Do Action
  </button>

<h1> {{myCustomLocalStorage}}</h1>

<h1> {{windowRef.customVariable}}</h1>
    <!-- <nav mat-tab-nav-bar [tabPanel]='tabPanel'>
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
    </mat-tab-nav-panel> -->

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements DoCheck, AfterViewInit {
  title = 'angular-signals';
  myCustomLocalStorage = localStorage.getItem('myCustomLocalStorage');

  windowRef = window as any;
  constructor() {
    localStorage.setItem('myCustomLocalStorage', 'Test Value from localStorage set in constructor');
  }

  ngOnInit() { 
    this.windowRef.customVariable = 'This is a custom variable in window storage';

    console.log('window customVariable', this.windowRef.customVariable)
    console.log('myCustomLocalStorage', this.myCustomLocalStorage)

    console.log(appState({ b: 6 }));
  }

  ngAfterViewInit() {
    localStorage.setItem('myCustomLocalStorage', 'Test Value from localStorage set in ngAfterViewInit');
  }

  doAction() {
    console.log('Do Action')
    this.windowRef.customVariable = 'The window storage variable that I changed';
    localStorage.setItem('myCustomLocalStorage', 'Test Value from localStorage changed');
  }

  ngDoCheck() {
    console.log('perform change detection');
    console.log('window customVariable changed:', this.windowRef.customVariable)
    console.log('myCustomLocalStorage changed:', this.myCustomLocalStorage)
  }
}


export const appState = (props?: any) => {
  return {
    a: 1,
    b: 2,
    c: 3,
    ...props
  }
}