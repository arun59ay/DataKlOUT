import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  get(url) {
    return this.http.get(url);
  }
  post(url, payload) {
    return this.http.post(url, payload);
  }
  put(url, payload) {
    return this.http.put(url, payload);
  }
  delete(url, payload) {
    return this.http.delete(url, payload);
  }
}
