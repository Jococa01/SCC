import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Teams } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlTeams: string = '/api/teams';

  getTeams():Observable<Teams>{
    return this.http.get<Teams>(this.urlTeams);
  }
}
