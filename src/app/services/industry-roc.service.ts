import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndustryRoc } from '../models/industry-roc';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root',
})
export class IndustryRocService {
  constructor(private http: HttpClient) {}

  getIndustryRoc(): Observable<IndustryRoc[]> {
    return this.http.get<IndustryRoc[]>(`${baseUrl}industry/`);
  }
}
