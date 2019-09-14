import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config';
import { QueueType } from 'src/app/enums/queue-type.enum';
import { AiConfig } from 'src/app/enums/ai-config.enum';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { LevelingModel } from 'src/app/enums/leveling-model.enum';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigModalComponent implements OnInit {

  @Input() inputBotId: number;

  configForm: FormGroup;

  config: Config;

  QueueTypes = QueueType;

  AiConfigs = AiConfig;

  LevelingModels = LevelingModel;

  queueKeys = Object.keys(QueueType).filter(k => typeof QueueType[k as any] === "number");

  aiConfigurationKeys = Object.keys(AiConfig).filter(k => typeof AiConfig[k as any] === "number");

  levelingModelKeys = Object.keys(LevelingModel).filter(k => typeof LevelingModel[k as any] === "number");

  constructor(private configService: ConfigService,
    private notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.configService.getConfig(this.inputBotId)
      .subscribe(data => this.config = data,
        error => { },
        () => this.initializeConfigForm());
  }

  private initializeConfigForm() {
    this.configForm = this.formBuilder.group({
      botId: [this.config.botId, Validators.required],
      queueType: [this.QueueTypes[this.config.queueType], Validators.required],
      aiConfig: [this.AiConfigs[this.config.aiConfig], Validators.required],
      levelingModel: [{ value: this.LevelingModels[this.config.levelingModel], disabled: true }],
      path: [this.config.path, Validators.required],
      closeBrowser: [this.config.closeBrowser],
      overWriteConfig: [this.config.overwriteConfig],
      disableWindowsUpdate: [this.config.disableWindowsUpdate],
      noActionTimeout: [this.config.noActionTimeout, Validators.required],
      desiredLevel: [this.config.desiredLevel, Validators.required]
    })
  }

  get form() { return this.configForm.controls; }

  submitForm() {

    if (this.configForm.invalid) {
      return;
    }

    this.config = this.configForm.getRawValue();

    this.configService.updateConfig(this.config)
      .subscribe(() =>
        this.notificationService.showSuccessToastr('Config has been successfully updated', ''),
        (error: HttpErrorResponse) =>
          this.notificationService.showErrorToastr(error.toString(), 'Whoop !'));

    this.activeModal.close();
  }
}
