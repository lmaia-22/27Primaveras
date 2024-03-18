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
  @ViewChild('countdown', { static: false }) countdownRef!: ElementRef;
  splineInstance!: Application;
  splineObject!: Object;
  canvasLoaded: boolean = false;
  
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas3dRef.nativeElement;
      this.splineInstance = new Application(canvas);
        this.splineInstance.load('https://prod.spline.design/w8FYwcXj8fLMkVcW/scene.splinecode')
          .then(() => {
            const obj = this.splineInstance.findObjectById('a2731e08-d431-4639-b2e1-a188b2ec85e8');
            if (obj) {
              this.splineObject = obj;
              this.renderer.setStyle(this.canvas3dRef.nativeElement, 'height', `${window.innerHeight}px` )
            }
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
    }
  }

}
