import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { LocationData } from './location.type';

@Injectable({
  providedIn: 'root'
})

export class IpInfoAPI {
    private location = new ReplaySubject<LocationData>();
    private loc_recieved: boolean = false;
    locationData = this.location.asObservable();
    API_PATH: string = "https://ipgeolocation.abstractapi.com/v1/?api_key=";
    // probably needs to be moved on the gettranslation server to hide from user?!
    // then replace this with request to gettranlation server to get the key?
    // can we regenerate different key per session?
    // HOW TO HIDE THE KEY? :)
    PRIVATE_KEY: string = "d1e7e7efdacb44b295dc8102962c2be3";

    constructor(
        private http: HttpClient
    ) { }


    initIpBasedInfo()
    {
        // TODO: Add proper http error handlinga (use observable -> follow intelisense suggestion)
        if (!this.loc_recieved) {
            this.http.get(this.API_PATH + this.PRIVATE_KEY).subscribe((res: any) => {
                console.log(res);
                console.log(this.loc_recieved);
                let data: LocationData = {
                    countryName: res.country,
                    countryCode: res.country_code,
                    lang: res.country_code.toLowerCase(),
                    postalCode: res.postal_code,
                    city: res.city,
                    ip: res.ip_address,
                    timezone: res.timezone.abbreviation
                };
                this.location.next(data);
                this.loc_recieved = true;
            }, error => {
                console.log(error);
            });
        }
    }

};


