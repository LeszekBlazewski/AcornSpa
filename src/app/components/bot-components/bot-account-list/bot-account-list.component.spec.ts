import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAccountListComponent } from './bot-account-list.component';

describe('BotAccountListComponent', () => {
  let component: BotAccountListComponent;
  let fixture: ComponentFixture<BotAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
