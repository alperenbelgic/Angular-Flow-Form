// import { FormItem, Action } from 'angular-step-lib/public-api';
import { Observable } from 'rxjs';
import { FormItem } from './form-item';
import { Action } from './action';

export class FormStepBase {
  name: string;
  title: string;
  formItems: FormItem<any>[] = [];
  actions: Action[] = [];
  onFormItemsLoaded: (component: any, formControls: any, components: any) => Observable<void>;
  isBackButtonVisible: (formControls: any, components: any) => boolean = () => true;
}