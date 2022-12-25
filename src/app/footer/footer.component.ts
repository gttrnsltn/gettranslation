import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IpInfoAPI } from "../rest/ipinfo/ipapi.service";
import { CurrencyAPI } from "../rest/currencyinfo/currency.service"
import { ReplaySubject, ValueFromArray } from 'rxjs';

let user_manual_lang = "";
let user_manual_currency = "";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // langauge
  lang = ""
  lang_prev = ""
  lang_browser = navigator.language.split('-')[0]
  langDiv!: any

  // currency
  currency = "EUR"
  currency_list: string[] = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR', 'ARS', 'DZD', 'MAD', 'TWD']

  constructor(
    public translate: TranslateService,
    private ipAPI: IpInfoAPI,
    private currencyAPI: CurrencyAPI,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // TODO: Validate that language is supported
    this.langDiv = this.elementRef.nativeElement.querySelector(".popup_container")
    if (!user_manual_lang) {
      this.ipAPI.locationData.subscribe((value) => {
        this.lang = value.lang
        console.log(this.currency)
        if (!user_manual_currency) {
          this.currency = value.currency;
          console.log(value.currency)
          this.currencyAPI.push_to_user_select(this.currency);
        }
        this.changeLang()
        if (this.lang_browser != this.lang) {
          this.langDiv.style.display = "block"
        }
      });
    } else {
      this.lang = user_manual_lang
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
    if (this.langDiv && this.lang_browser) {
      this.lang = this.lang_browser
      this.changeLang()
      this.langDiv.style.display = "none"
    }
  }

  popLangLeave()
  {
    if (this.langDiv) {
      this.langDiv.style.display = "none";
    }
  }

  changeCurrency()
  {
    user_manual_currency = this.currency;
    this.currencyAPI.push_to_user_select(this.currency)
  }

}
