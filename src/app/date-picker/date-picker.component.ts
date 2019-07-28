import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  formControl = new FormControl();
  placeHolder = '';
  label = '';

  constructor() { }

  set value(text: any) {
    this.formControl.setValue(text);
  }

  get value(): any {
    return this.formControl.value;
  }

  ngOnInit() {
  }

}
