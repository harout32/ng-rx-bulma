import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChoosenComponent } from './user-choosen.component';

describe('UserChoosenComponent', () => {
  let component: UserChoosenComponent;
  let fixture: ComponentFixture<UserChoosenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChoosenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChoosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
