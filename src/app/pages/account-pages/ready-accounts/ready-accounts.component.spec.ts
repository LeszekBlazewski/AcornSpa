import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyAccountsComponent } from './ready-accounts.component';

describe('ReadyAccountsComponent', () => {
  let component: ReadyAccountsComponent;
  let fixture: ComponentFixture<ReadyAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
