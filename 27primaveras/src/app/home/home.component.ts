import { Component } from '@angular/core';
import { CountdownComponent } from "../countdown/countdown.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.less',
    imports: [CountdownComponent]
})
export class HomeComponent {

}
