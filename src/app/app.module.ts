import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AngularStepLibModule, AngularStepLibComponent } from 'angular-step-lib/public-api';

import { TextBoxComponent } from './text-box/text-box.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { AngularStepLibModule } from 'angular-step-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    TextBoxComponent,
    ComboboxComponent,
    DatePickerComponent,
    RadioButtonComponent,
    CheckboxComponent,
    AutoCompleteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    DemoMaterialModule,

    AngularStepLibModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TextBoxComponent,
    ComboboxComponent,
    DatePickerComponent,
    RadioButtonComponent, 
    CheckboxComponent, 
    AutoCompleteComponent
  ],
})
export class AppModule { }
