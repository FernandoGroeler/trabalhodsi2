import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Agenda } from './agenda'

@Injectable()
export class AgendaService {
  private agendaUrl = 'http://localhost:4200/api/agenda';

  constructor(private http: Http) { }

  public addAgenda(body: Object): Observable<Agenda[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.agendaUrl, body, options)
      .map((res: Response) => res.json());
  }

  public updateAgenda(body: Object): Observable<Agenda[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.put(`${this.agendaUrl}/${body['id']}`, body, options)
      .map((res: Response) => res.json());
  }

  public removeAgenda(id: number): Observable<Agenda[]> {
    return this.http.delete(`${this.agendaUrl}/${id}`)
      .map((res: Response) => res.json());
  }

  public loadAgenda(): Observable<Agenda[]> {
    return this.http.get(`${this.agendaUrl}`)
      .map((res: Response) => res.json());
  }
}
