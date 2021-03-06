import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';

declare let google: any;
let nextUniqueId = 0;

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['google-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoogleMapComponent implements OnChanges {

    @Input() id: string = `google-${nextUniqueId++}`;
    @Input() longitude: number = 0;
    @Input() latitude: number = 0;
    @Input() info = '';
    @Input() infoLabelSize = 10;
    @Input() markerSize = 20;
    @Input() markerIcon = 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png';


    private _map;
    private _mapTag;
    private _infowindow;
    private _marker;
    private _infoLabel;
    private _isInitialized = false;


    get mapId(): string { return `${this.id}-map`; }


    ngOnChanges(changes) {
        if (!this._isInitialized) {
            this.init();
        } else {
            this.update(this.longitude, this.latitude, this.info);
        }
    }

    ngOnInit() {
        this.init();
    }

    init() {
        setTimeout(() => {
            this._mapTag = document.getElementById(this.mapId);
            this._infoLabel = document.getElementById(`${this.mapId}-info`);

            if (!this._mapTag || !this._infoLabel) {
                return;
            }

            const top = (this._mapTag.clientHeight / 2);
            this._infoLabel.style.top = `${top}px`;
            this._infoLabel.style.fontSize = `${this.infoLabelSize}px`;

            this._map = new google.maps.Map(this._mapTag, {
                draggable: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                zoom: 18,
                styles: [{
                    featureType: 'poi.business',
                    stylers: [{ visibility: 'off' }]
                }, {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                }]
            });

            this._marker = new google.maps.Marker({
                map: this._map,
                clickable: false
            });

            this._isInitialized = true;
            this.update(this.longitude, this.latitude, this.info);
        }, 0);
    }

    update(longitude: number, latitude: number, info: string): void {
        if (this._isInitialized) {
            this._marker.setVisible(false);

            if (latitude && longitude) {
                this._showMapElelemts();

                this._updateMap(longitude, latitude);
                this._updateMarker(longitude, latitude);
                this._updateInfowindow(info);
            } else {
                this._hideMapElelemts();
            }
        }
    }

    private _updateMap(longitude: number, latitude: number): void {
        this._map.setCenter({lng: longitude, lat: latitude});
    }

    private _updateMarker(longitude: number, latitude: number): void {
        this._marker.setIcon({
            url: this.markerIcon,
            scaledSize: new google.maps.Size(this.markerSize, this.markerSize),
            origin: new google.maps.Point(0, 0)
        });
        this._marker.setPosition({lng: longitude, lat: latitude});
        this._marker.setVisible(true);
    }

    private _updateInfowindow(info = ''): void {
        this._infoLabel.innerText = info;
    }

    private _showMapElelemts(): void {
        this._infoLabel.style.visibility = 'visible';
        this._mapTag.style.visibility = 'visible';
    }

    private _hideMapElelemts(): void {
        this._infoLabel.style.visibility = 'hidden';
        this._mapTag.style.visibility = 'hidden';
    }
}
