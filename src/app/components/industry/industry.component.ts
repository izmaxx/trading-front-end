import { Component, OnInit } from '@angular/core';
import { IndustryRoc } from 'src/app/models/industry-roc';
import { IndustryRocService } from 'src/app/services/industry-roc.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss'],
})
export class IndustryComponent implements OnInit {
  // industryRoc: IndustryRoc[] = [];
  displayedColumns: string[] = ['name', 'roc10', 'roc20', 'roc50'];
  dataSource: IndustryRoc[] = [];

  constructor(private industryRocService: IndustryRocService) {}

  ngOnInit(): void {
    this.industryRocService.getIndustryRoc().subscribe((result) => {
      console.log(result);
      this.dataSource = result;
    });
  }
}
