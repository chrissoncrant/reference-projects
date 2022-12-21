
import { createBox } from './createBox.js';

export default function createBoxes(num) {
    const boxes = [];

    for (let i = 0; i < num; i++) {
        if (!(i % 2)) {
            boxes.push(createBox("punk"));
        } else {
            boxes.push(createBox());
        }
    }
    
    return boxes;
}