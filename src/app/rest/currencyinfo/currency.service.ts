import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { CurrencyData } from './currency.type';

@Injectable({
  providedIn: 'root'
})

export class CurrencyAPI {
    private eur_currency_rate = new ReplaySubject<CurrencyData>()
    private supported_currency_list = new ReplaySubject<string[]>()
    private user_selected_currency = new ReplaySubject<string>()
    currencyData = this.eur_currency_rate.asObservable();
    supportedCurrencies = this.supported_currency_list.asObservable();
    userSelectedCurrency = this.user_selected_currency.asObservable();
    API_PATH: string = "https://exchange-rates.abstractapi.com/v1/";
    // probably needs to be moved on the gettranslation server to hide from user?!
    // then replace this with request to gettranlation server to get the key?
    // can we regenerate different key per session?
    // HOW TO HIDE THE KEY? :)
    PRIVATE_KEY: string = "19c8ab941b224bf8a9836cf9021c290b";

    constructor (
        private http: HttpClient
    ) { }

    getLiveRates(currency: string)
    {
        console.log("Currency detected: " + currency);
        let url = this.API_PATH + "live?api_key=" + this.PRIVATE_KEY + "&base=" + currency;
        console.log(url)
        this.http.get(url).subscribe((res: any) => {
            let currencyData: CurrencyData = {
                euro_exch_rate: res.exchange_rates.EUR,
                currency_code: currency
            }
            this.eur_currency_rate.next(currencyData);
            console.log(res)
        }, error => {
            console.log(error);
        });
    }

    getSupportedCurrencies()
    {
        let url = this.API_PATH + "live?api_key=" + this.PRIVATE_KEY + "&base=EUR";
        this.http.get(url).subscribe((res: any) => {
            let codes_list:string[] = []
            for (let code in res.exchange_rates) {
                codes_list.push(code)
            }
            console.log(codes_list)
            this.supported_currency_list.next(codes_list)
        }, error => {
            console.log(error);
        });
    }

    push_to_user_select(currency: string)
    {
        console.log("Push user selected currency " + currency)
        this.user_selected_currency.next(currency);
    }

};

