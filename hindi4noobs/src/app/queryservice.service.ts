import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryserviceService {
  //serverAddress:string = "http://localhost:3000";
  serverAddress:string = "http://hindi4noobs-env.eba-6vvpptux.us-west-1.elasticbeanstalk.com";
  getLetterUrl:string = this.serverAddress + "/?letter=";

  constructor(private http:HttpClient) { 
  }

  getLetter(letter:string) {
    return this.http.get(this.getLetterUrl + letter);
  }
}
