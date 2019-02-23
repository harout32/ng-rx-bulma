import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownListComponent } from './user-dropdown-list.component';

describe('UserDropdownListComponent', () => {
  let component: UserDropdownListComponent;
  let fixture: ComponentFixture<UserDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
