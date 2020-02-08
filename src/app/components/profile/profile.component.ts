import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      street: ['', Validators.required],
      county: ['', Validators.required],
      capacity: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      phone: ['', Validators.required],
    });
    this.getProfile();
  }

  get f() {
    return this.profileForm.controls;
  }

  getProfile() {
    const ID = localStorage.getItem('id');
    this.api.get('/business/' + ID).subscribe(
      res => {
        console.log(res);

        this.profileForm.get('name').setValue(res.name);
        this.profileForm.get('location').setValue(res.location);
        this.profileForm.get('street').setValue(res.street);
        this.profileForm.get('county').setValue(res.county);
        this.profileForm.get('capacity').setValue(res.capacity);
        this.profileForm.get('email').setValue(res.email);
        this.profileForm.get('phone').setValue(res.phone);
      }
    );
  }

  update() {
    const ID = localStorage.getItem('id');
    this.api.patch('/business/' + ID, this.profileForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
