import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownItemComponent } from './user-dropdown-item.component';

describe('UserDropdownItemComponent', () => {
  let component: UserDropdownItemComponent;
  let fixture: ComponentFixture<UserDropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDropdownItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
