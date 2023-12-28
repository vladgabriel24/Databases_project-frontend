import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';
import { DeleteDataDialogComponent } from '../delete-data-dialog/delete-data-dialog.component';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';

import { ServerService } from '../../services/server.service';

import { DashboardComponent, Programare, Table_DATA } from '../dashboard.component';

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
    MatDatepickerModule,
    MatNativeDateModule,
    AddDataDialogComponent,
    EditDataDialogComponent,
    MoreInfoDialogComponent,
    DashboardComponent
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  currentMenu!: string;

  displayedColumns: string[] = ['Select', 'Examen', 'Sala', 'Data', 'Ora', 'Actions'];

  dataSource = new MatTableDataSource(Table_DATA);

  selection = new SelectionModel<Programare>(true, []);

  filters = { Examen: '', Sala: '', Data: '', Ora: '' };

  row_actioned:any = {};
  index_row_actioned:number = -1;

  constructor(private dashboard:DashboardComponent,
              private cdr: ChangeDetectorRef,
              public dialog: MatDialog, 
              private route: ActivatedRoute,
              private server: ServerService) { }

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.currentMenu = segments[0].path;
      console.log('Current Menu:', this.currentMenu);
    });

    if (this.currentMenu !== 'edit-menu') {
      this.displayedColumns = ['Examen', 'Sala', 'Data', 'Ora', 'Actions'];
    }

    this.dataSource.data = Table_DATA;
    console.log(this.dataSource.data);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = Table_DATA;
  }

  applyFilter() {
    this.dataSource.data = Table_DATA;

    if (this.filters.Examen !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Examen.toString().includes(this.filters.Examen));
    }

    if (this.filters.Sala !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Sala.includes(this.filters.Sala));
    }

    if (this.filters.Data !== null) {
      console.log(this.filters.Data);

      const parsedDate = new Date(this.filters.Data);

      // Format the date in MM/DD/YYYY format
      const formattedDate = parsedDate.toLocaleDateString([], { year: "numeric", month: "numeric", day: "numeric" });
            
      this.dataSource.data = this.dataSource.data.filter((item) => item.Data.toString().includes(formattedDate));
    }

    if (this.filters.Ora !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Ora.toString().includes(this.filters.Ora));
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

      if(result !== '') {
        let formatedData = result['Data'].split('/')[2]+"-"+result['Data'].split('/')[0]+"-"+result['Data'].split('/')[1];
        result['Data'] = formatedData;
        
        this.server.add_data(result).then(()=>{this.dashboard.getInfo(); this.dataSource.data=Table_DATA});

        setTimeout(() => {this.dataSource.data=Table_DATA}, 200);
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
    this.index_row_actioned = this.dataSource.data.indexOf(this.row_actioned);
    console.log(this.row_actioned);
    console.log(this.index_row_actioned);
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: (JSON.parse(JSON.stringify(this.row_actioned)))
    });

    const closure = dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      console.log(result);

      let formatedData = result['Data'].split('/')[2]+"-"+result['Data'].split('/')[0]+"-"+result['Data'].split('/')[1];
      result['Data'] = formatedData;

      formatedData = this.row_actioned['Data'].split('/')[2]+"-"+this.row_actioned['Data'].split('/')[0]+"-"+this.row_actioned['Data'].split('/')[1];
      this.row_actioned['Data'] = formatedData;

      const APIdata = {
        target:this.row_actioned,
        modifier:result
      };

      this.server.edit_tblGED(APIdata).then((respose: any) => {
        this.dashboard.getInfo();
      })

      setTimeout(() => this.dataSource.data=Table_DATA, 200);

    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.row_actioned
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      
      if(result !== null) {

        let formatedData = result['Data'].split('/')[2]+"-"+result['Data'].split('/')[0]+"-"+result['Data'].split('/')[1];
        result['Data'] = formatedData;

        console.log(result);

        this.server.delete(result).then((respose: any) => {
          this.dashboard.getInfo();
        })
  
        setTimeout(() => {this.dataSource.data=Table_DATA; this.selection.clear()}, 200);
        
      }
    });

  }

  openDelSelDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delsel dialog was closed');

      if(result !== null) {

        result = result.map((item: any) => ({
          ...item,
          Data: item['Data'].split('/')[2]+"-"+item['Data'].split('/')[0]+"-"+item['Data'].split('/')[1],
        }));
  
        const Dates = result.map((item:any) => item.Data);
        const Hours = result.map((item:any) => item.Ora);
        const Class = result.map((item:any) => item.Sala);
        
        const inputAPI = {
          Data: Dates,
          Ora: Hours,
          Sala: Class
        }
  
        console.log(inputAPI);

        this.server.deleteSel(inputAPI).then((respose: any) => {
          this.dashboard.getInfo();
        })
  
        setTimeout(() => {this.dataSource.data=Table_DATA; this.selection.clear()}, 200);
      }
    });

  }

  openMoreInfoDialog(): void {
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '400px',
      data: (JSON.parse(JSON.stringify(this.row_actioned)))
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The more info dialog was closed');
      console.log(result);
    });
  }
}
