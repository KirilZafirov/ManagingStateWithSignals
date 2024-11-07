import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { SortOrderIconPipe } from './sort-order.pipe';
import { UiStateService } from './uiState.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    SortOrderIconPipe,
    ReactiveFormsModule,
    FormsModule,
    MatPaginator,
    MatIcon,
    MatButtonModule,
    MatInput, MatFormField, MatLabel],
  templateUrl: './new-state-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./new-state-example.component.scss']
})
export class NewStateComponent implements OnInit, OnDestroy {
  readonly #uiStateService = inject(UiStateService);

  pageState = this.#uiStateService.pageState;
  public readonly control = new UntypedFormControl();
  private readonly destroy$$ = new Subject<void>();
  ngOnInit() {
    this.#uiStateService.getData();

    //TODO: Bonus points for the one who can suggest a better solution for this ?
    this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((v: string) => {
          if (v && v.length >= 3) {
            return true;
          } else {
            this.#uiStateService.searchItem(null)
            return false;
          }
        })
      )
      .subscribe(val => {
        this.#uiStateService.searchItem(val)
      });


  }

  sortBy(key: string, activeIndex: number, type?: string) {
    this.#uiStateService.sort(key, activeIndex, type);
  }

  changePage(event: PageEvent) {
    this.#uiStateService.queryPage(event)
  };


  //TODO: Bonus points for the one who can suggest a better solution for this ?
  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }


}


// search = model<string>('');
// [(ngModel)]="search"
// effect(() => {
//   this.#uiStateService.searchItem(this.search())
// });