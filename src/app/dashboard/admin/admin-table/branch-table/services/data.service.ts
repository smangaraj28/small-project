import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Entity} from '../models/entity';
// import { environment } from '../../../../environments/environment';
// import { Entity } from '../../product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private productsUrl = environment.server_url + '/products';
  dataChange: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor() {
  }

  get data(): Entity[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    // this.httpClient.get<Entity[]>(this.productsUrl).subscribe(data => {
    //     this.dataChange.next(data);
    //   },
    //   (error: HttpErrorResponse) => {
    //   console.log (error.name + ' ' + error.message);
    //   });
  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: Entity): void {
    this.dialogData = issue;
  }

  updateIssue(issue: Entity): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




