// import { ActionBase, Form, FormStep, Result } from 'angular-step-lib/public-api';
import { Observable } from 'rxjs';
import { ActionBase } from './action-base';
import { Form } from './form';
import { FormStep } from './form-step';
import { ActionResult } from './action-result';

export class Action extends ActionBase {
    form: Form;
    formStep: FormStep;
    isRunning: boolean = false;


    constructor(init?: Partial<ActionBase>) {
        super();
        Object.assign(this, init);
    }

    get canClick(): boolean {
        return this.isEnabledFuncInternal() &&
            false == this.formStep.isLoading;
    }

    initialise(form: Form, formStep: FormStep) {
        this.form = form;
        this.formStep = formStep;
    }

    isEnabledFuncInternal(): boolean {
        return this.isEnabledFunc(this.form.formControls, this.form.components);
    }

    get isVisibleFuncInternal(): boolean {
        return this.isVisibleFunc(this.form.formControls, this.form.components)
    }

    actionFuncInternal(): void | ActionResult | Observable<void> | Observable<any> | Observable<ActionResult> {
        this.isRunning = true;
        this.formStep.stepErrorMessages = [];

        var result = this.actionFunc(this.form.formControls, this.form.components);

        if (result instanceof Observable) {
            result.subscribe((value: any) => {
                this.isRunning = false;

                if (value instanceof ActionResult) {
                    if (value.successful) {
                        this.form.goToStep(value.nextStep);
                    }
                    else {
                        // set form errors
                        this.formStep.stepErrorMessages = value.stepErrorMessages;
                    }
                }
            });
        }
        else {
            this.isRunning = false;
            if (result instanceof ActionResult) {
                if (result.successful) {
                    this.form.goToStep(result.nextStep);
                }
                else {
                    // set form errors
                    this.formStep.stepErrorMessages = result.stepErrorMessages;
                }
            }
        }
    }
}