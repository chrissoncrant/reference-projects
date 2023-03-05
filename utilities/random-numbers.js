// Generate Random Number Between Min and Max
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}