import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})

export class AppComponent implements OnInit {
  title = '27primaveras';
  

  ngOnInit() {
  }

}