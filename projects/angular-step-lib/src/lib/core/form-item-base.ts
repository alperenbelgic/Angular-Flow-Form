// import { Result } from 'angular-step-lib/public-api';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Result } from './result';
import { Type } from '@angular/core';



export class FormItemBase<T> {
    name: string;
    componentType: Type<T>;

    load: (
        component: T,
        formControls: { [formItemName: string]: FormControl; },
        components: { [formItemName: string]: any; }
    ) => void | Result | Observable<Result> = () => { new Result({ successful: true }) };
    isVisible: (
        component: T,
        formControls: { [formItemName: string]: FormControl; },
        components: { [formItemName: string]: any; }
    ) => boolean = () => {
        return true;
    };
    isEnabled: (
        component: T,
        formControls: { [formItemName: string]: FormControl; },
        components: { [formItemName: string]: any; }
    ) => boolean = () => { return true; };
    /*    
        isValid: (
            component: T,
            formControls: { [formItemName: string]: FormControl; },
            components: { [formItemName: string]: any; }
        ) => boolean = () => { return true; };
    */
}