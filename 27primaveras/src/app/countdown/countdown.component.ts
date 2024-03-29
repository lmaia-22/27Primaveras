import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2  } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.less'
})
export class CountdownComponent implements AfterViewInit {

  @ViewChild('canvas3d') canvas3dRef!: ElementRef<HTMLCanvasElement>;
  splineInstance!: Application;
  splineObject!: Object;
  
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas3dRef.nativeElement;
      this.splineInstance = new Application(canvas);
        this.splineInstance.load('https://prod.spline.design/w8FYwcXj8fLMkVcW/scene.splinecode',
        {
          credentials: 'include',
          mode: 'no-cors',
        })
          .then(() => {
              this.renderer.setStyle(this.canvas3dRef.nativeElement, 'height', `${window.innerHeight}px` )
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
    }
  }

}
