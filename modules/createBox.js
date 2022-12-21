function createBox(content) {
    const box = document.createElement('div');
    box.classList.add('box');

    if (content) {
        box.textContent = content;
    } else {
        box.textContent = "Box"
    };

    return box;
}

export { createBox };