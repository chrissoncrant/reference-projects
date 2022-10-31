//Setting a property on the window object and wiring it up to an empty array.
//This array will contain all the functions that will be used by the handler.
window.subscribers = [];


//Defining a function to be run by the setter trap in the proxy handler.
const logger = (state, oldState) => console.log(`Update Alert! Current: ${JSON.stringify(state)}, Previous: ${JSON.stringify(oldState)}`);

window.subscribers.push(logger);

//Creating a defaultState which defines initial property values of the state object. 
const defaultState = {
    name: 'charlie',
    age: 65
}

const state = new Proxy(
    //This is setting up the target object. It is using a ternary operator. If there is a defaultState object that has already been set up, that will become the target for the proxy object, otherwise and empty object is the target.
    typeof defaultState !== 'undefined' ? defaultState : {}, 
    //This is the handler. This only runs if there is an attempt to change the property value of the state object.
    {
        set(state, key, value) {
            //creating a copy, not a reference, of the state/target object to be compared against.
            const oldState = {...state};

            //update the state object's property value
            state[key] = value;

            //Verify if there is actually a change in the property value that was updated to prevent running unnecessary operations. This could also be added
            if (oldState[key] === state[key]) {
                console.log('No change made.');
                //Truthy value needs to be returned, otherwise a TypeError is thrown by the setter trap.
                return 'No change made.'
            }

            //This is passing both the oldState and new state objects window.subscribers array. Currently there is only one function in the window.subscribers array.
            window.subscribers.forEach(callback => callback(state, oldState));

            //A truthy return value is required for set() methods within Proxy object handlers, otherwise a TypeError will result. 
            return state;
        }

})

state.name = 'charlie';

// console.log(state)