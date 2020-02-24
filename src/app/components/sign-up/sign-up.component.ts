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
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  signup() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.api.signup('/business/register', this.signupForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }
    );
  }

  back() {
    this.router.navigate(['/login']);
  }
}
