import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  ticker: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('id') || '';
  }
}
