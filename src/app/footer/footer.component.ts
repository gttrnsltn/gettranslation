import { Component, ElementRef, OnInit } from '@angular/core';
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
  lang_browser = navigator.language.split('-')[0]
  langDiv!: any

  constructor(
    public translate: TranslateService,
    private ipAPI: IpInfoAPI,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // TODO: Validate that language is supported
    this.langDiv = this.elementRef.nativeElement.querySelector(".popup_container")
    if (!user_manual_lang) {
      this.ipAPI.locationData.subscribe((value) => {
        this.lang = value.lang
        this.changeLang()
        if (this.lang_browser != this.lang) {
          console.log("Show lang pop up!")
          this.langDiv.style.display = "block"
        }
      });
    } else {
      this.lang = user_manual_lang
    }
  }

  userChangeLang()
  {
    if (this.lang_prev != this.lang ) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
      user_manual_lang = this.lang
    }
  }

  changeLang() {
    if (!user_manual_lang && this.lang_prev != this.lang) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
    } else {
      this.lang = user_manual_lang
    }
  }

  popLangChange() {
    console.log("Switch lang")
    if (this.langDiv && this.lang_browser) {
      this.lang = this.lang_browser
      this.changeLang()
      this.langDiv.style.display = "none"
    }
  }

  popLangLeave() {
    if (this.langDiv) {
      this.langDiv.style.display = "none";
    }
  }

}
