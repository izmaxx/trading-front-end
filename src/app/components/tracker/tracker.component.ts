import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyFilterCriteria } from 'src/app/models/company-filter-criteria';
import { Tutorial } from 'src/app/models/tutorial.model';
import { CompanyDataSource } from 'src/app/services/company.datasource';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { SortDirection } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  dataSource!: CompanyDataSource;
  filterCriteria: CompanyFilterCriteria = {
    ticker: '',
    active: true,
    sortField: 'ticker',
    sortAscending: 'asc',
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  displayedColumns: string[] = [
    'ticker',
    'marketCap',
    'industry',
    'price',
    'low',
    'high',
    'insiderThreeMonth',
    'activate',
    'toggle',
  ];

  constructor(
    private tutorialService: TutorialService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource = new CompanyDataSource(this.tutorialService);
    this.dataSource.loadCompanies(this.filterCriteria);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sortChange) => {
      this.filterCriteria.sortAscending = sortChange.direction;
      this.refreshList();
    });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.filterCriteria.ticker = this.input.nativeElement.value;
          this.refreshList();
        })
      )
      .subscribe();
  }

  refreshList() {
    this.dataSource.loadCompanies(this.filterCriteria);
  }
  getStock() {
    this.tutorialService.getAll().subscribe();
    console.log('retrieve stocks');
  }

  getCompanyData() {
    this.tutorialService.getCompanyData().subscribe();
    console.log('get company data');
  }

  updateActiveStatus(element: Company) {
    element.active = !element.active;
    this.tutorialService
      .updateCompany(element)
      .subscribe(() =>
        this.toastr.success(
          'Updated ' + element.ticker + 'to ' + element.active
        )
      );
  }
}
