class FancyElement extends HTMLElement {
    constructor() {
        super();
        this.soFancy = 'Yes, so very fancy';
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

        // Create (nested) span elements
        const wrapper = document.createElement("span");
        wrapper.setAttribute("class", "wrapper");
        const icon = wrapper.appendChild(document.createElement("span"));
        icon.setAttribute("class", "icon");
        icon.setAttribute("tabindex", 0);
        // Insert icon from defined attribute or default icon
        const img = icon.appendChild(document.createElement("img"));

        
    }
}

customElements.define('fancy-element', FancyElement);

const tt = document.querySelector('fancy-element')

console.log(tt.shadowRoot)
