import { Component, OnInit } from '@angular/core';
import {PaymentPackage} from './payment-package';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentPackage: PaymentPackage[];
  constructor() { }

  ngOnInit() {
    this.paymentPackage = [
      {
        packageId: 1,
        packageName: 'Free',
        packageDescription: 'It is for 30 days License',
        packageImageURL: 'https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg',
        packagePrice: 0
      },
      {
        packageId: 2,
        packageName: 'Basic',
        packageDescription: 'You can access only  POS Module',
        packageImageURL: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg',
        packagePrice: 2000
      },
      {
        packageId: 3,
        packageName: 'Premium',
        packageDescription: 'You can Access Everything',
        packageImageURL: 'https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(53).jpg',
        packagePrice: 3000
      }
    ];
  }

}
