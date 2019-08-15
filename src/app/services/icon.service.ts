import { Injectable } from '@angular/core';
import { Region } from '../enums/region.enum';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  public getRegionIconUrl(accountRegion: Region): String {
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
        break;
      default:
        urlOfIcon = '';
    }
    return urlOfIcon;
  }
}
