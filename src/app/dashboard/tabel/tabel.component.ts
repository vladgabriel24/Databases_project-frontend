import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';
import { DeleteDataDialogComponent } from '../delete-data-dialog/delete-data-dialog.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export let ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-tabel',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    AddDataDialogComponent,
    EditDataDialogComponent
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  currentMenu!: string;

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'actions'];

  /*
    Aici la dataSource, vom avea un API call care ne va intoarce tabelul final
    pe care vrem sa il vizionam in aplicatie
  */
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  filters = { position: '', name: '', weight: '', symbol: '' };

  row_actioned:any = {};

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.currentMenu = segments[0].path;
      console.log('Current Menu:', this.currentMenu);
    });

    if (this.currentMenu !== 'edit-menu') {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.data = ELEMENT_DATA;

    if (this.filters.position !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.position.toString().includes(this.filters.position));
    }

    if (this.filters.name !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.name.includes(this.filters.name));
    }

    if (this.filters.weight !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.weight.toString().includes(this.filters.weight));
    }

    if (this.filters.symbol !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.symbol.toString().includes(this.filters.symbol));
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa INSERT in baza de date
      */
      if (result != '') {
        this.dataSource.data = [...this.dataSource.data, result];
      }

    });
  }

  /*
    Aici practic voi marca cu o variabila ce date am "selectat" (deoarece randurile in tabel vor fi unice), adica in ce rand am apasat butonul de actions
    pe baza acestor date fac comparatie in baza de date si pot sterge/edita tuplul respectiv.

    M-am bazat pe faptul ca nu putem apasa butonul de actions si apoi da edit/delete la alt rand.
    Este imposibil dpdv al UI.
  */
  actionOnSpecRow(row:{}) {
    this.row_actioned = row;
    console.log(this.row_actioned);
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: this.row_actioned
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa ALTER in baza de date
      */
      let index = this.dataSource.data.indexOf(this.row_actioned);
      this.dataSource.data[index] = result;

    });

  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.row_actioned
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa DELETE in baza de date
      */
      
      if(result !== null) {
        let index = this.dataSource.data.indexOf(result);
        for(let i=index; i<this.dataSource.data.length-1; i++) {
          this.dataSource.data[i] = this.dataSource.data[i+1];
        }

        this.dataSource.data.pop();
      }

      this.dataSource.data = this.dataSource.data;
      console.log(this.dataSource.data);
    });

  }

  openDelSelDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa DELETE in baza de date
      */

      this.dataSource.data = this.dataSource.data.filter((item) => {
        if(result.indexOf(item) == -1) {
          return true;
        }
        else {
          return false;
        }
      });

      this.selection.clear();
      
      this.dataSource.data = this.dataSource.data;
    });

  }
}
