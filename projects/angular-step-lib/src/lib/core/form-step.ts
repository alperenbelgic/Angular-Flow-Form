import { Observable, forkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormStepBase } from './form-step-base';
import { Form } from './form';

export class FormStep extends FormStepBase {

    form: Form;
    slideStatus: 'not-entered' | 'entered' | 'passed' = 'not-entered';
    private isLoaded: boolean = false;
    stepErrorMessages: string[] = [];

    constructor(init?: Partial<FormStepBase>) {
        super();
        Object.assign(this, init);
    }

    get isLoading(): boolean {
        return this.formItems.some(i => i.isLoading || i.isComponentLoading) || this.actions.some(a => a.isRunning);
    };
    initialise(form: Form) {
        this.form = form;

        this.formItems.forEach((formitem) => {
            formitem.initialise(form, this);
        });

        this.actions.forEach((action) => {
            action.initialise(form, this);
        });
    }

    load(
        formControls: { [formItemName: string]: FormControl; },
        components: { [formItemName: string]: any; }) {

        if (this.isLoaded) {
            return;
        }
        else {
            this.isLoaded = true;
        }

        let observableLoadFunctions: Observable<any>[] = [];

        this.formItems.forEach((formitem) => {

            var result = formitem.loadInternal(formitem.component, formControls, components);

            if (result instanceof Observable) {
                observableLoadFunctions.push(result);
            }
            else {
                // 
            }
        });

        if (observableLoadFunctions.length > 0) {

            forkJoin(observableLoadFunctions).subscribe(o => {

            });
        }
    }
}
