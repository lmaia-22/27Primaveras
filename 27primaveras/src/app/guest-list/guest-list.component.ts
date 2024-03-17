import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';
import { Guests } from '../../domain/guests';
import { GuestService } from '../../services/guestService';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [AvatarModule, CarouselModule],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.less',
  providers: [GuestService]
})
export class GuestListComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  guests: Guests[] = []; 

  constructor(private guestService: GuestService) {}

  ngOnInit() {
    this.guestService.getGuestsList().then((guests) => {
        this.guests = guests;
    });

   this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }
}