//There can be only 1 default export in a script
export default function sayHi() {
	console.log("Hi!");
}

//By using the 'export' keyword, this function is ready to be imported
export function sayBye() {
	console.log("Bye!");
}

//To export this requires using the 'export' keyword and export object at the end.
function saySomething(something) {
	console.log(something);
}

export { saySomething };
