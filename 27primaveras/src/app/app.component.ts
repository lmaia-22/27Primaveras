import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrimeNGConfig } from 'primeng/api';
import { GuestListComponent } from './guest-list/guest-list.component';
import { VenueComponent } from './venue/venue.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CountdownComponent, HeaderComponent, FooterComponent, GuestListComponent, VenueComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})

export class AppComponent implements OnInit {
  title = '27primaveras';
  
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}