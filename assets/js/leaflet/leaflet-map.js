import L from 'leaflet'

const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
    <div style="height: 180px;">
        <slot />
    </div>
`

class LeafletMap extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.mapElement = this.shadowRoot.querySelector('div')

        this.map = L.map(this.mapElement).setView([this.getAttribute('lat'), this.getAttribute('lng')], this.getAttribute('zoom'));
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{retina}', {
            retina: '',  // to be extended for detected Retina displays with value '@2x'
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
        ).addTo(this.map);

        this.defaultIcon = L.icon({
            iconUrl: '/images/elixir-icon.png',
            iconSize: [64, 64],
        });
    }

    connectedCallback() {
        const markerElements = this.querySelectorAll('leaflet-marker')
        markerElements.forEach(markerEl => {
            const lat = markerEl.getAttribute('lat')
            const lng = markerEl.getAttribute('lng')
            const leafletMarker = L.marker([lat, lng], { icon: this.defaultIcon }).addTo(this.map);
            leafletMarker.addEventListener('click', (_event) => {
                markerEl.click()
            })

            const iconEl = markerEl.querySelector('leaflet-icon');
            const iconSize = [iconEl.getAttribute('width'), iconEl.getAttribute('height')]

            iconEl.addEventListener('url-updated', (e) => {
                leafletMarker.setIcon(L.icon({
                    iconUrl: e.detail,
                    iconSize: iconSize,
                    iconAnchor: iconSize
                }))
            })
        })
    }
}

window.customElements.define('leaflet-map', LeafletMap);