import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config';
import { QueueType } from 'src/app/enums/queue-type.enum';
import { AiConfig } from 'src/app/enums/ai-config.enum';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss']
})
export class ConfigModalComponent implements OnInit {

  @Input() botId: number;

  configForm: FormGroup;

  config: Config;

  QueueTypes = QueueType;

  AiConfigs = AiConfig;

  queueKeys = Object.keys(QueueType).filter(k => typeof QueueType[k as any] === "number");

  constructor(private configService: ConfigService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.configService.getConfig(this.botId)
      .subscribe(data => this.config = data,
        error => console.log(error),
        () => this.initializeConfigForm());
  }

  private initializeConfigForm() {
    this.configForm = this.formBuilder.group({
      botId: [{ value: this.config.botId, disabled: true }, Validators.required],
      queueType: [this.QueueTypes[this.config.queueType], Validators.required],
      aiConfiguration: [this.AiConfigs[this.config.aiConfig], Validators.required],
      configPath: [this.config.path, Validators.required],
      closeBrowser: [this.config.closeBrowser, Validators.requiredTrue],
      overWriteConfig: [this.config.overwriteConfig, Validators.requiredTrue],
      NoActionTimeout: [this.config.noActionTimeout, Validators.required]
    })
  }

  get form() { return this.configForm.controls; }

  submitForm() {


    if (this.configForm.invalid) {
      return;
    }

    //TODO display toastr with information !
    this.configService.updateConfig(this.config)
      .subscribe(response => console.log(response)
      ), ((error: HttpErrorResponse) =>
        console.log(error.message));
  }
}
