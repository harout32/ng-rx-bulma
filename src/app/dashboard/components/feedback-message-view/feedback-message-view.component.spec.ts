import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMessageViewComponent } from './feedback-message-view.component';

describe('FeedbackMessageViewComponent', () => {
  let component: FeedbackMessageViewComponent;
  let fixture: ComponentFixture<FeedbackMessageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackMessageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
