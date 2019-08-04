import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsModalComponent } from './accounts-modal.component';

describe('AccountsModalComponent', () => {
  let component: AccountsModalComponent;
  let fixture: ComponentFixture<AccountsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
