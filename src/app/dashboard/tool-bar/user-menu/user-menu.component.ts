import {Component, HostListener, Input, OnInit} from '@angular/core';
// import { FireauthService } from '../../../accore/fireauth/fireauth.service';
// import { Store, Select } from '@ngxs/store';
// import { User } from '../../../feature/acauth/models/auth.model';
// import { AuthState } from '../../../feature/acauth/state/auth.state';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isOpen = false;

  // currentUser = null;
  // @Select(AuthState.getUser) user$: Observable<User>;

  @Input() currentUser = null;

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
  }


  // constructor(private elementRef: ElementRef, private store: Store, private fauthserv: FireauthService) { }


  ngOnInit() {
    console.log('inside toolbar user menu');
    console.log(this.currentUser);
    console.log(this.currentUser.user);
    console.log(this.currentUser.email);
  }


  logout() {
    console.log('logout');
    //  this.fauthserv.fb_logout('',{},'');
    // this.store.dispatch(new Logout());
  }

}
