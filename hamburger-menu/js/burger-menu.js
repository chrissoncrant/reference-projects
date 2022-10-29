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
        //This property is utilized within the processStateChange and manageFocus methods
        this.state = new Proxy(
            //This is the target object
            {
                status: 'open',
                //The enabled value is updated based on the Resize Observer which is set up within the connectedCallback menthod.
                enabled: false,
            },
            //This is the handler object; the state parameter always refers to the above target object.
            //This is only handling write requests. 
            {
                set(state, key, value) {
                    const oldValue = state[key];

                    state[key] = value;

                    //State change is processed only if the old value is changed. This is important for the Resize Observer. 
                    if (oldValue !== value) {
                        self.processStateChange();
                    }

                    //A truthy value must be returned with setter traps in order to prevent an TypeError from being thrown.
                    return state;
                }
            }
        );
    }

    //This getter is used by the Resize Observer. The max-width attribute set on the <burger-menu> element will determine if the burger button is displayed or not.
    get maxWidth() {
        return parseInt(this.getAttribute('max-width') || 9999, 10);
    }

    //The code within this is called for each instance of rendering the <burger-menu> element on the page. 
    //This is the function callback that starts everything off.
    //It serves 3 purposes: 1) store the initial HTML markup that is hard-coded within the burger-menu element; 2) run the render method to generate the burger menu html; 3) set up the resize observer which will determine when to display the burger button.
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
            //maxwidth is a getter which returns the value of the max-width attribute set on the burger-menu element
            this.state.enabled = contentRect.width <= this.maxWidth;
        })

        //This activates the watcher and tells it to watch the parent node of the burger-menu element
        observer.observe(this.parentNode);
    }

    //This render method is not some special method. It could have been called 'giggety' - the name is arbitrary; don't confuse it with React's render().
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

    postRender() {           
        //Store rendered elements within properties.

        //This is the child within the burger-menu and it wraps everything.
        this.root = this.querySelector('[data-element="burger-root"]');

        //This is the button
        this.trigger = this.querySelector('[data-element="burger-menu-trigger"]');

        //This is the parent of the navigation
        this.panel = this.querySelector('[data-element="burger-menu-panel"]');

        //Wiring up the focusableElements property to a NodeList of all focusable elements
        this.focusableElements = getFocusableElements(this);

        if (this.trigger && this.panel) {
            this.toggle();


            this.trigger.addEventListener('click', evt => {
                evt.preventDefault();

                this.toggle();
            });

            document.addEventListener('focusin', () => {
                if (!this.contains(document.activeElement)) {
                    this.toggle('closed');
                }
            });
        
            return;
        }

        this.innerHTML = this.initialMarkup;
    }

    toggle(forcedStatus) {
        if (forcedStatus) {
            if (this.state.status === forcedStatus) {
                return;
            }

            this.state.status = forcedStatus;
        } else {
            this.state.status = this.state.status === 'closed' ? 'open' : 'closed';
            console.log(this.state.status)
        }
    }

    processStateChange() {
        //sets the 'status' attribute to the value of the status property of the state object, which is the target object of the Proxy wired to this.state. This is a simple read operation and doesn't go through any handler 
        this.root.setAttribute('status', this.state.status);       
        this.root.setAttribute('enabled', this.state.enabled ? 'true' : 'false');

        this.manageFocus();

        //status is either 'open' or 'closed'
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

    manageFocus() {
        
        
        if (!this.state.enabled) {
            this.focusableElements.forEach(element => element.removeAttribute('tabindex'));
            return;
        }

        switch (this.state.status) {
            case 'open':
                this.focusableElements.forEach(element => element.removeAttribute('tabindex'));
                break;
            case 'closed':
                [...this.focusableElements]
                    .filter(
                        element => element.getAttribute('data-element') !== 'burger-menu-trigger'
                    )
                    .forEach(element => element.setAttribute('tabindex', '-1'));
                break;
        }
    }
}

if ('customElements' in window) {
    customElements.define('burger-menu', BurgerMenu);
}

export default BurgerMenu;