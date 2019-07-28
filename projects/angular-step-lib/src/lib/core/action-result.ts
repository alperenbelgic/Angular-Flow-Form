export interface ValidationErrorMessageList {
    [formItemName: string]: string;
}

export class ActionResult {
    constructor(init?: Partial<ActionResult>) {
        Object.assign(this, init);
    }

    public static Successful(nextStep: string): ActionResult {
        return new ActionResult({
            successful: true,
            nextStep: nextStep
        });
    }

    public static Unsuccesful(errorMessages?: string[], formItemErrorMessages?: ValidationErrorMessageList): ActionResult {
        return new ActionResult({
            successful: false,
            stepErrorMessages: errorMessages
        });
    }

    AddErrorMessage(errorMessage: string, formItemName?: string): ActionResult {
        if (formItemName != null) {
            this.formItemErrorMessages[formItemName] = errorMessage;
        }
        else {
            this.stepErrorMessages.push(errorMessage);
        }
        return this;
    }

    successful: boolean;
    stepErrorMessages: string[] = [];
    formItemErrorMessages: ValidationErrorMessageList = {};
    nextStep: string;
}