//Practice Problems:
//http://csbin.io/async
//solutions: https://github.com/CodesmithLLC/cs-bin-solutions/blob/master/async.js
function log() {
    console.log('message');
}


//Section 2:
function printHello() {
    console.log('Hello!');
}

function printHello1() {
    console.log('Hello ya ol bloke!');
}

function printHello2() {
    console.log('Hello!!!');
}

//This utilizes the Timer feature of the Web Browser. It requires the duration and the thing to do after that duration has run its course. This facade function only sets the Timer, so technically right after calling it, this line of code is finished and we can move on to the next.

//The timer determines when the callback is added to the callback queue. The order of setTimeout doesn't matter as it is the time that makes the difference in the eventual ordering of the callback added to the queue. If the time is the same, then the ordering in the thread will determine the order at which the functions are added to the callback queue and therefore the call stack. 

//The callbacks in the callback queue will only be added to the call stack when it has been emptied. The Event Loop is what determines when the callack in the queue will be added to call stack.
// setTimeout(printHello1, 1000);
// setTimeout(printHello, 1000);

// setTimeout(printHello2, 500);

// console.log('Do me first!');

// Section 1:
const num = 3;

function multiplyBy2(inputNumber) {
    const result = inputNumber * 2;

    return result;
}

const output = multiplyBy2(num);

//Before we get to this line of code, the value of output had to be assigned first, which means the multiplyBy2 function had to be called and it's code had to run line by line.
const newOutput = multiplyBy2(10);