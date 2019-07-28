import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {


  formControl = new FormControl();
  label = '';
  items: any[] = [];


  constructor() { }

  ngOnInit() {
  }

  set value(text: any) {
    this.formControl.setValue(text);
  }

  get value(): any {
    return this.formControl.value;
  }

}
