// import { FormBase, FormItem, FormStep } from 'angular-step-lib/public-api';
import { FormControl } from '@angular/forms';
import { FormBase } from './form-base';
import { FormStep } from './form-step';
import { FormItem } from './form-item';

export class Form extends FormBase {

    activeStep: FormStep;

    private formItems: { [formItemName: string]: FormItem<any>; } = {};
    components: { [formItemName: string]: any; } = {};
    formControls: { [formItemName: string]: FormControl; } = {};

    visitedSteps: FormStep[] = [];
    currentStep: FormStep = null;

    isInitialised = false;

    get backButtonVisible(): boolean {
        return this.visitedSteps.length > 0 && this.currentStep.isBackButtonVisible(this.formControls, this.components);
    }

    get backButtonActive(): boolean {
        return this.visitedSteps.length > 0 && (this.currentStep != null && this.currentStep.isLoading == false);
    }

    constructor(init?: Partial<FormBase>) {
        super();
        Object.assign(this, init);

        this.initialise();
    }

    validate() {
        // if there is any recurring form item names or step names
    }

    onComponentCreated() {
        var formItems = Object.values(this.formItems);
        let hasAnyStandingComponent: boolean = formItems.some(formItem => formItem.component == null);

        if (false == hasAnyStandingComponent) {
            this.postInitialise();
        }
    }

    private initialise() {
        this.steps.forEach(step => {
            step.initialise(this);
        });
    }

    postInitialise() {
        this.steps.forEach(step => {
            step.formItems.forEach(formItem => {
                this.formItems[formItem.name] = formItem;
                this.components[formItem.name] = formItem.component;
                this.formControls[formItem.name] = formItem.formControl;
            });
        });
        setTimeout(() => {
            this.isInitialised = true;
        }, 1);
    }

    load(): Form {
        this.currentStep = this.steps[0];
        // this.visitedSteps.push(this.currentStep);

        this.currentStep.slideStatus = 'entered';
        this.currentStep.load(this.formControls, this.components);
        return;
    }

    goToStep(stepName: string) {

        if (stepName == this.currentStep.name) {
            return;
        }

        if (this.visitedSteps.some(s => s.name == stepName)) {
            return;
        }

        let nextStep = this.steps.find(s => s.name == stepName);
        if (typeof nextStep === 'undefined') {
            return;
        }

        let oldCurrentStep = this.currentStep;
        let newCurrentStep = nextStep;

        this.visitedSteps.push(oldCurrentStep);
        this.currentStep = newCurrentStep;

        oldCurrentStep.slideStatus = 'passed';
        newCurrentStep.slideStatus = 'entered';

        newCurrentStep.load(this.formControls, this.components);
    }

    goBack() {
        let oldCurrentStep = this.currentStep;
        let oldPreviousStep = this.visitedSteps.pop();

        let newCurrentStep = oldPreviousStep;
        this.currentStep = newCurrentStep;

        oldCurrentStep.slideStatus = 'not-entered';
        newCurrentStep.slideStatus = 'entered';
    }


}
