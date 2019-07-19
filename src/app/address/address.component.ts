import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements OnInit, ControlValueAccessor, Validator {
  addressFrom: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addressFrom = new FormGroup({
      address: new FormControl('', Validators.required),
      areaCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    });
  }

  onTouched(): void { }

  writeValue(val: any) {
    console.log('writeValue');
    console.log(val);

    if (!val) {
      return;
    }

    this.addressFrom.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    console.log('On change');
    this.addressFrom.valueChanges.subscribe((value: any) => {
      console.log('changed');
      console.log(value);
      fn(value);
      this.writeValue(value);
    });
  }

  registerOnTouched(fn: any) {
    console.log('On blur');
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.addressFrom.disable();
      return;
    }

    this.addressFrom.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('Basic Info validation', c);
    return this.addressFrom.valid
      ? null
      : { invalidForm: { valid: false, message: 'address fields are invalid' } };
  }
}
