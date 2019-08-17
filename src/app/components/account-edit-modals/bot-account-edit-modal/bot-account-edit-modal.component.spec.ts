import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAccountEditModalComponent } from './bot-account-edit-modal.component';

describe('AccountEditModalComponent', () => {
  let component: BotAccountEditModalComponent;
  let fixture: ComponentFixture<BotAccountEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BotAccountEditModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAccountEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
