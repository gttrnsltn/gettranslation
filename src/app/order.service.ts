import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

// declare const Stripe;

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  files : File[] = [];
  fileName!: string;
  from!: string;
  to!: string;
  subject!: string;
  word!: number;
  service!: string;
  price!: string;
  delivery!: string | null;
  total!: number;
  to_arr = [];

  baseUrl: string = ''
  
  constructor(private  http : HttpClient) { }

  setData(service:any) {

    this.service = service
    alert(this.service)
  }

  getAll() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }

    return this.http.get(`https://app.gettranslation.io/en/api/params?agency_id=16`, header)
    .pipe( map ( res => {
      return res
    }))
  }

  getCities(country_id : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }

    return this.http.get(`https://app.gettranslation.io/api/cities?country_id=${country_id}`, header)
    .pipe( map ( res => {
      return res
    }))
  }


  create(task : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`
    });

    return this.http.post(`https://app.gettranslation.io/api/add`, task, header)
    .pipe(map( res => {
      return res
    }))
  }

  payment(form : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }

    return this.http.post(`https://app.gettranslation.io/api/add-payment`, form, header)
    .pipe(map( res => {
      return res
    }))
  }

  upload(form : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }
        
    return this.http.post(`https://app.gettranslation.io/api/upload`, form, header)
    .pipe(map( ( res : any) => {
      return res
    }))
  }

  statistics(file_id : any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer Ki7Tr2dmHj9ucdj2NJXiOtxwGEJhkdJr`)
    }
    
    return this.http.get(`https://app.gettranslation.io/api/file-statistics?file_id=${file_id}&agency_id=16`, header)
    .pipe(map( ( res : any) => {
      return res
    }))
  }



  // getMembership(): Observable<any> {
  //   return of({
  //     id: '',
  //     priceId: 'price_1LhLtVGlCnK6EVFhOTej9ayR',
  //     name: 'Translation services',
  //     price: '€55.00',
  //     features: [
  //       'Up to 5 users',
  //     ],
  //   })
  // }

  // reuestMemberSession(priceId: string) {
  //   this.http.post<ISession>(this.baseUrl + 'api/payments/create-checkout-session', {
  //     priceId: priceId,
  //   }).subscribe((session) => {
  //     this.redirectToCheckout(session.sessionId)
  //   });
  // }

  // redirectToCheckout(sessionId: string) {
  //   const sripe = Stripe('pk_test_51KpmdnGlCnK6EVFhlNQPHsOHFpP5EDSH9oJI2KfxGkXOfFPa5HUnmtptTpmeLgvL3Nnzdh26PQMWFBEa0AdXwrr700mVKq0CS7e');

  //   sripe.redirectToCheckout({
  //     sessionId: sessionId
  //   })
  // }


  // use(lang: any) {
  //  tra
  // }
}
