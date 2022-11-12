# Tool Tip Creation

Wrap the word(s) for the tool tip in an anchor tag with the class 'tooltip-container'.

Place the tooltip content within a span element. This span element needs to be a child of the tooltip-container and needs a class name of 'tooltip'.

The reason the tooltip needs to be a child has to due with selecting the element. We want the tooltip to appear when we hover over the tooltip-container. It is easier to select children than it is to select siblings.

Set the tooltip class to be display none, then set a hover pseudo class on the tooltip-container selecting the tooltip child and set the display to block.

This is where absolute positioning comes in.

Without absolute positioning, hovering over the tooltip-container would display the tooltip, but the flow of the content would be disrupted. By setting the tooltip to be absolutely positioned it will not disrupt flow. 

When the tooltip is revealed it will behave as a block element. It will drop to the next line down, to its natural position. In this case it drops down a line and sets itself against the left edge of the parent container. 

Despite the fact that the parent of the tooltip is the tooltip-container, the tooltip-container is an inline element. Inline element cannot have block level children. what occurs here is the tooltip 'breaks' the bounds of its true parent is falls to the bounds of the next highest legitimate parent, which is the paragraph element. 

We do want the tooltip to rest against the edge of its true parent. To accomplish this we must adjust the display property of the tooltip-container to be inline-block. We choose inline-block because we want the tooltip-container to remain within the inline flow, but we want its internal environment to behave like a block. Basically its siblings will treat it as inline, but its children will treat it as a block-level element. This is what we want.

Now we must address the tooltip width. Right now the width is constrained based on the closest ancestor that has a position other than static. Currently this is the viewport.

We want to constrain the tooltip by its true parent. To do this we simply apply position: relative to the tooltip-container class.

This will allow the tooltip to be constrained by the width of its parent, to the best of its abilities. If the tooltip has a word that is longer than the tooltip-container, then this word will become the minimum-width of the tooltip.

To adjust this we can add a different min-width on the tooltip class.

Depending on the size of the paragraph and its width, a tooltip may appear and cover another tooltip-container. When this occurs now, the tooltip-container text will bleed through the tooltip. To fix this we add z-index: 1 to the tooltip. 

Now it's a matter of styling the tooltip to taste. Adding some padding, adjusting the text color, adding a background color to make it opaque, adding a border, etc.

## Additional Method
Using the :target pseudo class can work as well see this [MDN article on the target psuedo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)

