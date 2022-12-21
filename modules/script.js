//Note: the 'createBoxes' is a variable name. Becuase the createBoxes.js file that this is imported from is using the 'default' keyword I do not need to use the brackets, as opposed to the import that is occurring within the createBox.js file.
import createBoxes from './createBoxes.js';

const container = document.querySelector('.container');

// function createBoxes(num) {
//     const boxes = [];

//     for (let i = 0; i < num; i++) {
//         if (!(i % 2)) {
//             boxes.push(createBox("punk"));
//         } else {
//             boxes.push(createBox());
//         }
//     }
    
//     return boxes;
// }

console.log(createBoxes(13).forEach(box => {
    container.appendChild(box);
}))





