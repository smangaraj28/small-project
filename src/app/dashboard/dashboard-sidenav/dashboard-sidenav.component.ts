import {Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardSidenavComponent implements OnChanges, OnInit, OnDestroy {

  watcher: Subscription;
  activeMediaQuery = '';

  @Input() hasSidenav = false;
  @Input() hasSidebar = false;
  @Input() isVisible = true;
  visibility = 'shown';

  sideNavOpened = true;
  matDrawerOpened = false;
  matDrawerShow = true;
  sideNavMode = 'side';
  loading = false;

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  constructor(private mediaObserver: MediaObserver,
              private router: Router) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }

      }
    });
  }

  ngOnInit() {
    this.watcher = this.mediaObserver.media$.subscribe((mediaChange: MediaChange) => {
      this.toggleView();
    });
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
    // return outlet.isActivated ? outlet.activatedRoute : ''
  }

  toggleView() {
    if (this.hasSidenav) {
      if (this.mediaObserver.isActive('gt-md')) {
        this.sideNavMode = 'side';
        this.sideNavOpened = true;
        this.matDrawerOpened = false;
        this.matDrawerShow = true;
      } else if (this.mediaObserver.isActive('gt-xs')) {
        this.sideNavMode = 'side';
        this.sideNavOpened = false;
        this.matDrawerOpened = true;
        this.matDrawerShow = true;
      } else if (this.mediaObserver.isActive('lt-sm')) {
        this.sideNavMode = 'over';
        this.sideNavOpened = false;
        this.matDrawerOpened = false;
        this.matDrawerShow = false;
      }
    } else {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    }
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
