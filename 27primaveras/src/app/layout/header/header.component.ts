import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PanelModule, MenuModule, MenubarModule, TabMenuModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(private router: Router) {}
  
      ngOnInit() {
          this.items = [
              {label: 'Home', icon: 'pi pi-fw pi-home', command:(click)=>{this.router.navigate(['/home'])}},
              {label: 'Guest List', icon: 'pi pi-fw pi-user', command:(click)=>{this.router.navigate(['/guest-list'])}},
              {label: 'Venue', icon: 'pi pi-spin pi-spinner', command:(click)=>{this.router.navigate(['/venue'])}},
          ];
          this.activeItem = this.items[0];
      }
}