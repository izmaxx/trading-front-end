import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';



const ELEMENT_DATA: Company[] = [
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
  {name: 'Apple', ticker: 'AAPL', marketCap: 100, industry: 'Technology'},
];

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})

export class TrackerComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  displayedColumns: string[] = ['name', 'ticker', 'marketCap', 'industry'];
  dataSource = ELEMENT_DATA;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();

    
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
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
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
