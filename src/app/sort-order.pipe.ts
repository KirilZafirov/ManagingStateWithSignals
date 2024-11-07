import { Pipe, PipeTransform } from '@angular/core';  
import { SortBy, SortOrderType } from './models';
@Pipe({
  name: 'sortOrderIcon',
  standalone: true
})

export class SortOrderIconPipe implements PipeTransform {
  transform(sortOrder: SortBy, key: string, activeIndex: number): string { 
    return sortOrder.activeIndex === activeIndex && key === sortOrder.key && sortOrder.sortOrder === SortOrderType.ASC ? 'arrow_drop_down' : 'arrow_drop_up';
  }
}  