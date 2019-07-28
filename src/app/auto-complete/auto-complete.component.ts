import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {


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

  displayFn(item: any): string | undefined {
    console.log('display fn item', item);
    return item ? item.text : undefined;
  }


}
