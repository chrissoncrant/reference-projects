# Breadcrumbs

Breadcrumbs are important navigational features of so many websites. People come to expect them and we, as developers, need to meet those expectations.

This is a basic breadcrumb component. It has basic styling and basic functionality as well.

One key feature of this is the slashes that separate the navigation. These utilize pseudo-elements and rotated borders. The purpose of this has to do with accessibility. Screen readers will not voice these components which only serve as visual queues. 

If I were to place a '/' as a value for the content property, then screend readers would read this aloud. That is unnecessary noise.

[See here for more information](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

The JavaScript definitely doesn't do everything it would need to do on an actual website. It is not removing or adding links as it would need to do. This is beyond the scope of this simple reference project... for now.