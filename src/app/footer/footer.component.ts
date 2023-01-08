import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IpInfoAPI } from "../rest/ipinfo/ipapi.service";
import { CurrencyAPI } from "../rest/currencyinfo/currency.service"
import { CookieService } from '../cookies/cookie.service';

let user_manual_lang = "";
let user_manual_currency = "";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // cookies 
  cookiePopup!: any;
  cookieConsent: boolean = false;
  
  // langauge
  lang = ""
  lang_prev = ""
  lang_browser = navigator.language.split('-')[0]
  langPopup!: any
  ipBasedLangEmoji!: string;

  // currency
  currency = "EUR"
  currency_list: string[] = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR', 'ARS', 'DZD', 'MAD', 'TWD']

  constructor(
    public translate: TranslateService,
    private ipAPI: IpInfoAPI,
    private currencyAPI: CurrencyAPI,
    private elementRef: ElementRef,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    if ("1" == this.cookies.getCookie("CookieConsent")) {
      this.cookieConsent = true
      this.cookiePopup = this.elementRef.nativeElement.querySelector(".cookie_container")
      if (this.cookiePopup) {
        this.cookiePopup.style.display = "none"
      }
    }

    this.langPopup = this.elementRef.nativeElement.querySelector(".popup_container")
    let cookies_lang = this.cookies.getCookie("lang")
    console.log("Language from cookies: " + cookies_lang)
    this.cookies.deleteCookie("lang")
    if (cookies_lang == "") {
      this.ipAPI.locationData.subscribe((value) => {
        // lang autodetect or set user option
        if (!user_manual_lang) {
          // TODO: Validate that language from location API is supported
          this.lang = value.lang
          this.ipBasedLangEmoji = value.countryEmoji
          if (this.lang_browser != this.lang) {
            this.langPopup.style.display = "block"
          }
        } else {
          this.lang = user_manual_lang
        }
        this.changeLang()
        // currency autodetect
        if (!user_manual_currency && this.currency_list.indexOf(value.currency) != -1) {
          this.currency = value.currency;
          this.currencyAPI.push_to_user_select(this.currency);
        }
      });
    } else {
      this.lang = cookies_lang
      this.changeLang()
      this.langPopup.style.display = "none"
    }

    this.currencyAPI.supportedCurrencies.subscribe((value) => {
      if (this.currency_list.length == 1) {
        for (var i = 0; i < value.length; ++i) {
          this.currency_list.push(value[i])
        }
      }
    })

    if (user_manual_currency.length) {
      if (user_manual_currency != this.currency) {
        this.currency = user_manual_currency;
      }
    }

  }

  userChangeLang()
  {
    if (this.lang_prev != this.lang ) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
      user_manual_lang = this.lang
      this.cookies.setCookie("lang", user_manual_lang)
      if (this.langPopup && this.langPopup.style.display == "block") {
        this.langPopup.style.display = "none"
      }
    }
  }

  changeLang()
  {
    if (!user_manual_lang && this.lang_prev != this.lang) {
      this.lang_prev = this.lang
      window.scrollTo(0, 0)
      this.translate.use(this.lang)
    } else {
      this.lang = user_manual_lang
    }
  }

  popLangChange()
  {
    console.log("Switch lang")
    if (this.langPopup && this.lang_browser) {
      this.lang = this.lang_browser
      this.changeLang()
      this.langPopup.style.display = "none"
    }
  }

  popUpLangClose()
  {
    console.log(this.lang)
    this.cookies.setCookie("lang", this.lang)
    if (this.langPopup) {
      this.langPopup.style.display = "none";
    }
  }

  changeCurrency()
  {
    user_manual_currency = this.currency;
    this.currencyAPI.push_to_user_select(this.currency)
  }

  cookiePopupClose()
  {
    this.cookiePopup = this.elementRef.nativeElement.querySelector(".cookie_container")
    if (this.cookieConsent == false) {
      this.cookiePopup.style.display = "none"
      this.cookies.setCookie("CookieConsent", "1")
    }
  }

}
