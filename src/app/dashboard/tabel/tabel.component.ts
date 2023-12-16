import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

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
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // filteredData = this.dataSource.data;

  filters = { position: '', name: '', weight: '', symbol: '' };

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }
}
