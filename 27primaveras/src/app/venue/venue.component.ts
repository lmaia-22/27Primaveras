import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { TabViewModule } from 'primeng/tabview';
import { PhotoService } from '../../services/photoService';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CardModule, GoogleMapsModule, TabViewModule, ImageModule],
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.less',
  providers: [
    PhotoService
  ],
})
export class VenueComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild(GoogleMap, { static: false })
  mapComponent!: GoogleMap;

  options: google.maps.MapOptions = {
    center: {lat:  41.22714075429973, lng: -8.719490692415775},
    zoom: 18,
    mapTypeId: "satellite",
    controlSize: 25,
    scaleControl: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    ]
  };
  mapWidth!: string;
  mapHeight!: string;
  directionsService: any
  directionsRenderer: any

  constructor(private renderer: Renderer2) {}
  
  ngOnInit(): void {
    this.mapWidth = `${window.innerWidth-30}px`;
    this.mapHeight = `${window.innerHeight-145}px`;
  }

  ngAfterViewInit(): void {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.addMarker();
  }

  addMarker(): void {
    const center = this.options.center;
    const markerPosition = { lat: 41.22714075429973, lng: -8.719490692415775 };
    if (this.mapComponent.googleMap && center) {
      this.directionsRenderer.setMap(this.mapComponent.googleMap);
      const marker = new google.maps.Marker({
        position: center,
        map: this.mapComponent.googleMap,
        icon: {
          url: "https://lmaia-22.github.io/27Primaveras/favicon.ico",
          scaledSize: new google.maps.Size(20, 20)
        }
      });
      marker.addListener("click", () => {
        this.calculateAndDisplayRoute(markerPosition);
      });
    }
  }

  calculateAndDisplayRoute(destination: { lat: number; lng: number; }): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        this.directionsService.route(
          {
            origin: currentPosition,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response: any, status: string) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.directionsRenderer.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          }
        );
      }, () => {
        window.alert('Failed to get your location');
      });
    } else {
      // Browser doesn't support Geolocation
      window.alert("Geolocation is not supported by this browser.");
    }
  }

@HostListener('window:resize', ['$event'])
  onResize() {
    this.mapWidth = `${window.innerWidth-30}px`;
    this.mapHeight = `${window.innerHeight-145}px`;
  }

}
