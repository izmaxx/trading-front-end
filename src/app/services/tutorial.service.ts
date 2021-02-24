import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyFilterCriteria } from '../models/company-filter-criteria';
import { Tutorial } from '../models/tutorial.model';
import { filter, map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  retrievePrices(): Observable<any> {
    return this.http.post<any>(`${baseUrl}companies/quotes`, null);
  }

  getStocks(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}companies/`);
  }

  getCompanyData(): Observable<any> {
    return this.http.post<any>(`${baseUrl}companies/data`, null);
  }

  synchCompanyCik(): Observable<any> {
    return this.http.post<any>(`${baseUrl}companies/cik`, null);
  }

  updateCompany(company: Company): Observable<any> {
    return this.http.put<any>(
      `${baseUrl}companies/${company.ticker}/`,
      company
    );
  }

  getAll(): Observable<any> {
    return this.http.post<any>(`${baseUrl}tickers/all`, null);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }

  findCompanies(filterCriteria: CompanyFilterCriteria): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}companies/search`, {
      params: new HttpParams()
        .set('ticker', filterCriteria.ticker)
        .set('active', String(filterCriteria.active))
        .set('sortAscending', filterCriteria.sortAscending)
        .set('sortField', filterCriteria.sortField),
    });
  }
}
