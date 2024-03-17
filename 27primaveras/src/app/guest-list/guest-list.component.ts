import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';
import { Guests } from '../../domain/guests';
import { Application } from '@splinetool/runtime';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [AvatarModule, CarouselModule],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.less',
})
export class GuestListComponent implements OnInit, AfterViewInit {

  guests: Guests[] = []; 
  @ViewChild('canvas3d1') canvas3dRef!: ElementRef<HTMLCanvasElement>;
  spline!: Application;

  constructor() {}
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const canvas = this.canvas3dRef.nativeElement;
      this.spline = new Application(canvas);
      this.spline.load('https://prod.spline.design/l1ugiSEJVFtp3ghG/scene.splinecode',
      {
        credentials: 'include',
        mode: 'no-cors',
      }).catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
      }
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.spline) {
      this.spline.dispose();
      this.loadSpline(); 
    }
  }

  loadSpline() {
    if (typeof window !== 'undefined') {
      const canvas = this.canvas3dRef.nativeElement;
      this.spline = new Application(canvas);
      this.spline.load('https://prod.spline.design/M2g0Uw-eWEy6t5hn/scene.splinecode',
        {
          credentials: 'include',
          mode: 'no-cors',
        }).catch((error) => {
          console.error("Error loading Spline scene:", error);
        });
     }
  }
}