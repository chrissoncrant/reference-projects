//Section 2:
function display(data) {
    console.log(data);
}

function printHello() {
    console.log('Hello!');
}

function blockCodeForTimePeriodInMs(time) {
    //Store current time to compare against
    let now = Date.now();

    // console.log(now);

    //Compares the difference between current time and the stored time against the time we want it to run for. 
    while((Date.now() - now) < time) {

    }

    now = Date.now();

    // console.log('done!', now)
}

//after 0ms printHello is added to the Callback Queue by the Web Browser's Timer feature. 
setTimeout(printHello, 1);

const futureData = fetch('https://dog.ceo/api/breeds/image/random');

Promise.resolve(1000).then((duration) => {
    blockCodeForTimePeriodInMs(duration);
    console.log('Microtask queue 1')
})

console.log(futureData);

futureData
    .then(display);

console.log('Me first!');

blockCodeForTimePeriodInMs(1000);

console.log('Me next!');


// ###############################
// Time Flow Example Below
// ###############################

function timeFlowExample() {
    console.log('Start of Macrotask List 1');
    
    setTimeout(() => {
        console.log("Start of Macrotask List 2")
    });
    
    setTimeout(() => {
        console.log("Start of Macrotask List 5")
    }, 1);
    
    Promise.resolve()
        .then(() => console.log("Start of Microtask List 1"))
        .then(() => {
            console.log("Start of second layer of Microtask List 2")
            setTimeout(() => console.log("Start of Macrotask List 3"))
        })
        .then (() => {
            console.log("Start of third layer of Microtask List 2")
        })
    
    const fetchedData = fetch('https://dog.ceo/api/breeds/image/random');
    
    fetchedData
        .then(() => console.log("I would expect this to be in Microtask 1, but it is actually the last thing to print. This tells me that the microtask from the promise is wrapped into a new macrotask list."))
    
    Promise.resolve()
        .then(() => console.log("End of Microtask List 1"))
        .then(() => console.log("End of second layer of Microtask List 1"))
        .then(() => console.log("End of third layer of Microtask List 1"))
    
    console.log('End of Macrotask List 1');
}

// timeFlowExample();


// Section 1:

// async function display(data) {
//     let obj = await data.json();
//     console.log(obj.message); 
// }

//This 'facade' function below is doing 2 things: It is making a network request, which is something JS cannot do in and of itself, and it is returning, into JS territory, an object that we can interact with.

//The object, the Promise Object, that is wired up to the identifier 'futureData' will have 3 properties: value, onFulfilled, onRejection. The 'value' property will be undefined upon the immediate creation of this object. The 'onFulfilled' property is a hidden property tied to what is currently an empty array; these functions are triggered when the 'value' of property is filled in. The onRejection property is an array of functions to run if the Promise is rejected. onFulfilled is related to .then(). onRejection is related to .catch().

//The 'value' property is where the Response Data is added to once the Reponse Object is received in reponse to the Request.

// const futureData = fetch('https://dog.ceo/api/breeds/image/random');

// futureData
//     .then(display)

// futureData
//     .then(data => {
//         //At this point data is a Response object.
//         console.log(data);
//         //By using the .json() function on this Response object we extract the response body from the Readable Stream and convert it from JSON into a JS object.
//         return data.json()
//     })
//     .then(data => {
//         //At this point the JS object with the data is available to use.
//         console.log(data)
//     })

//The futureData identifier has data connected to it. This data is in the form of a Promise object. This object has a method associated with it called '.then()'. It is this method that we pass our callback, which we defined at the start, into.
// futureData.then(display)
