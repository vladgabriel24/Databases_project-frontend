import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Server-ul din backend
export const environment = {
  production: false,
  serverUrl: 'http://localhost:8080'
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {}
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  get_tblGED() {
    return this.request('GET', `${environment.serverUrl}/tblGED`);
  }

  createEvent(event:any) {
    // return this.request('POST', `${environment.serverUrl}/event`, event);
  }

  updateEvent(event:any) {
    // return this.request('PUT', `${environment.serverUrl}/event/${event.id}`, event);
  }

  deleteEvent(event:any) {
    // return this.request('DELETE', `${environment.serverUrl}/event/${event.id}`);
  }

}
