import { CommonModule } from '@angular/common';
import { Component, inject, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

import { TabelComponent } from './tabel/tabel.component';

import { ServerService } from '../services/server.service';

export interface Programare {
  Examen: string;
  Sala: string;
  Data: string;
  Ora: string;
}

export let Table_DATA: Programare[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    TabelComponent
  ]
})
export class DashboardComponent implements OnInit{

  constructor(public server:ServerService){}

  isDataLoaded=false;

  ngOnInit(): void {

    console.log("vlad");
    
    this.getInfo();

  }

  getInfo() {
    this.server.get_tblGED().then((respose: any) => {

      Table_DATA = respose.map((item: Programare) => ({
        ...item,
        Data: parseInt(item.Data.split("T")[0].split("-")[1]).toString()+"/"+parseInt(item.Data.split("T")[0].split("-")[2]).toString()+"/"+item.Data.split("T")[0].split("-")[0],
      }));
      
      this.isDataLoaded=true;
    })    
  }

  sidenav_options =
  {
    bottom: 0,
    fixed: false,
    top: 0,
  };

}
