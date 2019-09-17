import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entity} from '../models/entity';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EntityResolver {
  constructor(private httpClient: HttpClient) {
  }

  resolve(): Observable<any> {
    return this.httpClient.get<Entity[]>('/assets/entity.json');
  }
}
