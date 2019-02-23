import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { ModalService } from '../../modal/modal.service';
import { CanfirmComponent } from '../canfirm/canfirm.component';

@Component({
  selector: 'app-user-choosen',
  templateUrl: './user-choosen.component.html',
  styleUrls: ['./user-choosen.component.scss']
})
export class UserChoosenComponent implements OnInit {
  @Input() user$: Observable<User>;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }
  delete() {
    this.modalService.create(CanfirmComponent, {message: 'confirm.delete'});
  }
}
