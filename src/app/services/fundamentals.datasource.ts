import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Fundamentals } from '../models/fundamentals';
import { TutorialService } from './tutorial.service';

export class FundamentalsDataSource implements DataSource<Fundamentals> {
  private fundamentalsSubject = new BehaviorSubject<Fundamentals[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private tutorialService: TutorialService) {}

  connect(collectionViewer: CollectionViewer): Observable<Fundamentals[]> {
    return this.fundamentalsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.fundamentalsSubject.complete();
    this.loadingSubject.complete();
  }

  loadFundamentals(ticker: string) {
    this.loadingSubject.next(true);

    this.tutorialService
      .getFundamentalData(ticker)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((fundamentals) => this.fundamentalsSubject.next(fundamentals));
  }
}
