import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

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
