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

  /** GET roles from the server */
  getRoles (input: string, selectedRoles: number[]): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl).pipe(
      //catchError(this.handleError('', []))
      map((results: Role[]) => {return this._filter(results, input, selectedRoles)})
    )
  }

  private _filter(roles: Role[], input: string, selectedRoles: number[]) : Role[] {

      let filteredRoles: Role[];
      filteredRoles = [];
      let filteredInput = '';
      if(input)
        filteredInput = input.toLowerCase() || '';

      filteredRoles = roles.filter(role => role.role.toLowerCase().indexOf(filteredInput) != -1 && selectedRoles.indexOf(role.id) == -1)

      return filteredRoles;
  }

  constructor( private http: HttpClient) {}
}
