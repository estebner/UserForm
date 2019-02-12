import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user-form/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://requestbin.fullcontact.com/1akzob81';
  //private userUrl = 'https://postb.in/1aWc3AF3';

  addUser (user: User): Observable<User> {
      return this.http.post<User>(this.userUrl, JSON.stringify(user), httpOptions).pipe(
          catchError(this.handleError('add user', user))
      );
  }

  handleError(err: any, user: User){
      return (error: any): Observable<User> => {
        
        return of(user);
      }
  }

  constructor(private http: HttpClient) { }
}
