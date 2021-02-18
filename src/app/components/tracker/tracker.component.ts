import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

const ELEMENT_DATA: Company[] = [
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    marketCap: 100,
    industry: 'Technology',
    price: 80,
    high: 100,
    low: 50,
    insiderThreeMonth: 2,
  },
];

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';
  companies$ = new Observable<Company[]>();

  displayedColumns: string[] = [
    'name',
    'ticker',
    'marketCap',
    'industry',
    'price',
    'low',
    'high',
    'insiderThreeMonth',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.companies$ = this.tutorialService.getStocks();
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStock() {
    this.tutorialService.getAll().subscribe();
    console.log('retrieve stocks');
  }

  getCompanyData() {
    this.tutorialService.getCompanyData().subscribe();
    console.log('get company data');
  }
}
