import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { FeedbackMessageViewComponent } from '../feedback-message-view/feedback-message-view.component';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) { }
  ngOnInit() {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.required]
    });
  }
  submit() {
    this.modalService.create(FeedbackMessageViewComponent, { message : this.feedbackForm.value}).subscribe(res => {
      this.feedbackForm.reset();
    });
  }

}
