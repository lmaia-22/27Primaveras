import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener, Input  } from '@angular/core';
import { CountdownConfig, CountdownModule, CountdownEvent  } from 'ngx-countdown';
import { Application } from '@splinetool/runtime';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CountdownModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.less'
})
export class CountdownComponent implements OnInit, AfterViewInit {

  leftTime!: number;
  config!: CountdownConfig;
  @ViewChild('canvas3d') canvas3dRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('countdown', { static: false }) countdownRef!: ElementRef;
  splineInstance!: Application;
  splineObject!: Object;
  canvasLoaded: boolean = false;
  @Input() headerHeight: number = 0;
  
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.initializeCountdown();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas3dRef.nativeElement;
      this.splineInstance = new Application(canvas);
      if (window.innerWidth < 500 && window.innerHeight < 950) {
        const myVariables = { Time: 'Loading...' };
        this.splineInstance.load('https://prod.spline.design/MfCboj1b8P8qQb-n/scene.splinecode', myVariables)
          .then(() => {
            const obj = this.splineInstance.findObjectById('a2731e08-d431-4639-b2e1-a188b2ec85e8');
            console.log("Aqui", JSON.stringify(obj?.position));
            if (obj) {
              this.splineObject = obj;
              this.updateCountdownPosition(obj.position.x, obj.position.y);
            }
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
      } else {
        this.splineInstance.load('https://prod.spline.design/w8FYwcXj8fLMkVcW/scene.splinecode', {
          credentials: 'include',
          mode: 'no-cors',
        })
          .then(() => {
            const obj = this.splineInstance.findObjectById('a6450dc5-4d27-43ad-837a-c72978938638');
            console.log("Aqui", JSON.stringify(obj?.position));
            if (obj) {
              this.splineObject = obj;
              this.updateCountdownPosition(obj.position.x, obj.position.y);
            }
          })
          .catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
      }
    }
  }

  private initializeCountdown() {
    const targetDate = new Date(Date.UTC(2024, 3, 21, 23, 59, 0)); // 22 April 2024
    const now = new Date();
    this.leftTime = Math.round((targetDate.getTime() - now.getTime()) / 1000);

    this.config = {
      leftTime: this.leftTime,
      formatDate: ({ date }) => {
        let duration = Number(date || 0);
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / 1000 / 60) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        let days = Math.floor(duration / (1000 * 60 * 60 * 24));
        
        let formatted = `${days} days ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formatted;
      },
    };
  }

  updateCountdownPosition(x: number, y: number) {
    if (this.countdownRef && this.countdownRef.nativeElement) {
      this.splineInstance.setVariables({ Time: '' });
      const canvasCenterX = this.canvas3dRef.nativeElement.offsetWidth / 2;
      const canvasCenterY = this.canvas3dRef.nativeElement.offsetHeight / 2;

      // Find the size of the countdown element
      const countdownWidth = this.countdownRef.nativeElement.offsetWidth;
      const countdownHeight = this.countdownRef.nativeElement.offsetHeight;

      console.log(x)
      console.log(y)
      console.log(canvasCenterX)
      console.log(canvasCenterY)
      console.log(countdownWidth)
      console.log(countdownHeight)


      const actualX = canvasCenterX - countdownWidth/2;
      // mais header height/2
      const actualY = canvasCenterY + countdownHeight*2 + 36 ;

      this.renderer.setStyle(this.countdownRef.nativeElement, 'left', `${actualX}px`);
      this.renderer.setStyle(this.countdownRef.nativeElement, 'top', `${actualY}px`);
    } else {
      console.error('Countdown element not available.');
    }
  }

  updateCountdownPosition1(spline: Application, obj: Object) {
    let normalDate = new Date(this.leftTime).toLocaleString('en-GB',{timeZone:'UTC'})
    spline.setVariable('Time', normalDate);
  }

  onEvent(event: CountdownEvent) {
    if (event.action === 'notify' || event.action === 'done') {
      // Assuming you have access to the spline Application instance and the specific object here.
      // You might need to store `spline` and `obj` as component properties if they need to be accessed here.
      this.updateCountdownPosition1(this.splineInstance, this.splineObject);
    }
  }

}
