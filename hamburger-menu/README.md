# Hamurger Menu

Source for this: [Andy Bell's Fully-responsive, progressively enhanced burger menu](https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/)

## Things I am learning:
Navigations need to have aria-labels on them to assist with screen readers (especially if there is more than one navigation element used).

I learned about what a skip link is and how this works with focusing and tabbing; also tabIndex -1 and how that works (????)

Using aria-label="Home Page" for link elements that wrap the header image logo.

Adding aria-label="primary" to the nav element in the site header

Adding role="list" to the unordered list that has its default styling removed.

Utilizing the flow class utility for easily, and consistently adding space.

JavaScript Classes
- These are special functions; essentially they are object factories in ES6 syntax.
- contructor()
- getters
- extending classes; specifically the HTMLElement object (see Custom Elements below)
    - super()

Custom Elements that extend the HTMLElement object.
- lifecycle callbacks - the only one used in this is the connectedCallback.

Proxy Objects
- [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#:~:text=The%20Proxy%20object%20allows%20you,sanitize%20inputs%2C%20and%20so%20on.)

tabindex attribute and its function: when 'tabindex=0' (the default value) that element becomes tabbable/focusable. There are certain elements that are focusable by default, such as inputs and links. When tabindex is set to -1, that element is no longer focusable.

## Thoughts:

What makes this progressively enhanced is that the navigation works, whether JavaScript is enabled or not. 

At its base level it works very well. The navigation is fully responsive and looks good.

If JS is disabled, it does not contain unnecessary markup that would create a less than optimum screen reader experience. 

Only if the JS is enabled will the markup for the burger-menu be added to the DOM. 

This markup comes with necessary screen-reader capabilities. The burger icon is hidden from the screen reader via the aria-hidden attribute. The button utilizes the aria-label to indicat the button functionality. It also utilizes the aria-expanded attribute to indicate the current state of the menu.

The markup also creates smart focusability on the navigation links. It does this by taking advantage of the tabindex=-1 attribute and value. 

By default links are focusable. We want to remove this behavior when the button is enabled (when it is visible) and the menu is not expanded. So when the button is enabled and the menu is closed, the focus is removed from the links so tabbing through the page would move a user from the burger menu button to the next tabbable item within the content of the page.

The other focus feature is that when the button is enabled and the menu is open, when all links are tabbed through and the focus passes through the menu to an item outside the menu, the menu will be forced closed. 