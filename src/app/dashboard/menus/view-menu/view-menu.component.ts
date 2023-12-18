import { Component } from '@angular/core';
import { TabelComponent } from '../../tabel/tabel.component';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [TabelComponent],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.css'
})
export class ViewMenuComponent {

}
