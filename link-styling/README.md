# Link and Focus Styling

The purpose of this investigation is to gain a better understanding of how link and focus states work and how to style them accordingly.

Currently I am a bit fuzzy on the difference between hovered and active states as well as the difference between how focus and focus-visible works.

I am going to go through this [MDN article on styling links](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links) to aid me in this adventure.

## Notes from MDN Article
First, and I knew about this, but might as well note it, there is an order to how the pseudo classes of links must be styled for the styling to work appropriately.

The order: LVFHA (Love fears hate)
- :link
    - Not really sure why this pseudo class would be used. 
- :visited
- :focus
- :hover
- :active

I am curious where :focus comes in on this. 

From the article I did learn that :hover and :focus are very similar in what they do, but are different in the how. :hover has to do with the mouse/cursor and :focus has to do with the keyboard/tab key.

The :active pseudo class is a momentary styling. It only works when and while the click on the link is active. Release the click and the active state is no longer active.

The :target pseudo class is interesting. Came across it while researching how to keep an active element active. 

The :target pseudo class is used to style the target of links. This is usually used for links within the documents. It doesn't style the link itself. This requires the use of ids on the section of the page that the clicked link links to. 

———————————
I've reached the crux of the matter.

Initially, without using the :focus pseudo element to style a link or a button, the focus outline defaults to the user agent stylesheet supplied by the browser. 

Clicking these links and buttons doesn't leave behind an outline. 

If a link and button is styled with :focus, when that button is clicked, the :focus styling will remain. 

If no outline declaration is specified within the :focus rule, then: 
- the default styling will still be applied.
- the allowed styles will be applied in addition to the default styling.
- when the link or button is clicked the styles will remain until another link or button is click or somewhere else is clicked on the page

:focus-visible styling behaves similarly to the :focus, except that when a link or button is clicked that styling will not remain. 

When both :focus and :focus-visible are applied then: 
- style applied depends on the order of :focus and :focus-visible. The latest one in the cascade will overwrite the other.
- when link or button is tabbed to the :focus-visible is applied (as long as it comes after :focus; see above point)
- when a link or button is clicked, then the :focus styling will remain until the page is clicked elsewhere. 

If an item is focused on, whether styled with :focus or :focus-visible or default browser styling, the focus styling will remain until the screen is clicked or another item is tabbed to. 

It seems that using :focus-visible makes the styling behave like the default styling. Links and buttons when clicked will not have any focus styling applied, but items focused on with the keyboard will.