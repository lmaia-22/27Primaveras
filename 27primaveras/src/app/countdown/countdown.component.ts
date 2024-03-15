import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2  } from '@angular/core';
import { CountdownConfig, CountdownModule, CountdownEvent  } from 'ngx-countdown';
import { Application } from '@splinetool/runtime';

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
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeCountdown();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      // Safe to use window here
      const myVariables = { Time: 'Loading...' };
      const canvas = this.canvas3dRef.nativeElement;
      const spline = new Application(canvas);
      spline.load('https://prod.spline.design/w8FYwcXj8fLMkVcW/scene.splinecode', myVariables).then(() => {
            this.canvasLoaded = true;
            const obj = spline.findObjectById('a6450dc5-4d27-43ad-837a-c72978938638'); // Adjust this line based on the actual API
            console.log("Aqui" + obj);
            if (obj) {
              this.splineInstance = spline;
              this.splineObject = obj;
              this.updateCountdownPosition(obj.position.x, obj.position.y);
            }
          }).catch((error) => {
            console.error("Error loading Spline scene:", error);
          });
        }
  }

  private initializeCountdown() {
    const targetDate = new Date(Date.UTC(2024, 3, 22, 23, 59, 0)); // 22 April 2024
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
      this.renderer.setStyle(this.countdownRef.nativeElement, 'left', `${x}px`);
      this.renderer.setStyle(this.countdownRef.nativeElement, 'top', `${y}px`);
    }
  }

  updateCountdownPosition1(spline: Application, obj: Object) {
    spline.setVariable('Time', `${"<countdown [config]='config' (event)='onEvent($event)'></countdown>"}`);
  }



  onEvent(event: CountdownEvent) {
    if (event.action === 'notify' || event.action === 'done') {
      // Assuming you have access to the spline Application instance and the specific object here.
      // You might need to store `spline` and `obj` as component properties if they need to be accessed here.
      this.updateCountdownPosition1(this.splineInstance, this.splineObject);
    }
  }

}
