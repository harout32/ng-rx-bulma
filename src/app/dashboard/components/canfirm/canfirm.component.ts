import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-canfirm',
  templateUrl: './canfirm.component.html',
  styleUrls: ['./canfirm.component.scss']
})
export class CanfirmComponent implements OnInit {
  @Input() message: string;
  @Input() params: {value: string};
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }
  success() {
    this.modalService.close(true);
  }
  cancel() {
    this.modalService.close();
  }
}
