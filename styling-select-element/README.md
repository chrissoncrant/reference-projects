# Styling the Select Element

This is a useful way to style elements. It allows for the functionality of the select element that is already pre-built into the HTML element and thus reliable across browsers, while also allowing for custom styling that will also be reliable across browsers. 

The styling of select elements is notoriously difficult, but this method bypasses this difficulty. 

This component consists of 4 elements:
- wrapper element
- select element
- div element that is used for the presentation.
- pseudo-element for the down chevron symbol.
    - This element can be an icon of some sort; there would be benefits of using an icon instead of using a pseudo-element, but this chevron is styled completely with CSS.

See style.css for notes on the functionality for the rules declarations.

The JavaScript is very straight forward. 

## The Main Features
- Select element is floated on top and made invisible. 
    - It's dimension is directly tied to the wrapper dimension.
    - The wrapper dimension is dependent upon the presentation element (font size and padding)
    - Issues that need to be addressed:
        - Stacking layer issue: the chevron pokes through the select element, despite it being below.
            - Solved by setting pointer-events: none on the presentation div. Due to stacking contexts, this div is setting above the select element in some way and therefore it was distrubing the ability to click. By setting the pointer-events property to none, the click events are able to bypass this layer. 
        - Focus ring is hidden due to the opacity being set to 0 on the select element
            - Issue is solved by utilizing sibling selector to style the presentation element when the select element is hovered and focused.