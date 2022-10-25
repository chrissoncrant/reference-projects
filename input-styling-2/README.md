# Input Styling

Creating a styled input that has an icon.

Methodology:
- Wrapping everything in a label and this becomes the container.
- The label content/text is wrapped in a span element and then visually hidden. 
- Removed the border styling from the input.
- Icon is set to position absolute and the space it has between it and the placeholder text is established by adding padding-left to the input. The creates an issue where the input will exapnd by the amount of padding, so in order to set the width of the input to be contained by the label we have to use a calc function with 100% minus the padding value.
- Using rem unit for the label container and em units for all the descendants.
- 2 variables: large input and small input. To accomplish this I utilized two special classses and all these change is the label length and the font size set on the label using rem units. This scales everything up quite nciely. The change is simple: two classes are created for large and small and these are added to the label input.