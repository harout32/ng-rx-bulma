import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-feedback-message-view',
  templateUrl: './feedback-message-view.component.html',
  styleUrls: ['./feedback-message-view.component.scss']
})
export class FeedbackMessageViewComponent implements OnInit {
  @Input() message: { name: string; email: string; message: string };
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }
  cancel() {
    this.modalService.close();
  }

}
