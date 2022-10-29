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