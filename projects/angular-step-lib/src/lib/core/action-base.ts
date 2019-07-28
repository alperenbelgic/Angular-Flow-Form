import { Observable } from 'rxjs';
import { ActionResult } from './action-result';

export class ActionBase {
    name: string;
    buttonText: string;
    isEnabledFunc: (formControls: any, components: any) => boolean = () => true;
    isVisibleFunc: (formControls: any, components: any) => boolean = () => true;
    actionFunc: (formControls: any, components: any) => void | ActionResult | Observable<void> | Observable<any> | Observable<ActionResult>;
  }