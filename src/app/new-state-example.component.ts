import { ChangeDetectionStrategy, Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { SortOrderIconPipe } from './sort-order.pipe';
import { UiStateService } from './uiState.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { toObservable } from '@angular/core/rxjs-interop';

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
export class NewStateComponent implements OnInit {
  readonly #uiStateService = inject(UiStateService);

  pageState = this.#uiStateService.pageState;

  search = model<string>('');

constructor() {
  toObservable(this.search).pipe(
    filter(val => val.length > 2),
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(val => {
    this.#uiStateService.searchItem(val)
  })
}
  ngOnInit() {
    this.#uiStateService.getData();

  }

  sortBy(key: string, activeIndex: number, type?: string) {
    this.#uiStateService.sort(key, activeIndex, type);
  }

  changePage(event: PageEvent) {
    this.#uiStateService.queryPage(event)
  };

}







//
//
