import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IpInfoAPI } from "../rest/ipinfo/ipapi.service";

let user_manual_lang = "";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lang = ""
  lang_prev = ""
  lang_browser = navigator.language.split('-')[0];

  constructor(
    public translate: TranslateService,
    private ipAPI: IpInfoAPI
  ) { }

  ngOnInit(): void {
    // TODO: Validate that language is supported
    if (!user_manual_lang) {
      this.ipAPI.locationData.subscribe((value) => {
        if (this.lang_browser) {
          console.log("Setting page locale according to browser lang settings ...");
          this.lang = this.lang_browser;
        } else {
          this.lang = value.lang;
        }
        this.changeLang();
      });
    } else {
      this.lang = user_manual_lang;
    }
  }

  userChangeLang()
  {
    if (this.lang_prev != this.lang ) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
      user_manual_lang = this.lang;
    }
  }

  changeLang() {
    if (!user_manual_lang && this.lang_prev != this.lang) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
    } else {
      this.lang = user_manual_lang;
    }
  }

}
