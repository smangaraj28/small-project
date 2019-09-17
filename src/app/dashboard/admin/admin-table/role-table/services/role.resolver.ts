import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RoleResolver {
  constructor(private httpClient: HttpClient) {
  }

  resolve(): Observable<any> {
    return this.httpClient.get<Role[]>('/assets/role.json');
  }
}
