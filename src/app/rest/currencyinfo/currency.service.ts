import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { CurrencyData } from './currency.type';

@Injectable({
  providedIn: 'root'
})


export class CurrencyAPI {
    private eur_currency_rate = new ReplaySubject<CurrencyData>();
    currencyData = this.eur_currency_rate.asObservable();
    API_PATH: string = "https://exchange-rates.abstractapi.com/v1/";
    // probably needs to be moved on the gettranslation server to hide from user?!
    // then replace this with request to gettranlation server to get the key?
    // can we regenerate different key per session?
    // HOW TO HIDE THE KEY? :)
    PRIVATE_KEY: string = "19c8ab941b224bf8a9836cf9021c290b";

    constructor (
        private http: HttpClient
    ) { }

    getEURLiveRates(currency: string)
    {
        if (currency) {
            console.log("Currency detected: " + currency);
            let url = this.API_PATH + "live?api_key=" + this.PRIVATE_KEY + "&base=" + currency;
            this.http.get(url).subscribe((res: any) => {
                let currencyData: CurrencyData = {
                    euro_exch_rate: res.exchange_rates.EUR, 
                    currency_code: currency
                }
                this.eur_currency_rate.next(currencyData);
            }, error => {
                console.log(error);
            });
        }
    }


};

