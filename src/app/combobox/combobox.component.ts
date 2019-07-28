import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class ComboboxComponent implements OnInit {

  items: any[] = [];

  formControl = new FormControl();

  hint = '';
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
