import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Region } from 'src/app/enums/region.enum';

@Component({
  selector: 'app-bot-account-list',
  templateUrl: './bot-account-list.component.html',
  styleUrls: ['./bot-account-list.component.scss']
})
export class BotAccountListComponent implements OnInit {

  @Input() accounts: Account[];

  Regions = Region;

  constructor() { }

  ngOnInit() {
  }

  public getImageUrl(accountRegion: Region): String {
    let urlOfIcon = '//opgg-static.akamaized.net/css3/sprite/images/';
    switch (accountRegion) {
      case Region.Eune:
        urlOfIcon += 'regionFlag-eune.png';
        break;
      case Region.Euw:
        urlOfIcon += 'regionFlag-euw.png';
        break;
      case Region.Na:
        urlOfIcon += 'regionFlag-na.png';
      default:
        urlOfIcon = '';
    }
    return urlOfIcon;
  }

}
