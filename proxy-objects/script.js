
//This is the 'target', which is Proxy speak for the object that will be wrapped by the Proxy object. This can be a function, class, object, etc.
//Super simple target:
const simpleTarget = {};

//Empty handler. All calls on the proxy object are transparently passed onto the target and the target passes the values through the proxy.
const simpleHandler = {};

let simpleProxy = new Proxy(simpleTarget, simpleHandler);

//This passes the writing of the property to the target object as if the write was called on the object itself. Because there is nothing in the handler there is nothing to do, but pass the write instruction on. 
simpleProxy.testProperty = 'Test 1';

console.log(simpleTarget.testProperty);

//This reading call on the proxy transparently passes through to the object, which then transparently sends the value through the proxy.
console.log(simpleProxy.testProperty);

// ##########################################################
// ##########################################################

// Getting more complicated

const user = {
    firstName: 'Chuck',
    lastName: 'Berry',
    email: 'chuckberry@oldrocker.com'
}

//In the case below, the target parameter will always be the object specified as the target when the Proxy object was declared
const userHandler = {
    //this get method will read the value of the property. It is intercepting all calls to the object
    get(target, property) {
        console.log(`Reading property: ${property}, which returns the value ${target[property]}`)
        return target[property]
    },

    //Any write expressions will be trapped here and go through this. If a truthy value is not returned, then an error will be thrown
    set(target, property, value) {
        console.log(`Setting property: ${property}, with the value: ${value}.`);
        target[property] = value;
        return true;
    }
}

const userProxy = new Proxy(user, userHandler);

//This read expression goes through the get trap within the handler.
console.log(userProxy.firstName);

//Notice the difference here. When the expression doesn't involve the proxy, it is not intercepted.
console.log(user.firstName);


//This is a writing operation; this goes through the setter
userProxy.firstName = 'Dingle';

userProxy.firstName;
