import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  longitude: number;
  latitude: number;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      street: ['', Validators.required],
      county: ['', Validators.required],
      capacity: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      phone: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getLocation();
  }

  get f() {
    return this.signupForm.controls;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.signupForm.get('longitude').setValue(position.coords.longitude);
      this.signupForm.get('latitude').setValue(position.coords.latitude);
    });
  }

  signup() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.api.signup('/business/register', this.signupForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      }
    );
  }

  back() {
    this.router.navigate(['/login']);
  }
}
