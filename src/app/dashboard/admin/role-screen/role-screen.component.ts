import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DualSelectRoleComponent} from '../dual-select/dual-select-role/dual-select-role.component';

@Component({
  selector: 'app-role-screen',
  templateUrl: './role-screen.component.html',
  styleUrls: ['./role-screen.component.scss']
})

export class RoleScreenComponent implements OnInit, AfterViewInit {
  @ViewChild(DualSelectRoleComponent, {static: false})
  private timerComponent: DualSelectRoleComponent;
  hotelId: string;
  hotelName: string;
  hotelRegisterNo: string;
  roleTableFlag = false;
  selectedUser: any;
  modulesName = [];
  originalModules = [];
  clonedModules = [];
  selectedModules = [];

  constructor() {
    this.hotelId = 'NOVHYD';
    this.hotelName = 'Novotel';
    this.hotelRegisterNo = '123ABC';
  }


  ngOnInit() {
    this.originalModules = [
      {
        name: 'POS Billing',
        selected: false,
        subPackages: [
          {
            name: 'ABC',
            selected: false
          },
          {
            name: 'POP',
            selected: false
          },
          {
            name: 'AFF',
            selected: false
          }
        ]
      },
      {
        name: 'Inventory Management',
        selected: false,
        subPackages: [
          {
            name: 'ABC',
            selected: false
          },
          {
            name: 'POP',
            selected: false
          },
          {
            name: 'AFF',
            selected: false
          }
        ]
      },
      {
        name: 'Room Booking',
        selected: false,
        subPackages: [
          {
            name: 'ABC',
            selected: false
          },
          {
            name: 'POP',
            selected: false
          },
          {
            name: 'AFF',
            selected: false
          }
        ]
      },
      {
        name: 'Super Market POS',
        selected: false,
        subPackages: [
          {
            name: 'ABC',
            selected: false
          },
          {
            name: 'POP',
            selected: false
          },
          {
            name: 'AFF',
            selected: false
          }
        ]
      }
    ];
    this.clonedModules = this.originalModules;
    this.modulesName = this.originalModules.map((x) => {
      return x.name;
    });
  }

  proceed() {
    this.selectedModules = [];
    this.clonedModules.forEach(event => {
      event.selected = false;
    });
    if (typeof this.timerComponent.confirmedTube !== 'undefined' && this.timerComponent.confirmedTube.length > 0) {
      this.timerComponent.confirmedTube.forEach((value) => {
        this.clonedModules.forEach((event) => {
          if (event.name === value) {
            event.selected = true;
          }
        });
      });
      this.selectedModules = this.clonedModules.filter(event => {
        return event.selected === true;
      });
      this.roleTableFlag = true;
    } else {
      this.roleTableFlag = false;
    }
  }

  ngAfterViewInit() {
    // console.log(this.timerComponent);
  }

  onSave() {
    console.log('Selected Modules For A specific Role', this.selectedModules);
  }

}
