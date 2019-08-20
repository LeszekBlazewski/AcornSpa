import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAddModalComponent } from './bot-add-modal.component';

describe('BotAddModalComponent', () => {
  let component: BotAddModalComponent;
  let fixture: ComponentFixture<BotAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
