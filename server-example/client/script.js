const form = document.querySelector('form');
const messageContainers = document.querySelectorAll('.message-container');
const getReqButton = document.querySelector('.getRequest');





// ####################
// UTILITIES
// ####################

function createAndAppendElement(element, content, parent, classes) {
    const el = document.createElement(element);

    el.textContent = content;

    if (classes && Array.isArray(classes)) {
        for (const item of classes) {
            el.classList.add(`${item}`)
        }
    }

    parent.appendChild(el);
}

function typeText(text, element) {
    let index = 0;

    element.textContent = '';

    let typer = setInterval(() => {
        if (index === text.length - 1) {
            clearInterval(typer);
        }
        element.textContent
        += text[index];

        index++;   
    }, 40)
}

function getRandomTime() {
    return 1000 + Math.floor(Math.random() * 4000)
}

let dotInterval;

async function loadingDots(element, interval) {
    if (!interval) {
        interval = 200;
    }

    element.textContent = '';
    
    dotInterval = setInterval(async () => {
        if (element.textContent === '....') {
            element.textContent = '';
        }
        
        element.textContent += ".";

    }, interval);
}





// ####################
// RESPONSE CREATION
// ####################

async function getAndAddResponse() {
    
    const response = await fetch(`http://localhost:5002/wait/${getRandomTime()}`);

    const data = await response.json();

    if (response.ok) {

        clearInterval(dotInterval);
        
        let dots = document.querySelectorAll('.ai')
        
        const latestResponseContainer = dots[dots.length - 1];
        

        typeText(data.value, latestResponseContainer);

        messageContainers[0].scrollTop = messageContainers[0].scrollHeight;

    } else {
        console.error('Error in getting response', response.body);
    }
}

async function createResponse() {
    //create the div
    let dotContainer = document.createElement('div');

    dotContainer.classList.add('ai');
    
    //append it to messages,
    messageContainers[0].appendChild(dotContainer);

    //loading dots for 5 secs
    loadingDots(dotContainer);

    await getAndAddResponse();
}





// ####################
// EVENT LISTENERS
// ####################

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const prompt = data.get('prompt');

    form.reset();

    let response = await fetch('http://localhost:5002', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            value: prompt
        })
    });

    if (response.ok) {
        let data = await response.json();

        console.log('Success:', data.value);

        createAndAppendElement('p', data.value, messageContainers[0], ['user']);

        await createResponse();

        console.log('done typing')

        messageContainers[0].scrollTop = messageContainers[0].scrollHeight;
    } else {
        console.error(response.body);
    }
})

getReqButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5002');

    const data = await response.json();

    console.log(data);

    createAndAppendElement('p', data.value, messageContainers[1], ['ai']);

    messageContainers[1].scrollTop = messageContainers[1].scrollHeight;
})