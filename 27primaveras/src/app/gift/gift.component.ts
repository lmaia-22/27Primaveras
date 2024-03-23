import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.less'
})
export class GiftComponent implements AfterViewInit {

  @ViewChild('canvas3d2') canvas3d2Ref!: ElementRef<HTMLCanvasElement>;
  splineInstance!: Application;
  splineObject!: Object;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas3d2Ref.nativeElement;
      this.splineInstance = new Application(canvas);
        this.splineInstance.load('https://prod.spline.design/8pSXywELVcGC3Lq2/scene.splinecode',
        {
          credentials: 'include',
          mode: 'no-cors',
        })
          .then(() => {
            this.renderer.setStyle(this.canvas3d2Ref.nativeElement, 'height', `${window.innerHeight}px` )
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
    }
  }
}