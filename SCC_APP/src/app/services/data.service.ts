import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaceitPlayer, Team, Player } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public urlTeams: string = '/api/teams';
  public urlPlayers: string = '/api/player';
  // Faceit API
  public faceitPlayer: string = "https://open.faceit.com/data/v4/players";
  // Headers & Auth settings
  public Token: string = "0c079fc1-f436-4e6a-9bee-e95dfa4d0fb4";
  public httpOptions : Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.Token}`
    }),
    responseType: 'json'
  };

  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>(this.urlTeams);
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

  queryTeams(name:string):Observable<Team>{
    return this.http.get<Team>(this.urlTeams+"/search/"+name);
  }

  getFaceitPlayer(nick:string):Observable<any>{
    return this.http.get<any>(this.faceitPlayer+"?nickname="+nick,this.httpOptions);
  }

  getFaceitPlayerStats(id:string):Observable<any>{
    return this.http.get<any>(this.faceitPlayer+"/"+id+"/stats/csgo",this.httpOptions);
  }

}
