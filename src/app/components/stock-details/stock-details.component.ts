import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA: any[] = [
  { metric: 'Revenue', minus_five: 100, minus_four: 200, symbol: 'H' },
  {
    metric: 'Return on Assets',
    minus_five: 110,
    minus_four: 210,
    symbol: 'He',
  },
  {
    metric: 'Free Cash Flow',
    minus_five: 120,
    minus_four: 220,
    symbol: 'Li',
  },
  {
    metric: 'Operating Cash Flow',
    minus_five: 130,
    minus_four: 230,
    symbol: 'Be',
  },
];

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements OnInit {
  ticker: string = '';
  displayedColumns: string[] = ['metric', 'minus_five', 'minus_four', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('id') || '';
  }
}
