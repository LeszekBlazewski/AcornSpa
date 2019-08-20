import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bot } from 'src/app/models/bot';

@Component({
  selector: 'app-bot-add-modal',
  templateUrl: './bot-add-modal.component.html',
  styleUrls: ['./bot-add-modal.component.scss']
})
export class BotAddModalComponent implements OnInit {

  addNewBotForm: FormGroup;

  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addNewBotForm = this.formBuilder.group({
      botId: ['', Validators.required]
    })
  }

  get form() { return this.addNewBotForm.controls; }

  public createNewBot(): void {

    this.submitted = true;

    if (!this.addNewBotForm.valid)
      return;

    const bot: Bot = this.addNewBotForm.value;

    this.activeModal.close(bot);
  }

}
