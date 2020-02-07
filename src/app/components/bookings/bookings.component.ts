import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'date', 'action'];
  dataSource = new MatTableDataSource();
  businessID: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.businessID = localStorage.getItem('id');

    this.api.get('/booking/' + this.businessID).subscribe(
      res => {
        this.dataSource.data = res;
      }
    );
  }

  getRecord(ID: string) {
    console.log(ID);
    const url = `bookings/${ID}`;
    this.router.navigate([url]);
  }

}
