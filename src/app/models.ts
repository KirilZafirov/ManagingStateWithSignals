

export const enum SortOrderType {
  ASC = 'Ascending',
  DESC = 'Descending',
}

export interface SortBy {
  key: string;
  activeIndex: number;
  sortOrder: SortOrderType;
  type?: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} 

export const DEFAULT_PAGE_SIZE = 3;

export interface PageState {
  data: PeriodicElement[];
  availableData: PeriodicElement[];
  displayedColumns: string[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number; 
  sortOrder: SortBy;
  searchFields: string[];
  uniqueProperty: keyof PeriodicElement;
}