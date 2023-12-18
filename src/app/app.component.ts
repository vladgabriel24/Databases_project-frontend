import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './dashboard/dashboard.component.css']
})
export class AppComponent {
  title = 'bd-frontend';
}
