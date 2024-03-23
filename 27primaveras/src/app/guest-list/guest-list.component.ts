import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.less',
})
export class GuestListComponent implements AfterViewInit {

  @ViewChild('canvas3d1') canvas3d1Ref!: ElementRef<HTMLCanvasElement>;
  splineInstance!: Application;
  splineObject!: Object;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas3d1Ref.nativeElement;
      this.splineInstance = new Application(canvas);
        this.splineInstance.load('https://prod.spline.design/l1ugiSEJVFtp3ghG/scene.splinecode',
        {
          credentials: 'include',
          mode: 'no-cors',
        })
          .then(() => {
            this.renderer.setStyle(this.canvas3d1Ref.nativeElement, 'height', `${window.innerHeight}px` )
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
    }
  }
}