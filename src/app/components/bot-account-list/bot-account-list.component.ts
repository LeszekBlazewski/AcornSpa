import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Region } from 'src/app/enums/region.enum';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-bot-account-list',
  templateUrl: './bot-account-list.component.html',
  styleUrls: ['./bot-account-list.component.scss']
})
export class BotAccountListComponent implements OnInit {

  @Input() accounts: Account[];

  Regions = Region;

  constructor(private iconService: IconService) { }

  ngOnInit() {
  }

  public getRegionIcon(accountRegion: Region): String {
    return this.iconService.getRegionIconUrl(accountRegion);
  }

}
