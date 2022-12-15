import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';
import { IpInfoAPI } from "../ip-api/ipapi.service";
import { OrderService } from '../order.service';

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


  //для формы
  email = "";
  name = "";
  message = "";
  file!: File ;
  agree = "";
  request_id = "";

  constructor(
    private datePipe: DatePipe,
    private titleService: Title,  
    private metaTagService: Meta,
    private ipAPI: IpInfoAPI,
    private orderServ: OrderService
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
  }

  
  send() {
  var form = new FormData();
  form.append("agency_id", "16");
  form.append("filial_id", "26");
  form.append("from_language", "Английский");
  form.append("to_language[]", "Английский");
  // form.append("task_type", "7270");
  form.append("reason", this.message);
  form.append("email", this.email);
  form.append("name", this.name);
  form.append("comment", this.message);

  if (this.file != undefined ) {
    form.append("files[]", this.file)
  }

  this.orderServ.create(form).subscribe(res => {
    console.log(res)
    this.request_id = res.toString()
  })

  }

  changeListener($event:any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    this.file = inputValue.files[0];
  }
}
