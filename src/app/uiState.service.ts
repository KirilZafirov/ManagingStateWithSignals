import { Injectable, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { getPagedData, defaultSearchFunction, genericSortItems } from './utils';
import { PageState, DEFAULT_PAGE_SIZE, SortOrderType, PeriodicElement } from './models';
import { of } from 'rxjs';
import { ELEMENT_DATA } from './data';



@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  pageState = signal<PageState>({
    data: [],
    availableData: [],
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    displayedColumns: ['position', 'name', 'weight', 'symbol'],
    total: 0,
    totalPages: 0, 
    sortOrder: {
      key: 'position',
      activeIndex: 0,
      sortOrder: SortOrderType.ASC
    }, 
    searchFields: [],
    uniqueProperty: 'id' as keyof PeriodicElement
  });


  getData() {
    return of(ELEMENT_DATA).subscribe(
      (response) => {
        this.setTableData(response, {
          availableData: [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, response) ?? [])],
          page: 0,
          pageSize: DEFAULT_PAGE_SIZE,
          total: response.length,
          totalPages: response.length / DEFAULT_PAGE_SIZE,
          searchFields: ['name', 'weight', 'symbol']
        })
      });
  }

  setTableData(tableData: PeriodicElement[], pageState: Partial<PageState>): void {
    this.pageState.update(oldData => ({
      ...oldData,
      ...pageState,
      data: tableData,
      availableData: [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, tableData) ?? [])],
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      total: tableData.length,
      totalPages: tableData.length / DEFAULT_PAGE_SIZE, 
      sortOrder: {
        key: 'position',
        activeIndex: 0,
        sortOrder: SortOrderType.ASC
      },
    }));
  }

  removeItem(id: number) {
    this.pageState.update(oldState => {
      const newDataList = oldState.data.filter((item) => item[oldState.uniqueProperty] !== id);

      return {
        ...oldState,
        data: newDataList,
      }
    })
  }

  searchItem(searchTerm: string | null) {
    const state = this.pageState();
    const availableData = defaultSearchFunction(searchTerm, state.data, state.searchFields);

    this.pageState.update(oldValue => ({
      ...oldValue,
      data: state.data,
      availableData: [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, availableData))],
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      total: availableData.length,
      totalPages: availableData.length / DEFAULT_PAGE_SIZE, 
      sortOrder: {
        key: 'position',
        activeIndex: 0,
        sortOrder: SortOrderType.ASC
      }
    }))
  }

  queryPage(event: PageEvent) {
    this.pageState.update(oldValues => ({
      ...oldValues,
      page: event.pageIndex,
      pageSize: event.pageSize,
      availableData: [...getPagedData<PeriodicElement>(event.pageIndex, event.pageSize, oldValues.data)]
    }))
  }

  sort(key: string, activeIndex = 0, type = '') {
    const pageState = this.pageState()
    const allData = structuredClone(pageState.data);
    const sortBy = {
      key,
      activeIndex,
      type,
      sortOrder: pageState.sortOrder.key === key && pageState.sortOrder.sortOrder === SortOrderType.ASC ? SortOrderType.DESC : SortOrderType.ASC
    } 

    genericSortItems({
      key: key,
      activeIndex: activeIndex,
      type: type,
      sortOrder: sortBy.sortOrder
    }, allData);

    this.pageState.update(oldValues => ({
      ...oldValues,
      sortOrder: sortBy, 
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      availableData: [...(getPagedData<PeriodicElement>(0, DEFAULT_PAGE_SIZE, allData))]
    }))
  }

}

