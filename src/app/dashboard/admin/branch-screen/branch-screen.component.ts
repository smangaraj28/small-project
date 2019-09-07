import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-branch-screen',
  templateUrl: './branch-screen.component.html',
  styleUrls: ['./branch-screen.component.scss']
})

export class BranchScreenComponent implements OnInit {
  hotelId: string;
  hotelName: string;
  hotelRegisterNo: string;
  constructor() {
    this.hotelId = 'NOVHYD';
    this.hotelName = 'Novotel';
    this.hotelRegisterNo = '123ABC';
  }


  ngOnInit() {
  }

  onSave() {

  }
}
