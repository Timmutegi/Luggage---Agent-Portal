import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeForm: FormGroup;
  submitted = false;
  clicked = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private notifier: NotificationService) { }

  ngOnInit() {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]]
    });
  }

  get f() {
    return this.subscribeForm.controls;
  }

  subscribe() {
    this.submitted = true;

    if (this.subscribeForm.invalid) {
      return;
    }

    this.clicked = true;

    this.api.post('/subscribe', this.subscribeForm.value).subscribe(
      res => {
        if (res.code === 200) {
          this.submitted = false;
          this.subscribeForm.reset();
          this.notifier.showSuccess('You are now subscribed');
          // this.flashMessage.show('You are now subscribed', {cssClass: 'p-1', timeout: 10000});
          this.clicked = false;
        }
      },
      err => {
        this.clicked = false;
        console.log(err);
        // this.errorHandler.handleError(err);
      }
    );
  }

}
