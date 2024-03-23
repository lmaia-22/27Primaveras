import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { TabViewModule } from 'primeng/tabview';
import { PhotoService } from '../../services/photoService';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CardModule, GoogleMapsModule,TabViewModule, GalleriaModule],
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.less',
  providers: [
    PhotoService
  ],
})
export class VenueComponent {

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 41.22709258765494,
      lng: -8.719402630414645
  };
  zoom = 18;
  images: any[] | undefined;

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
      this.photoService.getRestaurantImages().then((images) => (this.images = images));
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  
  imagesChange(event: any) {
    this.images = event.value; // Or however the new value is accessed from the event
  }

}
