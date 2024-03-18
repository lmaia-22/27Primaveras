import { Routes } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { GuestListComponent } from './guest-list/guest-list.component';
import { VenueComponent } from './venue/venue.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      pathMatch: 'full',
      component: HomeComponent,
    },
    {
      path: 'guest-list',
      pathMatch: 'full',
      component: GuestListComponent,
    },
    {
      path: 'venue',
      pathMatch: 'full',
      component: VenueComponent,
    },
  ];
