import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshAccountsComponent } from './fresh-accounts.component';

describe('AccountsComponent', () => {
  let component: FreshAccountsComponent;
  let fixture: ComponentFixture<FreshAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FreshAccountsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
