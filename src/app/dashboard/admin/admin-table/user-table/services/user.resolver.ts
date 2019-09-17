import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserResolver {
  constructor(private httpClient: HttpClient) {
  }

  resolve(): Observable<any> {
    return this.httpClient.get<User[]>('/assets/user.json');
  }
}
