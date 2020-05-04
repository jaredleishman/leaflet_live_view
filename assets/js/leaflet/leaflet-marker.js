class LeafletMarker extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }
}

window.customElements.define('leaflet-marker', LeafletMarker);