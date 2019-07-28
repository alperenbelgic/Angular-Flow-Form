import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  formControl = new FormControl(false);
  label = '';
  checkBoxText = '';

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
