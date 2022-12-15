import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { OrderService } from '../order.service';
import { routingAnimation } from '../shared/animation/routing-animation';

import { IpInfoAPI } from "../ip-api/ipapi.service";
import { VatValidator } from '../ip-api/vatvalidate.service';

// declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  animations: [routingAnimation],
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  type = "";
  email = "";
  reason = "";
  phone_number = "";
  name = "";
  from_language = "";
  request_id = "";
  comment = "";
  address1 = "";
  address2 = "";
  files : File[] = [];
  file!: File ;
  upload_mod_status = "";
  countries_code_list : any;
  specializations_code_list : any;
  languages_code_list : any;
  cities_code_list : any;

  certificate = false;
  total! : number

  btn_text = "Continue";
  order1 = true;
  order2 = false;
  order3 = false;

  //Stripe
  // handler: StripeCheckoutHandler | undefined;
  confirmation: any; 
  loading = false;
  amount = 1

  date!: Date;

  country: string = "";
  city: string = "";
  postalCode: string = "";
  timezone: string = "";
  vatNumber: string = "";

  constructor(
    private ipAPI: IpInfoAPI,
    private vatVal: VatValidator,
    public orderServ: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderServ.getAll().subscribe((value : any) => {
      console.log(value)
      this.countries_code_list = Object.values(value.countries)
      this.languages_code_list = value.languages
      this.specializations_code_list = value.specializations
    });

    this.files = this.orderServ.files;

    console.log(this.files)
    // this.handler = StripeCheckout.configure({
    //   key: 'pk_test_51KpmdnGlCnK6EVFhlNQPHsOHFpP5EDSH9oJI2KfxGkXOfFPa5HUnmtptTpmeLgvL3Nnzdh26PQMWFBEa0AdXwrr700mVKq0CS7',
    //   image: 'some img',
    //   locale: 'auto',
    //   // source: async (source) => {
    //   //   this.loading = true;
    //   //   // const user = await this.orderServ.getUser();
    //   //   // const fun = this.functions.httpsCallable('stripeCreateCharge');
    //   //   // this.confirmation = await fun({ source: source.id, uid: '4242', amount: this.amount}).toPromise();
    //   //   this.loading = false;
    //   // }

    // })

    //
    // this.files = []
    this.total = this.orderServ.total
    this.ipAPI.locationData.subscribe((value) => {
      this.country = value.countryName;
      this.city = value.city;
      this.postalCode = value.postalCode;
      this.timezone = value.timezone;
    });

  }


//   async checkout(e:any) {
//     if (this.handler != undefined) {
//     this.handler.open({
//       name: 'Fireship Store',
//       description: 'description',
//       amount: 1,
//       email: 'test@mail.ru'
//     })
//     e.preventDefault();
//   }
// }

//   @HostListener('window:popstate')
//   onPopstate() {
//     if (this.handler != undefined) {
//     this.handler.close();
//   }
// }

  continue() {
    this.order1 = false; 
    this.order2 = true;
    window.scrollTo(0, 0)
  }

  back() {
    this.order2 = false;
    this.order1 = true; 
  }

  submit() {
    this.order1 = false;
    this.order2 = false;
    this.order3 = true;
    window.scrollTo(0, 0)

    switch (this.orderServ.from) {
      case 'English (USA)':
        this.from_language = "Английский";
        break;
      case 'Mangoes':
      case 'Papayas':
      default:
    }
    
    let task_type_id = "";
    switch (this.orderServ.service) {
      case 'Basic':
        task_type_id = "7270";
        break;
      case 'Professional':
        task_type_id = "7271";
        break;
      case 'Premium':
        task_type_id = "7272";
        break;
      default:
    }
    
  





    // --form 'to_language[]="Английский"' \
    // --form 'country_id="2"' \
    // --form 'city_id="244"' \
    // --form 'specialization_id="10"' \
    // --form 'urgency="50"' \

    // --form 'files[]=@"/path_to_file_one.ext"' \
    // --form 'files[]=@"/path_to_file_two.ext"'
   
    var form = new FormData();
    form.append("agency_id", "16");
    form.append("filial_id", "26");
    form.append("client_type", this.type);
    form.append("email", this.email);
    form.append("phone_number", this.phone_number);
    form.append("name", this.name);
    form.append("task_type_id", task_type_id);
    // form.append("to_language", "Английский");
    form.append("from_language", this.from_language);

    let address = this.address1 + this.address2;
    form.append("address", address);

    form.append("files[]", this.file);







    console.log(this.file)
//    this.files.forEach((item) => form.append("files[]", item))
    // form.append("files[]", this.files.toString());
  
 
    // form.append("files[]", this.files);


    // this.orderServ.create(form).subscribe( res => {
    //   console.log(res)
    //   this.request_id = res.toString()
    // })
  }

  cetificate() {
    
    if (this.certificate == true) {
      this.orderServ.total = this.total
    }
    else {
      if ( this.orderServ.total < 500 || this.orderServ.total == 500 ) {
        this.orderServ.total = this.orderServ.total + 15
      }
      else if ( this.orderServ.total > 500 ) {
        this.orderServ.total = this.orderServ.total + this.orderServ.total * 0.03
      }
    }

  }

  pay() {
    var form = new FormData();
    form.append("agency_id", "16");
    form.append("payment_method_id", "35");
    form.append("amount", this.orderServ.total.toString());
    form.append("currency_id", "3");
    form.append("request_id", this.request_id);
    form.append("comment", this.comment);

    this.orderServ.payment(form).subscribe( res => {
      console.log(res)
    })
  }


  changeListener($event:any): void {
    this.upload_mod_status = "IN_PROCESS"
    this.readThis($event.target);
  }

readThis(inputValue: any): void {
this.file = inputValue.files[0];
if ( this.file.name != '' ) {
  this.files.push(this.file)
}

this.orderServ.fileName = this.file.name

var form = new FormData();
form.append("agency_id", "16");
form.append("language_id", "Английский");
form.append("file", this.file);

this.orderServ.upload(form).subscribe( res => {
  console.log(res)
  if ( res.status == "counted" ) {
    this.orderServ.word = res.wordCount
  }
  else {
    this.orderServ.word = 0
  }
})

this.orderServ.upload(form).subscribe( res => {
  if ( res.status == "counted" ) {
    this.orderServ.word = res.wordCount
    this.upload_mod_status = "OK"
  }
  else if (res.status == "IN_PROCESS") {
    do {
      this.sleep(2000);
      this.Statistics(res.id)
    } while (this.upload_mod_status != "IN_PROCESS");
  }
  else {
    this.upload_mod_status = "ERROR"
  }
})

}

deleteFile() {
  this.orderServ.fileName = "";
  this.orderServ.word = 0;
}


sleep(millis:any) {
  var t = (new Date()).getTime();
  var i = 0;
  while (((new Date()).getTime() - t) < millis) {
      i++;
  }
}

Statistics(file_id: any) {
  this.orderServ.statistics(file_id).subscribe( res => { 
    if (res.status == "IN_PROCESS" || res.status =='waiting') {
      this.upload_mod_status = "IN_PROCESS"
    }
    else {
      this.orderServ.word = res.wordCount
      this.upload_mod_status = "OK"
      // this.fileCount = 1
    }
  })

}

onKeydown(event: { key: string; preventDefault: () => void; }) {
  if( ['-','e','.'].includes( event.key ) ) {
    event.preventDefault()
  }
}

submite () {
  this.order1 = false;
  this.order2 = false;
  this.order3 = true;
  window.scrollTo(0, 0)

 
  let task_type_id = ""
  switch (this.orderServ.service) {
    case 'Basic':
      task_type_id = "7270";
      break;
    case 'Professional':
      task_type_id = "7271";
      break;
    case 'Premium':
      task_type_id = "7272";
      break;
    default:
  }


    // --form 'urgency="50"' \

    // --form 'files[]=@"/path_to_file_one.ext"' \
    // --form 'files[]=@"/path_to_file_two.ext"'
  
  let from_id = '';
  for (var key in this.languages_code_list) {
    if (this.orderServ.from == this.languages_code_list[key]) {
      from_id = key
    } 
  }


 
    
  let country_id = '';
  if ( this.country != '' ) {
    country_id = ( this.countries_code_list.indexOf(this.country) + 1).toString();
  }

  let specialization_id = '';
  if ( this.orderServ.subject != '' ) {
    let aSpecializations = Object.values(this.specializations_code_list)
    specialization_id = (aSpecializations.indexOf(this.orderServ.subject) + 27).toString();
  }

  var form = new FormData();

  this.orderServ.to_arr.forEach( (to: any) => {
    for (var key in this.languages_code_list) {
      if ( to == this.languages_code_list[key]) {
        form.append("to_language[]", key);
      }     
    }
  });

  form.append("agency_id", "16");
  form.append("filial_id", "26");
  form.append("reason", this.reason);
  form.append("client_type", this.type);
  form.append("email", this.email);
  form.append("phone_number", this.phone_number);
  form.append("name", this.name);
  form.append("task_type_id[]", task_type_id);
  form.append("from_language", from_id);
  console.log(task_type_id)

  let address = this.address1 + this.address2;
  form.append("address", address);
  form.append("country_id", country_id);
  form.append("specialization_id", specialization_id);
  form.append("comment", this.comment);

  if (this.files != undefined ) {
    this.files.forEach((item) => form.append("files[]", item))
  }
  //form.append("files[]", this.file);


  // let city_id = ""
  // this.orderServ.getCities(country_id).subscribe( res  => {
  //   this.cities_code_list = Object.values(res)
  //   let keys = Object.keys(res)
  //   for (var i = 0, l = keys.length; i < l; i++) {
  //     if (i = this.cities_code_list.indexOf(this.city)) {
  //       city_id = keys[i]
  //     }
  //   // obj[keys[i]] - а это свойство, доступное по этому ключу
  //   }
  // })
  // form.append("city_id", city_id);


  this.files = this.orderServ.files;
  console.log(this.files)
  //    this.files.forEach((item) => form.append("files[]", item))
  // form.append("files[]", this.files.toString());


  // form.append("files[]", this.files);
  this.vatVal.validateVat(this.vatNumber);

  console.log(form)
  this.orderServ.create(form).subscribe(res => {
    console.log(res)
    this.request_id = res.toString()
  })
}

getCities() {
  let country_id = '';
  if ( this.country != '' ) {
    country_id = ( this.countries_code_list.indexOf(this.country) + 1).toString();
  }

  this.orderServ.getCities(country_id).subscribe(res => {
    this.cities_code_list = Object.values(res)
  })
}

}
