import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() public sourcepage: string;
  @Output() navclickevnt: EventEmitter<any> = new EventEmitter();

  screen: string;
  id1: string;
  site: string;

  toolbr = true;
  leftspan = true;
  sidenav_shw = false;
  comlogo_sec = true;
  comlogo_txt1 = true;
  comlogo_txt1val: string;
  comlogo_txt2 = false;
  comlogo_txt2val: string;
  comlogo_txt3 = false;
  comlogo_txt3val: string;
  mid_section = true;
  mid_devlnk = true;
  end_section = true;
  end_reglnk = true;
  end_loglnk = true;
  end_logoutlnk = true;

  constructor(
    private router: Router
    /* private auth: FirebaseauthService,
     private router: Router,
     private dialog: DialogsService,
     private nathttp: NatHttpService,
     private notify: NotifyService,
     private snav: SidenavService*/
  ) {
  }

  ngOnInit() {
    this.screen = this.sourcepage;
    console.log(this.screen);
    this.set_display();
    // this.id1 = this.notify.get_unq_id();
  }

  singup(btn) {

    switch (btn) {
      case ('register'): {
        console.log('inside register');
        this.signup_handler();
        break;
      }
      case ('login'): {
        console.log('inside login');
        this.login_handler();
        break;
      }
      case ('logout'): {
        console.log('inside logout');
        // this.login_handler();
        break;
      }
      default: {
        console.log('inside default');
        console.log(btn);
        this.navclickevnt.emit(btn);
      }
    }

  }

  set_display() {

    switch (this.screen) {
      case ('acdhome'): {
        this.set_dev_hm_pg();
        break;
      }
      case ('devland'): {
        this.set_dev_hm_pg();
        this.leftspan = false;
        this.sidenav_shw = true;
        this.end_loglnk = false;
        this.end_logoutlnk = true;
        break;
      }
      case ('devlgerr'): {
        this.set_dev_hm_pg();
        break;
      }
      case ('achome'): {
        this.set_hm_pg();
        break;
      }
      case ('plgland'): {
        this.set_hm_pg();
        this.leftspan = false;
        this.sidenav_shw = true;
        this.mid_section = false;
        this.mid_devlnk = false;
        this.end_reglnk = false;
        this.end_loglnk = false;
        this.end_logoutlnk = true;
        break;
      }


    }

  }

  set_dev_hm_pg() {
    this.toolbr = true;
    this.leftspan = true;
    this.sidenav_shw = false;
    this.comlogo_sec = true;
    this.comlogo_txt1 = true;
    this.comlogo_txt1val = 'Assetscube';
    this.comlogo_txt2 = true;
    this.comlogo_txt2val = '-';
    this.comlogo_txt3 = true;
    this.comlogo_txt3val = 'API';
    this.mid_section = false;
    this.mid_devlnk = false;
    this.end_section = true;
    this.end_reglnk = false;
    this.end_loglnk = true;
    this.end_logoutlnk = false;
    // this.auth.site = 'dv';
  }

  set_hm_pg() {
    this.toolbr = true;
    this.leftspan = true;
    this.sidenav_shw = false;
    this.comlogo_sec = true;
    this.comlogo_txt1 = true;
    this.comlogo_txt1val = 'Assetscube';
    this.comlogo_txt2 = false;
    this.comlogo_txt2val = '-';
    this.comlogo_txt3 = false;
    this.comlogo_txt3val = '';
    this.mid_section = false;
    this.mid_devlnk = true;
    this.end_section = true;
    this.end_reglnk = true;
    this.end_loglnk = true;
    this.end_logoutlnk = false;
    // this.auth.site = 'nc';
  }

  login_handler() {
    console.log('inside login handler');
    this.router.navigate(['/login'], {queryParams: {'type': 'login'}});


  }


  signup_handler() {
    console.log('inside signup handler');
    this.router.navigate(['/login'], {queryParams: {'type': 'signup'}});

  }

  /*
  logout_handler() {
    const mydialog  = this.dialog.showalert('Title', 'We are working on your request, please wait');
    // serverside cleanups
    const user = this.auth.firebase_user;
    const entityData = {
      'uid': user.uid
    };
    console.log('logout handler');

    this.nathttp.apiget(this.auth.site + 'logout')
    .subscribe (
        resp => {
          this.auth.fire_logout()
          .then( () => {
            mydialog.close();
            this.auth.delete_session();
            console.log(this.auth.site);
            if (this.auth.site === 'dv') {
              this.router.navigate(['/developers']);
            } else {
              this.router.navigate(['/']);
            }
          })
          .catch ((err) => {
            this.notify.update(this.id1, err, 'error', 'alert', 'no');
          });
          //
        },
        err => {
          this.notify.update(this.id1, err.error.usrmsg, 'error', 'alert', 'no');
          mydialog.close();
        }
      );
  }
  */
}
