import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu-items',
  templateUrl: './side-menu-items.component.html',
  styleUrls: ['./side-menu-items.component.scss']
})
export class SideMenuItemsComponent implements OnInit {

  @Input() menu;
  @Input() iconOnly: boolean;
  @Input() secondaryMenu = false;


  constructor(public router: Router) {
  }

  ngOnInit() {

  }

  openLink() {
    // this.menu.open = !this.menu.open;
    this.menu.open = (!this.secondaryMenu) ? !this.menu.open : this.menu.open;
    // (!this.secondaryMenu) ? this.menu.open = !this.menu.open : this.menu.open = this.menu.open;
  }

  checkForChildMenu() {
    // console.log(!!(this.menu && this.menu.sub));
    return !!(this.menu && this.menu.sub);
  }

}
