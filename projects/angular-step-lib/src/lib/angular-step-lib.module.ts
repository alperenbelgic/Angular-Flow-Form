import { NgModule } from '@angular/core';
import { AngularStepLibComponent } from './angular-step-lib.component';
import { CommonModule } from '@angular/common';
import { FormItemComponent } from './form-item/form-item.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AngularStepLibComponent, FormItemComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  exports: [AngularStepLibComponent]
})
export class AngularStepLibModule { }
