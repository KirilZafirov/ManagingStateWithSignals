import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, filter, of, tap } from 'rxjs';
import { SortOrderIconPipe } from './sort-order.pipe';
import { UiStateService } from './uiState.service';
import { ELEMENT_DATA } from './data';
import { AsyncPipe } from '@angular/common';
import { DEFAULT_PAGE_SIZE, PeriodicElement, SortOrderType } from './models';
import { defaultSearchFunction, genericSortItems, getPagedData } from './utils';

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
    AsyncPipe,
    MatButtonModule,
    MatInput, MatFormField, MatLabel],
  templateUrl: './old-state-example.component.html',
  styles: [`
    :host {
        table {
          width: 100%;
        }
        mat-icon {
          line-height: 1.5em;
        }
      }
    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OldStateComponent {
  search = '';

  total = 0;
  totalPages = 0;
  page = 0;
  pageSize = DEFAULT_PAGE_SIZE;
  sortOrder = {
    key: 'position',
    activeIndex: 0,
    sortOrder: SortOrderType.ASC
  };
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  searchFields = ['name', 'weight', 'symbol'];
  copyOfAllData: PeriodicElement[] = [];
  availableData: PeriodicElement[] = [];


  ngOnInit() {
    of(ELEMENT_DATA).pipe(
      tap(response => {
        this.total = response.length;
        this.copyOfAllData = structuredClone(response);
        this.availableData = [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, response) ?? [])]
        this.page = 0;
        this.pageSize = DEFAULT_PAGE_SIZE;
        this.total = response.length;
        this.totalPages = response.length / DEFAULT_PAGE_SIZE;
      })
    ).subscribe();
  }

  searchItem() {
    this.availableData = [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, defaultSearchFunction(this.search, this.copyOfAllData, this.searchFields)))],
      this.page = 0,
      this.pageSize = DEFAULT_PAGE_SIZE,
      this.total = this.availableData.length,
      this.totalPages = this.availableData.length / DEFAULT_PAGE_SIZE,
      this.sortOrder = {
        key: 'position',
        activeIndex: 0,
        sortOrder: SortOrderType.ASC
      }
  }
  sortBy(key: string, activeIndex: number, type?: string) {

    const allData = structuredClone(ELEMENT_DATA);
    const sortBy = {
      key,
      activeIndex,
      type,
      sortOrder: this.sortOrder.key === key && this.sortOrder.sortOrder === SortOrderType.ASC ? SortOrderType.DESC : SortOrderType.ASC
    }

    genericSortItems({
      key: key,
      activeIndex: activeIndex,
      type: type,
      sortOrder: sortBy.sortOrder
    }, allData);

    this.availableData = [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, allData))]
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize,
      this.availableData = [...getPagedData<PeriodicElement>(event.pageIndex, event.pageSize, this.copyOfAllData)]
  };


}
