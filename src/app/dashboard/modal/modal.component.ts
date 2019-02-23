import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  ComponentFactory
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { UserDropdownListComponent } from '../components';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalBackground') modalBackground: ElementRef;
  @ViewChild('modalContent', { read: ViewContainerRef })
  entry: ViewContainerRef;
  componentRef: ComponentRef<any>;
  modalIsActive = false;
  constructor(private resolver: ComponentFactoryResolver, private modalService: ModalService) { }

  ngOnInit() {
    fromEvent(this.modalBackground.nativeElement, 'click').subscribe(() => {
      this.closeModal();
    });
  }
  ngAfterViewInit() {
    this.modalService.onModalCreated().subscribe(({component, inputs = {}}) => {
      this.entry.clear();
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
      // factory. = inputs;
      this.componentRef = this.entry.createComponent(factory);
      Object.keys(inputs).forEach(input => this.componentRef.instance[input] = inputs[input]);
      this.modalIsActive = true;
    });
  }

  closeModal() {
    this.componentRef.destroy();
    this.modalIsActive = false;
    this.modalService.close(null);
    this.componentRef = null;
  }
}
