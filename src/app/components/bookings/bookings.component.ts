import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

export interface Data {
  date: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'status', 'date', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  businessID: string;
  isLoading = true;
  minDate: Date;
  maxDate: Date;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    const fromDate = new Date(this.filterForm.get('fromDate').value);
    return fromDate;
  }
  get toDate() {
    const toDate = new Date(this.filterForm.get('toDate').value);
    toDate.setDate(toDate.getDate() + 1);
    return toDate;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.businessID = localStorage.getItem('id');
    this.getBookings();
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.date >= this.fromDate && data.date <= this.toDate;
      }
      return true;
    };
  }

  getBookings() {
    this.api.get('/booking/business/' + this.businessID).subscribe(
      res => {
        res.forEach((element: { date: string | number | Date; }) => {
          element.date = new Date(element.date);
        });
        console.log(res);
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

  getRecord(ID: string) {
    console.log(ID);
    const url = `bookings/${ID}`;
    this.router.navigate([url]);
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

}
