
## feature set:

### form:
* can contain multiple steps
* wraps and manages the whole process for steps, form items and actions
* provides back button to go back to previous step

### step:
* contains form items and actions
* step changes work with animations
* loading logic of form items are triggered when a step is loaded
* for the form items which has asynchronious loading logic are triggered parallelly and loading completes when all subscribed observables are completed
* controls back button visibility (usually for the last step - when you show the result and don't want to show the form again)

### form item:
* provides access to custom components which wrap reusable input controls
* you can program to provide how it is loaded
* you can load it asynchroniously by returning observables with pipe / tap call
* you can provide call back functions to configure its
    * visible and
    * enabled state
* components and FormControls of other form items are provided as parameters to the callbacks
* visible - invisible states occur with animations
* it provides loading state to its step, so that step enters loading state and doesn't allow further action by the user
* you can control Form Item's loading state, so the step and form enters the loading state. this is usually a requirement when you subscripe an event (typically to a value change of any form item) and load a form item during loading


### actions:
* action can be added in steps and can run a function which supports asyncyronous code execution by returning observables
* actions can change the current step of the form, you program to change current step in actions
* actions can return successful and unsuccessful results and can show validation error messages
* actions can be configured for enabled/disabled by a function, 
    * form values can be used to calculate the result and there is no need to trigger enabled/disabled value upon a value change
* action can be configured for visible/invisible by a function
    * form values can be used to calculate the result and there is no need to trigger visible/invisible value upon a value change
* when an action is running, step form, back button and actions are disabled
* when an observable returning function is triggered, the loading icon is shown until it completes

### step path:
* all posible steps are shown ordered
* current step is colored and colors changes with animation when step changes
