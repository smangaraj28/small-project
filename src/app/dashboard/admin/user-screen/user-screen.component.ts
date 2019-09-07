import {Component, OnInit, ViewChild} from '@angular/core';
import {DualSelectRoleComponent} from '../dual-select/dual-select-role/dual-select-role.component';

export interface BranchRoleTable {
  branchName: string;
  branchRole: string;
}

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.scss']
})

export class UserScreenComponent implements OnInit {
  @ViewChild(DualSelectRoleComponent, {static: false})
  private timerComponent: DualSelectRoleComponent;

  hotelId: string;
  hotelName: string;
  hotelRegisterNo: string;
  displayedColumns: string[] = ['branchName', 'branchRole'];
  roleTableFlag = false;
  dataSource: BranchRoleTable[];
  branches = [];

  constructor() {
    this.hotelId = 'NOVHYD';
    this.hotelName = 'Novotel';
    this.hotelRegisterNo = '123ABC';
  }


  ngOnInit() {
    this.branches = [
      'Branch 1',
      'Branch 2',
      'Branch 3',
      'Branch 4',
      'Branch 5',
      'Branch 6',
      'Branch 7',
      'Branch 8',
      'Branch 9',
      'Branch 10',
      'Branch 11',
      'Branch 12',
      'Branch 13',
      'Branch 14',
    ];
  }

  proceed() {
    this.dataSource = [];
    if (typeof this.timerComponent.confirmedTube !== 'undefined' && this.timerComponent.confirmedTube.length > 0) {
      this.timerComponent.confirmedTube.forEach((value) => {
        this.dataSource.push({
          branchName: value,
          branchRole: null
        });
      });
      this.roleTableFlag = true;
    } else {
      this.roleTableFlag = false;
    }
  }

  onSave() {

  }
}
