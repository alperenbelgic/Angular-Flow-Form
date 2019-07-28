// import { FormItemBase, Form, FormStep } from 'angular-step-lib/public-api';
import { FormControl } from '@angular/forms';
import { FormItemBase } from './form-item-base';
import { Form } from './form';
import { FormStep } from './form-step';
import { Result } from './result';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IComponent } from './component';


export class FormItem<T> extends FormItemBase<T> {

    form: Form;
    formStep: FormStep;
    component: T = null;
    formControl: FormControl;
    isLoading: boolean = false;

    constructor(init?: Partial<FormItemBase<T>>) {
        super();
        Object.assign(this, init);
    }

    get isComponentLoading(): boolean {

        if ((this.component as any).isLoading != undefined) {
            return (this.component as any).isLoading == true;
        }
        else {
            return false;
        }
    }

    set isComponentLoading(value: boolean) {
        (this.component as any).isLoading = value;
    }


    initialise(form: Form, formStep: FormStep) {
        this.form = form;
        this.formStep = formStep;
    }

    setComponent(component) {

        this.component = component;

        if ((this.component as any).formControl != undefined && (this.component as any).formControl instanceof FormControl) {
            this.formControl = (this.component as any).formControl;
        }

        this.form.onComponentCreated();
    }

    loadInternal(
        component: T,
        formControls: { [formItemName: string]: FormControl; },
        components: { [formItemName: string]: any; }
    ): void | Result | Observable<Result> {
        var result = this.load(component, formControls, components);

        if (result instanceof Observable) {
            this.isLoading = true;

            return result.pipe(
                tap(r => {
                    this.isLoading = false;
                })
            );
        }
        else {
            return result;
        }
    }

    get isVisibleInternal(): boolean {
        return this.form.isInitialised && this.isVisible(this.component, this.form.formControls, this.form.components);
    }

    private isEnabledValue = true;
    
    get isEnabledInternal(): boolean {
        if (false == this.form.isInitialised) {
            this.isEnabledValue = true;
        }
        else {
            let calculatedIsEnabledValue = this.isEnabled(this.component, this.form.formControls, this.form.components);

            if (this.isEnabledValue != calculatedIsEnabledValue) {
                this.isEnabledValue = calculatedIsEnabledValue;

                let functionName = this.isEnabledValue ? 'enable' : 'disable';
                setTimeout(() => {
                    // todo: check if form control is provided
                    ((this.component as any).formControl)[functionName]();
                }, 0);
            }
        }

        return this.isEnabledValue;
    }
} 