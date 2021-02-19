import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Company } from '../models/company';
import { CompanyFilterCriteria } from '../models/company-filter-criteria';
import { TutorialService } from './tutorial.service';

export class CompanyDataSource implements DataSource<Company> {
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private tutorialService: TutorialService) {}

  connect(collectionViewer: CollectionViewer): Observable<Company[]> {
    return this.companiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.companiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCompanies(filterCriteria: CompanyFilterCriteria) {
    this.loadingSubject.next(true);

    this.tutorialService
      .findCompanies(filterCriteria)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((comapanies) => this.companiesSubject.next(comapanies));
  }
}
