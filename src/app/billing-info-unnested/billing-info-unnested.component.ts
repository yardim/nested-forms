import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-billing-info-unnested',
  templateUrl: './billing-info-unnested.component.html',
  styleUrls: ['./billing-info-unnested.component.scss']
})
export class BillingInfoUnnestedComponent implements OnInit {
  nestedForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.nestedForm = new FormGroup({
      address: new FormControl(null),
      // basicInfo: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.nestedForm);
  }
}
