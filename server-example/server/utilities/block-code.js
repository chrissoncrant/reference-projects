module.exports = (time) => {
    const start = Date.now();

    while ((Date.now() - start) < time) {}
}