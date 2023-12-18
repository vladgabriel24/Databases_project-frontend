import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import {AddDataDialogComponent} from '../add-data-dialog/add-data-dialog.component'


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
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
    AddDataDialogComponent
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  currentMenu!:string;

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  filters = { position: '', name: '', weight: '', symbol: '' };

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access route information here
    this.route.url.subscribe((segments) => {
      // 'segments' is an array of route segments
      this.currentMenu = segments[0].path;
      console.log('Current Menu:', this.currentMenu);

    });

    if(this.currentMenu !== 'edit-menu') {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter() {

    this.dataSource.data = ELEMENT_DATA;
    
    if (this.filters.position !== "")
    {
      this.dataSource.data = this.dataSource.data.filter((item) => item.position.toString().includes(this.filters.position));
    }

    if (this.filters.name !== "")
    {
      this.dataSource.data = this.dataSource.data.filter((item) => item.name.includes(this.filters.name));
    }

    if (this.filters.weight !== "")
    {
      this.dataSource.data = this.dataSource.data.filter((item) => item.weight.toString().includes(this.filters.weight));
    }

    if (this.filters.symbol !== "")
    {
      this.dataSource.data = this.dataSource.data.filter((item) => item.symbol.toString().includes(this.filters.symbol));
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result != '') {
        this.dataSource.data = [...this.dataSource.data, result];
      }

    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isRowRightClicked(row: any[]){
    console.log("Bau");
  }

  onRowRightClick(event: MouseEvent, row: any[]): void {
    event.preventDefault();

    // Show the context menu at the right-clicked position
    this.contextMenuTrigger.menuData = { row }; // Pass data to the context menu if needed
    this.contextMenuTrigger.openMenu();
  }

  editRow(){
    console.log("Hau");
  }
  
}
