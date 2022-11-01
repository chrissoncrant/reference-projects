//This is utilized within postRender method. It gathers all the focusableElements that are children of the <burger-menu> custom element.
import getFocusableElements from './get-focusable-elements.js';

//This is a class declaration; this is extending the class from the HTMLElement object. 
class BurgerMenu extends HTMLElement {
    //All classes must have a constructor. This is where properties are defined.
    constructor() {
        //This is the special method of classes that absorbs all the properties and methods within the contructor of the object this class extends, which is the HTMLElement.
        super();

        //This is only used within the Proxy object because within that object the 'this' keyword will refer to the Proxy object, which doesn't have the proper method that is being called. Declaring this variable is just a clever way to give the Proxy object access to the desired method on its parent class.
        //This is utilized within the Proxy handler
        const self = this;

        //Declaring a property called state and wiring it up to a new instance of a Proxy object. 

        this.state = new Proxy(
            //This is the target object
            {
                //This property is updated via toggle, processStateChange, manageFocus, 
                status: 'open',
                //The enabled value is updated/written to based on the Resize Observer which is set up within the connectedCallback menthod.
                //This value is read within processStateChange, manageFocus methods
                enabled: false,
            },
            //This is the handler object; the state parameter always refers to the above target object.
            //This is only handling write requests. 
            {
                set(state, key, value) {
                    //wires the current value to a variable
                    const oldValue = state[key];

                    //writes/updates the specified property of the state/target object to the specified value
                    state[key] = value;

                    //State change is processed only if the old value is changed. This is important for the Resize Observer.
                    //Triggers updates to the HTML element.
                    if (oldValue !== value) {
                        self.processStateChange();
                    }

                    //A truthy value must be returned with setter traps in order to prevent an TypeError from being thrown.
                    return state;
                }
            }
        );
    }   
    
    // ################################
    // UTILITY FUNCTIONS ##############
    // ################################

    //This is called within the handler of the Proxy object.
    //This set up the 'status' and 'enabled' attributes and gives them the values based on the properties of the Proxy object/State object.
    processStateChange() {
        //sets the 'status' and 'enabled' attributes to the relative values of the state object, which is the target object of the Proxy wired to this.state. This is a simple read operation and goes through the handler transparently. 
        this.root.setAttribute('status', this.state.status);       
        this.root.setAttribute('enabled', this.state.enabled ? 'true' : 'false');

        //Updates what elements are focusable which is based on the 'state' attribute value. Adds/Removes focus ability on the links.
        this.manageFocus();

        //status is either 'open' or 'closed'
        //Setting the aria attributes on the button.
        switch (this.state.status) {
            case 'closed':
                this.trigger.setAttribute('aria-expanded', 'false');
                this.trigger.setAttribute('aria-label', 'Open menu');
                break;
            //If status is either 'initial' or 'open' the code will run
            case 'open':
            case 'initial':
                this.trigger.setAttribute('aria-expanded', 'true');
                this.trigger.setAttribute('aria-label', 'Close menu');
                break;
        }
    }

    //This is all about the focus aspect in the links. Hides links from focus when burger menu is closed, and makes links focusable when the menu is open.  
    //This is called within the processStateChange, which is called whenever the Proxy object's target properties change.
    manageFocus() {
        
        //Removes the ability to focus on the navigation if burger-root enabled attribute is false/burger menu is closed.
        if (!this.state.enabled) {
            this.focusableElements.forEach(element => element.removeAttribute('tabindex'));
            return;
        }

        switch (this.state.status) {
            //If the status is open and the burger mene is open then remove the tabindex value, which would be tabindex=-1, and this makes the navigation elements focusable.
            case 'open':
                this.focusableElements.forEach(element => element.removeAttribute('tabindex'));
                break;
            //Gather all the elements that are not the button and update the tabindex value to -1. This is important because when the burger-root is closed the navigation will not be visible and so therefore the links shouldn't be focusable.
            //The spread operator is needed here because the array filter method will not work on NodeLists. The spread converts the NodeList to an array.
            case 'closed':
                [...this.focusableElements]
                    .filter(
                        element => element.getAttribute('data-element') !== 'burger-menu-trigger'
                    )
                    .forEach(element => element.setAttribute('tabindex', '-1'));
                break;
        }
    }

    //This getter is used by the Resize Observer. The max-width attribute set on the <burger-menu> element will determine if the burger button is displayed or not.
    //This property is read within the connectedCallback method and used each time the window is resized.
    //The '10' indicates the base. It is an argument of the parseInt function.
    get maxWidth() {
        return parseInt(this.getAttribute('max-width') || 9999, 10);
    }

    // ################################
    // FLOW FUNCTIONS #################
    // ################################

    //The code within this is called for each instance of rendering the <burger-menu> element on the page. 
    //This is the function callback that starts everything off.
    //It serves 3 purposes: 1) store the initial HTML markup that is hard-coded within the burger-menu element; 2) run the render method to generate the burger menu html; 3) set up the resize observer which will determine when to display the burger button/trigger.
    connectedCallback() {
        //This is creating a property that is wired up to the current hard-coded markup within the burger-menu element consisting of the primary navigation.
        //This property is utilized within the render method.
        this.initialMarkup = this.innerHTML;

        //This is calling the render method that is declared below.
        this.render();

        //This sets up the 'watcher' for any size changes, which determines whether to display the menu or the button.
        const observer = new ResizeObserver(observedItems => {
            //stores the value of the contentRect property of the first item in the returned array (it's the only item being observed)
            const {contentRect} = observedItems[0];

            //This is wiring up the boolean value to the enabled property of the Proxy object that is wired up to the state property.
            //This value is depenedent on the wrapper element's width in comparison to the value of the max-width attribute set on the burger-menu element. 
            //maxwidth is a getter which reads the value of the max-width attribute set on the burger-menu element
            this.state.enabled = contentRect.width <= this.maxWidth;
        })

        //This activates the watcher and tells it to watch the parent node of the burger-menu element.
        observer.observe(this.parentNode);
    }

    //Note: This render method is not some special method, it is user declared. It could have been called 'giggety' - the name is arbitrary; don't confuse it with React's render().
    render() {
        //sets the innerHTML of the <burger-menu> element. The HTML that is hard written becomes a child of the burger-menu__panel.
        this.innerHTML = `
            <div class="burger-menu" data-element="burger-root">
                <button class="burger-menu__trigger" data-element="burger-menu-trigger" type="button" aria-label="Open menu">
                    <span class="burger-menu__bar" aria-hidden="true"></span>
                </button>
                <div class="burger-menu__panel" data-element="burger-menu-panel">
                    ${this.initialMarkup}
                </div>
            </div>
        `;
        
        this.postRender();
    }

    //This is called within the render method.
    //Declares properties and runs toggle
    postRender() {           
        //Stores rendered elements within properties.

        //This is the child within the burger-menu and it wraps everything.
        this.root = this.querySelector('[data-element="burger-root"]');


        //This is the button
        this.trigger = this.querySelector('[data-element="burger-menu-trigger"]');


        //This is the parent of the navigation
        this.panel = this.querySelector('[data-element="burger-menu-panel"]');


        //Wiring up the focusableElements property to a NodeList of all focusable elements within burger-menu
        this.focusableElements = getFocusableElements(this);

        if (this.trigger && this.panel) {
            
            //Update the State proxy object's status value
            this.toggle();

            //add the event listener to the burger-trigger button
            this.trigger.addEventListener('click', evt => {
                evt.preventDefault();

                //when button is clicked change the state status value, which will then update the state attribute value on the burger-root element
                this.toggle();
            });

            //If an item is focused on and it is not within the burger menu, then State.status is forced to be 'closed'. The usefulness of this is that if the menu was open and an item was tabbed to outside the burger menu, then burger menu would close. 
            document.addEventListener('focusin', () => {
                
                if (!this.contains(document.activeElement)) {
                    this.toggle('closed');
                }
            });
        
            return;
        }

        //if the button and the panel elements are not present, then only the initial markup will be rendered.
        this.innerHTML = this.initialMarkup;
    }

    //This is called within the postRender method
    //This updates the value of the status property of the State object.
    //The initial value of state.status before this method is called the first time is 'open' and this is changed to 'closed' when toggle() is called within render().
    toggle(forcedStatus) {
        if (forcedStatus) {
            if (this.state.status === forcedStatus) {
                return;
            }

            this.state.status = forcedStatus;
        } else {
            this.state.status = this.state.status === 'closed' ? 'open' : 'closed';
        }
    }
}

if ('customElements' in window) {
    customElements.define('burger-menu', BurgerMenu);
}

export default BurgerMenu;