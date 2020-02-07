import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://obscure-beyond-81246.herokuapp.com/api';

  constructor(public http: HttpClient) { }

  login(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  signup(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  getSpecificBooking(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint);
  }

  updateBooking(endpoint: string, data: JSON) {
    return this.http.patch<any>(this.baseUrl + endpoint, data);
  }

  postHours(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  get(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint);
  }

  patch(endpoint: string, data: JSON) {
    return this.http.patch<any>(this.baseUrl + endpoint, data);
  }

}
