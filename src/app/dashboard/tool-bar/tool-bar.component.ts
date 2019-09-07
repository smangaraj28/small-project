import {Component, Input, OnInit} from '@angular/core';
//import { Store, Select } from '@ngxs/store';
//import { AuthState } from '../../feature/acauth/state/auth.state';
//import { User } from '../../feature/acauth/models/auth.model';
// import { FireauthService } from '../../accore/fireauth/fireauth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  /*
	@Select(AuthState.getUser) user$: Observable<User>;
	userobservable:Subscription;
	userdetails:User;
*/
  userdetails: any;
  @Input() sidenav;
  @Input() sidebar;
  @Input() drawer;
  @Input() matDrawerShow;
  @Input() hasSidenav;
  @Input() hasSidebar;

  searchOpen = false;

  // toolbarHelpers = ToolbarHelpers;
  constructor(// private store: Store,
    // private fauthserv: FireauthService
  ) {
  }

  ngOnInit() {
    /*this.userobservable = this.user$.subscribe(
            user => {
              if (this.userdetails && user) {
                  if (this.userdetails.uid !== user.uid) {
                    //logout
                  } else if (this.userdetails.uid === user.uid) {
                    this.userdetails = user;
                  }
                  console.log("inside observable");
                  console.log(user);
                  console.log(this.userdetails);
              }
            }
        );

        this.userdetails = this.store.selectSnapshot(AuthState.getUser);
        console.log("Insdier toobar")		;
        console.log(this.userdetails);
        console.log(this.userdetails);
        */
    this.userdetails = {name: 'username'};
  }

  ngOnDestroy() {
    // this.userobservable.unsubscribe;
  }

  logout1() {
    console.log('logout');
    // this.store.dispatch(new Logout());

  }

  async logout(errormsg?) {
    // await this.fauthserv.fb_logout(errormsg='',{},'', '/home');
  }


}
