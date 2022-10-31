// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

//Classes are special functions; functions are special objects.
//This is a class declaration
//Classes are not objects in and of themselves, but are templates (actually functions that are object creators) to create object instances. When an object is created using the template/class they automatically inherit all the properties and methods defined in the class declaration/expression
class Human {
    //Private 'field'; this can only be used within the class itself. It cannot be called outside the class
    #ability1 = 'Jumping';

    //This is a public 'field' which behaves similar to a propert and can be accessed outside the class.
    ability2 = 'Singing';
    
    //The variables of the contructor are the properties of the class object/special function; Unlike fields, these property values can be set when an instance of this class is created.
    constructor (height, weight, age, name) {
        this.height = height,
        this.weight = weight,
        this.age = age,
        this.name = name
    }

    //This is a getter. It is a special kind of property. It is not a method. It is called like a property, without need for the (). Using the () will result in an error. 
    get nameAndAge() {
        return `Name: ${this.name}; Age: ${this.age}`
    }

    get gimmeAbility2() {
        return this.ability2;
    }

    //Methods are much easier to declare on the object than they are using the ES5 method
    multAgeAndWeight() {
        return this.age * this.weight;
    }

    getAbility1() {
        return this.#ability1;
    }

    //Method expression
    getHeight = function() {
        return this.height;
    }
}

//This is a class expression
const Animal = class {
    constructor(type, name) {
        this.type = type,
        this.name = name
    }
}

// These are creating instances of the classes; their values are object.
const gary = new Human(`5'9"`, `180`, `45`, `Gary`);

const raja = new Animal('tiger', 'raja', 5);

// console.log(gary);


