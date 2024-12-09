//There can be only 1 default export in a script
export default function sayHi() {
    console.log("Hi!");
}

//By using the 'export' keyword, this function is ready to be imported
export function sayBye() {
    console.log("Bye!");
}

// Notice hoe the following function and constant are not exported, yet are used within the saySomething function and so are accessible, due to closures, when used within the script within which they are imported.
function sayCool() {
    console.log("Cool!");
}

const cat = "cat";

//To export this requires using the 'export' keyword and export object at the end.
function saySomething(something) {
    sayCool();
    console.log(cat);
    console.log(something);
}

export { saySomething };
