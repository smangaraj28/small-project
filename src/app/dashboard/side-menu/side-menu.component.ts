import {Component, Input, OnInit} from '@angular/core';
import {Menus} from './menu-element';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() iconOnly = false;
  public menus = Menus;


  userobservable: Subscription;

  constructor() {
  }


  ngOnInit() {
  }

}
