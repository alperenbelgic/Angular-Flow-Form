import { Component, Type } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { Form, FormItem, FormStep, Action, ActionResult, Result, FormItemBase, FormStepBase } from 'angular-step-lib';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: Form;

  ngOnInit() {
    this.form =
      new Form({
        steps: [
          new FormStep({
            name: 'PersonalInfo',
            title: 'Personal Information',
            formItems: [
              new FormItem<RadioButtonComponent>({
                name: 'title',
                componentType: RadioButtonComponent,
                load: (component) => {
                  component.label = 'Title';
                  component.items = [
                    {
                      text: 'Mr',
                      code: 'MR'
                    },
                    {
                      text: 'Mrs.',
                      code: 'MRS'
                    },
                    {
                      text: 'Ms.',
                      code: 'MS'
                    },
                  ];
                }
              }),
              new FormItem({
                name: 'name',
                componentType: TextBoxComponent,
                load: (component, formControls, components) => {
                  component.label = 'Name';
                }
              }),
              new FormItem({
                name: 'maidenName',
                componentType: TextBoxComponent,
                load: (component, formControls, components) => {
                  component.label = 'Maiden Name';
                },
                isVisible: (component,
                  formControls,
                  components) => {
                  return components.title.value != null && components.title.value.code == 'MRS';

                }
              }),
              new FormItem({
                name: 'postCode',
                componentType: AutoCompleteComponent,
                load: (component) => {
                  component.label = 'Post Code';

                  component.items = [
                    { code: 'SW17 ABC', text: 'SW17 ABC' },
                    { code: 'SW17 XYZ', text: 'SW17 XYZ' },
                    { code: 'SW17 UVT', text: 'SW17 UVT' },
                  ]
                }
              }),
              new FormItem({
                name: 'addressSelection',
                componentType: ComboboxComponent,
                load: (component, formControls) => {
                  component.label = 'Address';
                  component.items = [];


                  formControls.postCode.valueChanges.subscribe((postCodeValue: any) => {

                    component.items = [];

                    if (postCodeValue != null && postCodeValue != '') {

                      (component as any).isLoading = true;

                      return of(
                        [
                          { text: '400 Mithcam Rd', postCode: 'SW17 ABC' },
                          { text: '401 Mithcam Rd', postCode: 'SW17 ABC' },
                          { text: '402 Mithcam Rd', postCode: 'SW17 ABC' },
                          { text: '403 Mithcam Rd', postCode: 'SW17 XYZ' },
                          { text: '404 Mithcam Rd', postCode: 'SW17 XYZ' },
                          { text: '405 Mithcam Rd', postCode: 'SW17 XYZ' },
                          { text: '406 Mithcam Rd', postCode: 'SW17 UVT' },
                          { text: '407 Mithcam Rd', postCode: 'SW17 UVT' },
                          { text: '408 Mithcam Rd', postCode: 'SW17 UVT' },
                        ].filter(i => i.postCode == postCodeValue.code)
                      ).pipe(
                        delay(1000)).subscribe(
                          (items: any[]) => {
                            component.items = [{ text: '---', postCode: 'empty' }];
                            items.forEach(i => { component.items.push(i); });

                            (component as any).isLoading = false;

                          }
                        );
                    }
                  });

                  let r = new ActionResult();
                  r.successful = true;

                  return of(r);
                },
                isVisible: (component: ComboboxComponent,
                  formControls: any,
                  components: any) => {
                  return true;
                },
                isEnabled: (
                  component: ComboboxComponent,
                  formControls: any,
                  components: any
                ) => {
                  // return false;
                  return components.postCode.value != null && components.postCode.value != '';
                }

              }),
              new FormItem({
                name: 'pickClosestBranchAutomatically',
                componentType: CheckboxComponent,
                load: (component) => {
                  component.label = 'Branch selection';
                  component.checkBoxText = 'Pick the branch automatically'
                },
                isEnabled: (component, formControls, compoenents) => {

                  return true;
                }
              }),
              new FormItem({
                name: 'showBothActions',
                componentType: CheckboxComponent,
                load: (component) => {
                  component.label = 'Show both actions';
                  component.checkBoxText = 'Show both actions, just for nothing'
                },
                isEnabled: (component, formControls, compoenents) => {

                  return true;
                }
              }),

            ],
            actions: [
              new Action({
                buttonText: 'Show branches',
                isEnabledFunc: (formControls: any, components: any) => {

                  let nameValid = components.name.value != null && components.name.value != '';
                  let addressValid = components.addressSelection.value != null && components.addressSelection.value.postCode != 'empty';

                  return nameValid && addressValid;
                },
                isVisibleFunc: (formControls, components) => {
                  return components.pickClosestBranchAutomatically.value == false || components.showBothActions.value == true;
                },
                actionFunc: (formControls: any, components: any) => {

                  let isMrs = components.title.value != null && components.title.value.code == 'MRS';
                  let isMaidenNameEmpty = components.maidenName.value == null || components.maidenName.value == '';

                  if (isMrs && isMaidenNameEmpty) {
                    return ActionResult.Unsuccesful(['Please enter Maiden name when Mrs is selected.']);
                  }
                  else {
                    return ActionResult.Successful('branch');
                  }
                }
              }),
              new Action({
                buttonText: 'Complete',
                isEnabledFunc: (formControls: any, components: any) => {
                  let nameValid = components.name.value != null && components.name.value != '';
                  let addressValid = components.addressSelection.value != null && components.addressSelection.value.postCode != 'empty';

                  return nameValid && addressValid;
                },
                isVisibleFunc: (formControls, components) => {
                  return components.pickClosestBranchAutomatically.value == true || components.showBothActions.value == true;
                },
                actionFunc: (formControls: any, components: any) => {
                  return of(new ActionResult({ successful: true, nextStep: 'completed' })).pipe(delay(5000));

                }
              })

            ]
          }),
          new FormStep({
            name: 'branch',
            title: 'Pick a Branch',
            formItems: [
              new FormItem({
                name: 'selectedBranch',
                componentType: RadioButtonComponent,
                load: (component) => {
                  component.label = 'Closest Branches';

                  return of(
                    [
                      {
                        text: 'Tooting',
                        code: '1'
                      },
                      {
                        text: 'Balham',
                        code: '2'
                      },
                      {
                        text: 'Wimbeldon',
                        code: '3'
                      },
                      {
                        text: 'Croydon',
                        code: '4'
                      },
                    ]
                  ).pipe(
                    delay(4000),
                    tap((items: any[]) => {
                      component.items = items;
                    }),
                    map((items: any[]) => {
                      return new Result({ successful: true });
                    })
                  );

                }
              }),
            ],
            actions: [
              new Action({
                buttonText: 'Complete',
                isEnabledFunc: (formControls: any, components: any) => {
                  return components.selectedBranch.value != null;
                },
                actionFunc: (formControls: any, components: any) => {
                  return of(new ActionResult({ successful: true, nextStep: 'completed' })).pipe(delay(5000));
                }
              })
            ]
          }),
          new FormStep({
            name: 'completed',
            title: 'Result',
            formItems: [
              new FormItem({
                name: 'resultContent',
                componentType: TextBoxComponent,
                load: (component, formControls) => {
                  component.label = '';
                  formControls['resultContent'].disable();
                  component.value = 'The operation has been completed.'
                }
              })
            ],
            isBackButtonVisible: () => {
              return false;
            }
          }),
        ]
      });
  }
}