import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Role } from './user-form/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = 'https://raw.githubusercontent.com/roycecorp/challenge/master/mock.json';

  /** GET heroes from the server */
  getHeroes (): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl).pipe(
      //catchError(this.handleError('', []))
      
    );
}

  constructor( private http: HttpClient) {}
}
