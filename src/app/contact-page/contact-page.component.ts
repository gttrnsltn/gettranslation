import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';
import { IpInfoAPI } from "../ip-api/ipapi.service";

@Component({
  animations: [routingAnimation],
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  date1 =  new Date();
  date1s! : string | null;
  timezone: string = "";
  
  constructor(
    private datePipe: DatePipe,
    private titleService: Title,  
    private metaTagService: Meta,
    private ipAPI: IpInfoAPI
  ) { }

  ngOnInit(): void {
    this.ipAPI.locationData.subscribe((value) => {
      this.timezone = value.timezone;
    });

    this.titleService.setTitle("Find out more about our services");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Speak to one of our account managers to find a solution to your translation needs.' },  
      { name: 'keywords', content: 'Speak to one of our account managers to find a solution to your translation needs.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
    var today = new Date();
    var tomorrow = new Date(today.getTime()+1000*60*30);

//     let date = this.datePipe.transform(tomorrow,'a');
// alert( date)
// debugger;
// console.log(tomorrow.getHours())
// console.log(tomorrow.getMinutes())
// console.log( this.datePipe.transform(tomorrow,'a'))

    if ( ((((today.getHours() == 17  && today.getMinutes() > 30) || today.getHours() > 18 ) &&  this.datePipe.transform(today,'a') === 'PM') 
    || (today.getHours() < 9 &&  this.datePipe.transform(today,'a') === 'AM' ) && this.datePipe.transform(today,'EEEEEE') != 'Su')
    ) {
      tomorrow.setHours(9, 30);
      tomorrow.setDate(today.getDate() + 1)
      this.date1s = this.datePipe.transform(tomorrow,'h:mm a');

      if (today.getHours() >= 0 && today.getHours() <= 9 ) {
        this.date1s = 'today at ' + this.date1s
      }
      else {
        this.date1s = 'tomorrow at ' + this.date1s
      }

    } 
    else if ( (((today.getHours() == 17  && today.getMinutes() > 30) || today.getHours() > 18) && this.datePipe.transform(today,'EEEEEE') === 'Fr') || this.datePipe.transform(today,'EEEEEE') === 'Su' || this.datePipe.transform(today,'EEEEEE') === 'Sa' ) {
      tomorrow.setHours(9, 30);
      this.date1s = this.datePipe.transform(tomorrow,'h:mm a');
      this.date1s = 'monday at ' + this.date1s
    }
    else  {
      this.date1s = this.datePipe.transform(tomorrow,'h:mm a');
      this.date1s = 'today at ' + this.date1s
    }
//    

// // создаем новый объект `Date`
// var today = new Date();
 
// // получаем время в локали en-US
// var now = today.toLocaleTimeString('en-US');
// now = now.slice(0,4);
// alert(now);

// today.getMinutes()
// if ( today.getMinutes() ) {

// } 
//     this.date1.setTime(today.getDate()+ 30 );

//     this.date1s = this.datePipe.transform(this.date1,'h:mm a');
  }

}
