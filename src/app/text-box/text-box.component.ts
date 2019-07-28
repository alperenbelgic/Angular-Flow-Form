import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  formControl = new FormControl('');

  placeHolder = '';
  label = '';

  constructor() { }

  set value(text: string) {
    this.formControl.setValue(text);
  }

  get value(): string {
    return this.formControl.value;
  }

  ngOnInit() {
    // this.formControl.disable();

  }

}
