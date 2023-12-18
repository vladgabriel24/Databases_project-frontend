import { Component } from '@angular/core';
import { TabelComponent } from '../../tabel/tabel.component';

@Component({
  selector: 'app-edit-menu',
  standalone: true,
  imports: [TabelComponent],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css'
})
export class EditMenuComponent {

}
