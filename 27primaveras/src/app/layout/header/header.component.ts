import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CountdownConfig, CountdownModule  } from 'ngx-countdown';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PanelModule, MenuModule, MenubarModule, TabMenuModule, BadgeModule, CountdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(private router: Router) {}
  leftTime!: number;
  config!: CountdownConfig;
      ngOnInit() {
          this.items = [
              {label: 'Home', icon: 'pi pi-fw pi-home', command:(click)=>{this.router.navigate(['/home'])}},
              {label: 'Guest List', icon: 'pi pi-fw pi-user', command:(click)=>{this.router.navigate(['/guest-list'])}},
              {label: 'Venue', icon: 'pi pi-spin pi-spinner' },
          ];
          this.activeItem;
          this.initializeCountdown();
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
}