import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  constructor(private  http : HttpClient) { }

  // create(order) {
  //   return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
  //   .pipe(map( (res : FbResponse) => {
  //     return {
  //       ...order,
  //       id: res.name,
  //       date: new Date(order.date)
  //     }
  //   }))
  // }

  getAll() {
    return this.http.get(`https://app.gettranslation.io/api/params?agency_id=16.json`)
    .pipe( map ( res => {
      
    }))
  }
}
