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
import { fromEvent, Observable, noop } from 'rxjs';
import { ModalService } from './modal.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalBackground') modalBackground: ElementRef;
  @ViewChild('modalContent', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<any>;
  modalIsActive = false;
  backgroundClick$: Observable<HTMLElementEventMap>;
  modalClosed$: Observable<undefined>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.backgroundClick$ = fromEvent(
      this.modalBackground.nativeElement,
      'click'
    );
    this.modalClosed$ = this.modalService.onModalClosed();
  }
  ngAfterViewInit() {
    this.backgroundClick$
      .pipe(
        tap(() => console.log('back, click')),
        tap(() => this.modalService.close(null))
      )
      .subscribe(noop);
    this.modalClosed$.pipe(tap(() => this.closeModal())).subscribe(noop);
    this.modalService
      .onModalCreated()
      .subscribe(({ component, inputs = {} }) => {
        this.entry.clear();
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
        // factory. = inputs;
        this.componentRef = this.entry.createComponent(factory);
        Object.keys(inputs).forEach(
          input => (this.componentRef.instance[input] = inputs[input])
        );
        this.modalIsActive = true;
      });
  }

  closeModal() {
    this.componentRef.destroy();
    this.modalIsActive = false;
    this.componentRef = null;
  }
}
