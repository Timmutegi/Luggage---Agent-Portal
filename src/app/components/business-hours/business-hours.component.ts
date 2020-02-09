import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {
  businessHoursForm: FormGroup;
  submitted: boolean;
  businessHours: any;
  state: boolean;
  isLoading = true;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.businessHoursForm = this.formBuilder.group({
      mondayOpen: ['', Validators.required],
      mondayClose: ['', Validators.required],
      tuesdayOpen: ['', Validators.required],
      tuesdayClose: ['', Validators.required],
      wednesdayOpen: ['', Validators.required],
      wednesdayClose: ['', Validators.required],
      thursdayOpen: ['', Validators.required],
      thursdayClose: ['', Validators.required],
      fridayOpen: ['', Validators.required],
      fridayClose: ['', Validators.required],
      saturdayOpen: ['', Validators.required],
      saturdayClose: ['', Validators.required],
      sundayOpen: ['', Validators.required],
      sundayClose: ['', Validators.required],
    });

    this.getBusinessHours();
  }

  get f() {
    return this.businessHoursForm.controls;
  }

  submit() {
    const shopID = localStorage.getItem('id');
    // console.log(this.shop, this.businessHoursForm.get('mondayOpen'));
    const data = {
      shop: shopID,
      hours: [
        {
          monday: {
            open: this.businessHoursForm.get('mondayOpen').value,
            close: this.businessHoursForm.get('mondayClose').value
          },
          tuesday: {
            open: this.businessHoursForm.get('tuesdayOpen').value,
            close: this.businessHoursForm.get('tuesdayClose').value
          },
          wednesday: {
            open: this.businessHoursForm.get('wednesdayOpen').value,
            close: this.businessHoursForm.get('wednesdayClose').value
          },
          thursday: {
            open: this.businessHoursForm.get('thursdayOpen').value,
            close: this.businessHoursForm.get('thursdayClose').value
          },
          friday: {
            open: this.businessHoursForm.get('fridayOpen').value,
            close: this.businessHoursForm.get('fridayClose').value
          },
          saturday: {
            open: this.businessHoursForm.get('saturdayOpen').value,
            close: this.businessHoursForm.get('saturdayClose').value
          },
          sunday: {
            open: this.businessHoursForm.get('sundayOpen').value,
            close: this.businessHoursForm.get('sundayClose').value
          }
        }
      ]
    };

    const dataJSON = JSON.parse(JSON.stringify(data));
    console.log(dataJSON);

    this.api.postHours('/workhours/', dataJSON).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getBusinessHours() {
    const shopID = localStorage.getItem('id');
    console.log(shopID);
    try {
      this.api.get('/workhours/' + shopID).subscribe(res => {
      // console.log(res);

      if (res.length === 1) {
        this.state = true;
      }
      this.isLoading = false;
      this.businessHours = res;

      this.businessHoursForm.get('sundayOpen').setValue(this.businessHours['0'].hours['0'].sunday.open);
      this.businessHoursForm.get('sundayClose').setValue(this.businessHours['0'].hours['0'].sunday.close);
      this.businessHoursForm.get('mondayOpen').setValue(this.businessHours['0'].hours['0'].monday.open);
      this.businessHoursForm.get('mondayClose').setValue(this.businessHours['0'].hours['0'].monday.close);
      this.businessHoursForm.get('tuesdayOpen').setValue(this.businessHours['0'].hours['0'].tuesday.open);
      this.businessHoursForm.get('tuesdayClose').setValue(this.businessHours['0'].hours['0'].tuesday.close);
      this.businessHoursForm.get('wednesdayOpen').setValue(this.businessHours['0'].hours['0'].wednesday.open);
      this.businessHoursForm.get('wednesdayClose').setValue(this.businessHours['0'].hours['0'].wednesday.close);
      this.businessHoursForm.get('thursdayOpen').setValue(this.businessHours['0'].hours['0'].thursday.open);
      this.businessHoursForm.get('thursdayClose').setValue(this.businessHours['0'].hours['0'].thursday.close);
      this.businessHoursForm.get('fridayOpen').setValue(this.businessHours['0'].hours['0'].friday.open);
      this.businessHoursForm.get('fridayClose').setValue(this.businessHours['0'].hours['0'].friday.close);
      this.businessHoursForm.get('saturdayOpen').setValue(this.businessHours['0'].hours['0'].saturday.open);
      this.businessHoursForm.get('saturdayClose').setValue(this.businessHours['0'].hours['0'].saturday.close);
    });

    } catch (err) {

    }
  }

  update() {
    const shopID = localStorage.getItem('id');

    const data = {
       shop: shopID,
       hours: [
         {
           monday: {
             open: this.businessHoursForm.get('mondayOpen').value,
             close: this.businessHoursForm.get('mondayClose').value
           },
           tuesday: {
             open: this.businessHoursForm.get('tuesdayOpen').value,
             close: this.businessHoursForm.get('tuesdayClose').value
           },
           wednesday: {
             open: this.businessHoursForm.get('wednesdayOpen').value,
             close: this.businessHoursForm.get('wednesdayClose').value
           },
           thursday: {
             open: this.businessHoursForm.get('thursdayOpen').value,
             close: this.businessHoursForm.get('thursdayClose').value
           },
           friday: {
             open: this.businessHoursForm.get('fridayOpen').value,
             close: this.businessHoursForm.get('fridayClose').value
           },
           saturday: {
             open: this.businessHoursForm.get('saturdayOpen').value,
             close: this.businessHoursForm.get('saturdayClose').value
           },
           sunday: {
             open: this.businessHoursForm.get('sundayOpen').value,
             close: this.businessHoursForm.get('sundayClose').value
           }
         }
       ]
     };

    const dataJSON = JSON.parse(JSON.stringify(data));
    this.api.patch('/workhours/' + shopID, dataJSON ).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
