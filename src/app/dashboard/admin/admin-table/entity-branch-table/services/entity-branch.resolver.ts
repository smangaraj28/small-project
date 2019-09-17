import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntityBranch} from '../models/entity-branch';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EntityBranchResolver {
  constructor(private httpClient: HttpClient) {
  }

  resolve(): Observable<any> {
    return this.httpClient.get<EntityBranch[]>('/assets/entity-branch.json');
  }
}
