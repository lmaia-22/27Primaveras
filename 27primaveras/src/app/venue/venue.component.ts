import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { TabViewModule } from 'primeng/tabview';
import { PhotoService } from '../../services/photoService';
import { GalleriaModule, Galleria } from 'primeng/galleria';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CardModule, GoogleMapsModule, TabViewModule, GalleriaModule, Galleria],
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.less',
  providers: [
    PhotoService
  ],
})
export class VenueComponent implements OnInit, OnDestroy{

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 41.22709258765494,
      lng: -8.719402630414645
  };
  zoom = 18;
  
  
  images: any[] | undefined;

  showThumbnails: boolean | undefined;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  @ViewChild('galleria') galleria: Galleria | undefined;

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

  constructor(
    private photoService: PhotoService,
    private cd: ChangeDetectorRef) {}

    ngOnInit() {
      this.photoService.getRestaurantImages().then((images) => (this.images = images));
      this.responsiveOptions = [
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
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
      if (this.fullscreen) {
          this.closePreviewFullScreen();
      } else {
          this.openPreviewFullScreen();
      }

      this.cd.detach();
  }

  openPreviewFullScreen() {
      let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      } else if (elem['mozRequestFullScreen']) {
          /* Firefox */
          elem['mozRequestFullScreen']();
      } else if (elem['webkitRequestFullscreen']) {
          /* Chrome, Safari & Opera */
          elem['webkitRequestFullscreen']();
      } else if (elem['msRequestFullscreen']) {
          /* IE/Edge */
          elem['msRequestFullscreen']();
      }
  }

  onFullScreenChange() {
      this.fullscreen = !this.fullscreen;
      this.cd.detectChanges();
      this.cd.reattach();
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // Use type assertion here
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // And here
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // And here
      (document as any).msExitFullscreen();
    }
  }
  

  bindDocumentListeners() {
      this.onFullScreenListener = this.onFullScreenChange.bind(this);
      document.addEventListener('fullscreenchange', this.onFullScreenListener);
      document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
      document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
      document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
      document.removeEventListener('fullscreenchange', this.onFullScreenListener);
      document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
      document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
      document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
      this.onFullScreenListener = null;
  }

  ngOnDestroy() {
      this.unbindDocumentListeners();
  }

  galleriaClass() {
      return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
      return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
