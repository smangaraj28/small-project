import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DualListComponent} from '../dual-list.component';

@Component({
  selector: 'app-dual-select-role',
  templateUrl: './dual-select-role.component.html',
  styleUrls: ['./dual-select-role.component.scss']
})
export class DualSelectRoleComponent implements OnInit, AfterViewInit {
  @ViewChild(DualListComponent, {static: false})
  private dualListComponent: DualListComponent;

  @Input() data;
  keepSorted = true;
  key: string;
  display: any;
  filter = false;
  source: Array<any>;
  confirmed: Array<any>;
  userAdd = '';
  disabled = false;
  sourceLeft = true;
  format: any = {
    add: 'Add',
    remove: 'Remove',
    all: 'All',
    none: 'None',
    direction: 'left-to-right',
    draggable: true,
    locale: undefined
  };
  requiredData: any;
  sourceTube: Array<string>;
  public confirmedTube: Array<string>;
  tube: Array<string>;
  breakpoint: any;

  private useTube() {
    this.key = undefined;
    this.display = undefined;
    this.keepSorted = false;
    this.source = this.sourceTube;
    this.confirmed = this.confirmedTube;
  }

  doReset() {
    this.sourceTube = JSON.parse(JSON.stringify(this.tube));
    this.confirmedTube = new Array<string>();
    this.useTube();
  }

  doDelete() {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate() {
    if (typeof this.source[0] === 'object') {
      const o = {};
      o[this.key] = this.source.length + 1;
      o[this.display] = this.userAdd;
      this.source.push(o);
    } else {
      this.source.push(this.userAdd);
    }
    this.userAdd = '';
  }

  doAdd() {
    for (let i = 0, len = this.source.length; i < len; i += 1) {
      const o = this.source[i];
      const found = this.confirmed.find((e: any) => e === o);
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove() {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  doFilter() {
    this.filter = !this.filter;
  }

  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

  doDisable() {
    this.disabled = !this.disabled;
  }

  disableBtn() {
    return (this.disabled ? 'Enable' : 'Disabled');
  }

  swapDirection() {
    this.sourceLeft = !this.sourceLeft;
    this.format.direction = this.sourceLeft ? 'left-to-right' : 'right-to-left';
  }

  ngOnInit(): void {
    this.tube = this.data;
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.doReset();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  ngAfterViewInit(): void {
    this.requiredData = this.dualListComponent;
  }
}
