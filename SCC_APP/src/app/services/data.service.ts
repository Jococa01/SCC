import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Teams, Team, Player } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlTeams: string = '/api/teams';
  public urlPlayers: string = '/api/player';

  getTeams():Observable<Teams>{
    return this.http.get<Teams>(this.urlTeams);
  }

  getTeamPlayers(id:string):Observable<Team>{
    return this.http.get<Team>(this.urlTeams+"/"+id);
  }

  getFaPlayers():Observable<Player>{
    return this.http.get<Player>(this.urlPlayers+"s/fa");
  }

  getPlayer(id:string):Observable<Player>{
    return this.http.get<Player>(this.urlPlayers+"/"+id);
  }

  queryPlayers(nick:string):Observable<Player>{
    return this.http.get<Player>(this.urlPlayers+"/search/"+nick);
  }

}
