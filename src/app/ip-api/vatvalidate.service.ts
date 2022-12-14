import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VatValidator {
    constructor(
        private http: HttpClient
    ) { }

    API_PATH: string = "https://vat.abstractapi.com/v1/validate/?api_key=";
    
    // TODO think about how to hide the key
    API_KEY: string = "e83e53a738cd4af5a5325f171aadb65d";

    validateVat(vat: string)
    {
        if(vat) {
            this.http.get(this.API_PATH + this.API_KEY + "&vat_number=" + vat).subscribe((res:any) => {
                console.log(res); // think about how to pass 
            });
        }
    }

};
