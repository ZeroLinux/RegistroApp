import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Company } from '../models/company.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:5001/api/Companies/';

  public getCompany(id: string)
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
    };
    
    const res = this.http.get<Company>(this.apiUrl + id, httpOptions);

    return res;

  }

  public setCompany(company: Company)
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
    };
    
    const res = this.http.put<Company>(this.apiUrl, company, httpOptions);

    return res;
  }

}
