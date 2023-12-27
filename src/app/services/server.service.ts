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

    console.log(data);
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

  get_more_info_disciplina(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/more-info/disciplina`, data);
  }

  get_more_info_profesor(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/more-info/profesor`, data);
  }

  get_more_info_serie(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/more-info/serie`, data);
  }

  get_more_info_grupa(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/more-info/grupa`, data);
  }

  get_studenti_serie(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/studenti/serie`, data);
  }

  get_studenti_grupa_serie(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/studenti/grupa-serie`, data);
  }

  get_more_info_examen(data:any) {
    console.log(data);
    return this.request('POST', `${environment.serverUrl}/more-info/examen`, data);
  }

  deleteEvent(event:any) {
    // return this.request('DELETE', `${environment.serverUrl}/event/${event.id}`);
  }

}
