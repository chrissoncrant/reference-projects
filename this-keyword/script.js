//Exploring 'this'

//Sources:
// https://www.taniarascia.com/this-bind-call-apply-javascript/

//Within a function:
function globalThis() {
    //In this context, this refers to the global object, which in a browser is the Window object. In Node, it is the Global object.
    console.log(this);
}

globalThis();

//Within an object:
const anObject = {
    property1: 'Hi there!',

    //Here 'this' refers to global object. 
    thisProperty: this,

    thisMethod() {
        //In this context this refers to the method's containing object.
        console.log(this);
    },

    innerObject: {
        property1: 'I am in an object within an object!',

        //Here 'this' also refers to the global object.
        thisProperty: this,

        thisMethod() {
            //In this context this refers to the innerObject object, which is the method's containing object.
            console.log(this);
        }   
    }
}

anObject.thisMethod();

anObject.innerObject.thisMethod();

//Apply and Call Methods

//The function definition connected to the identifier 'globalThis' is usint the 'this' keyword within it's body. By using call() and apply() I am explicitly telling the function what context 'this' should refer to instead. 

//If the 'globalThis' function was not using the 'this' keyword within its body, then doing the below would have no impact. 

//Also, here these two methods are essentially interchangeable. The difference comes when the second argument of each is utilized.
globalThis.call(anObject);

globalThis.apply(anObject.innerObject);


function callMe(name, age, number) {
    console.log('This context:', this);

    console.log(`Hi my name is ${name}, I am ${age}, and my number is ${number}. Call me, maybe?`);
}

callMe('Gary', 47, '555-555-5555');

callMe.call(anObject, 'Tiff', 23, '323-232-2323');
callMe.apply(anObject.innerObject, ['Sally', 34, '917-566-4456']);



