import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IBooking } from './booking';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ID: string;
  booking: any;
  status: string;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.api.getSpecificBooking('/booking/' + this.ID).subscribe(
      res => {
        console.log(res);
        this.booking = res;
        this.status = res.status;
      }
    );
  }

  approve() {
    const statusJSON = JSON.parse(JSON.stringify({status: 'Pending'}));
    console.log(status);
    this.api.updateBooking('/booking/' + this.ID, statusJSON).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  complete() {
    const statusJSON = JSON.parse(JSON.stringify({status: 'Completed'}));
    console.log(status);
    this.api.updateBooking('/booking/' + this.ID, statusJSON).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
