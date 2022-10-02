import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpdialogComponent } from './empdialog/empdialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'crud_Mat';

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getalldetail();
  }

  openDialog() {
    this.dialog.open(EmpdialogComponent, {
      width: '33%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getalldetail();
      }
    })
  }

  getalldetail() {
    this.api.getEmp()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          alert("error while fetching the data");
        }
      })
  }
  editdetail(row: any) {
    this.dialog.open(EmpdialogComponent, {
      width: '33%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getalldetail();
      }
    })
  }

  deletedetail(id: number) {
    this.api.deleteEmp(id)
      .subscribe({
        next: (res) => {
          alert("details deleted successfully");
          this.getalldetail();
        },
        error: () => {
          alert("Something went wrong ")
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
