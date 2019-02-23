import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanfirmComponent } from './canfirm.component';

describe('CanfirmComponent', () => {
  let component: CanfirmComponent;
  let fixture: ComponentFixture<CanfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
