import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAccountsModalComponent } from './bot-accounts-modal.component';

describe('AccountsModalComponent', () => {
  let component: BotAccountsModalComponent;
  let fixture: ComponentFixture<BotAccountsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BotAccountsModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAccountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
