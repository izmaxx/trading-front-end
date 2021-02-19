import { SortDirection } from '@angular/material/sort';

export interface CompanyFilterCriteria {
  ticker: string;
  active: boolean;
  sortField: string;
  sortAscending: SortDirection;
}
