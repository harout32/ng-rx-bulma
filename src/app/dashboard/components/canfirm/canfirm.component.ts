import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-canfirm',
  templateUrl: './canfirm.component.html',
  styleUrls: ['./canfirm.component.scss']
})
export class CanfirmComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
