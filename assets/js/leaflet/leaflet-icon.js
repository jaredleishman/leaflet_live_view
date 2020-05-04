class LeafletIcon extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['icon-url']; }

    attributeChangedCallback(_name, _oldValue, newValue) {
        const event = new CustomEvent('url-updated', { detail: newValue });
        this.dispatchEvent(event)
    }
}

window.customElements.define('leaflet-icon', LeafletIcon);