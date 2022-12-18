import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, raceWith } from 'rxjs';
import { OrderService } from '../order.service';
import { routingAnimation } from '../shared/animation/routing-animation';

import { IpInfoAPI } from "../rest/ipinfo/ipapi.service";
import { CurrencyAPI } from "../rest/currencyinfo/currency.service"

interface IOrder {
  name: string;
  value: boolean;
}

@Component({
  animations: [routingAnimation],
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  closeDropdown = false;
  valueCheckbox: any = "Choose a language...";
  arrowCheckbox = false;

  Order: IOrder[] = [];

  formOrder!: FormGroup;


  loading = false
  loaded = false
  upload_mod_status = "";
  file!: File
  files  : File[] = [];
  fileCount!: number 
  fileCountStr!: string
  mod_date!: string | null;
  mod_type = "CET";
  mod_time = "18:00";
  delivery = "Auto (Best price)"
  delivery_mod = "Auto (best price)";

  to_arr = [];

  quote = true

  upload_mod = false
  date_mod = false


  submitted = false
  detail1 = false
  detail2 = false
  detail3 = false

  word = 1000;
  subject = 'General';
  to = 'German'
  from = 'English (USA)'
  timezone = "CET";
  currency = "EUR"
  eur_exch_rate: number = 1;
  price1!: number;
  price2!: number;
  price3!: number;

  date1n!: number;
  date2n!: number;
  date3n!: number;

  today =  new Date();
  date1 =  new Date();
  date2 =  new Date();
  date3 =  new Date();

  date1s!: string | null;
  date2s!: string | null;
  date3s!: string | null;
  todays!: string | null;

  languages_code_list = []
  specializations_code_list = []

  btn_text = 'Show prices'
  public fileString :any;

  constructor(
    private datePipe: DatePipe,
    public orderServ: OrderService,
    private router: Router,
    private titleService: Title,  
    private metaTagService: Meta ,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ipAPI: IpInfoAPI,
    private currencyAPI: CurrencyAPI
  ) { 
    this.fileString;

    this.formOrder = this.fb.group({
      country: this.fb.array([])
    });
  }

  ngOnInit(): void {
    //Получение списка значений языка
    this.orderServ.getAll().subscribe((value : any) => {
      console.log(value)
      this.languages_code_list = Object.values(value.languages)
      this.specializations_code_list = Object.values(value.specializations)
    });

    this.titleService.setTitle("Professional translations in a few clicks");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'The easy way to get your documents translated fast. Save time & money, request your free immediate online quote for any language combination.' },  
      { name: 'keywords', content: 'The easy way to get your documents translated fast. Save time & money, request your free immediate online quote for any language combination.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]); 


    this.today = new Date(this.today.getTime());
    this.todays = this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.mod_date = this.todays;



    this.orderServ.fileName = ""
    let route = '';
    this.quote = true;
    route = this.activeRoute.snapshot.url[0].path
    if (route == 'quote') {
      this.quote = true;
    }
    else {
      this.quote = false;
    }

    this.ipAPI.locationData.subscribe((value) => {
      this.timezone = value.timezone;
      this.currencyAPI.getEURLiveRates(value.currency);
    });



  }

  submitLoad() {
    this.submitted = false;
    this.loading = true
    window.scrollTo(0, 200)
    setTimeout(() => {  this.loading = false; this.submit(); }, 1500);



  }
  submit() {
    this.currencyAPI.currencyData.subscribe((value) => {
      this.eur_exch_rate = value.euro_exch_rate;
      this.currency = value.currency_code;
    })
    this.submitted = true;
    this.btn_text = 'Update prices';


    if (this.word < 250) {
      this.word = 250
    }

    this.price1 = Math.round((Math.floor(this.word * 0.17 * 100) / 100)/this.eur_exch_rate)
    this.price2 = Math.round((Math.floor(this.word * 0.12 * 100) / 100)/this.eur_exch_rate)
    this.price3 = Math.round((Math.floor(this.word * 0.04 * 100) / 100)/this.eur_exch_rate)
    console.log("Exchange rate: " + this.eur_exch_rate);


    this.date1n = Math.round(this.word / 10000 ) - 1;
    this.date2n = Math.round(this.word / 10000 ) - 1;
    this.date3n = Math.round(this.word / 10000 ) - 1;

    
    var today = new Date();
    this.date1.setDate(today.getDate()+this.date1n);
    this.date2.setDate(today.getDate()+this.date2n);
    this.date3.setDate(today.getDate()+this.date3n);
 
    this.date1s = this.datePipe.transform(this.date1,'EEE d MMM h:mm a');
    this.date2s = this.datePipe.transform(this.date2,'EEE d MMM h:mm a');
    this.date3s = this.datePipe.transform(this.date3,'EEE d MMM h:mm a');
    // this.date1.
    window.scrollTo(0, 650)

 
    

    //, { 
    
    //   behavior: 'smooth', // и плавно 
    // });
  }

  more1() {
    this.detail1 = !this.detail1;
  }

  more2() {
    this.detail2 = !this.detail2;
  }

  more3() {
    this.detail3 = !this.detail3;
  }

  order(file:any) {
    if (file == 'Premium') {
      this.orderServ.price = '€0,15 / word'
      this.orderServ.delivery = this.date1s
      this.orderServ.total = this.price1
    }
    else if (file == 'Professional') {
      this.orderServ.price = '€0,10 / word'
      this.orderServ.delivery = this.date2s
      this.orderServ.total = this.price2
    }
    else if (file == 'Basic') {
      this.orderServ.price = '€0,04 / word'
      this.orderServ.delivery = this.date3s
      this.orderServ.total = this.price3
    }
    this.orderServ.service = file
    this.orderServ.word = this.word
    this.orderServ.subject = this.subject
    this.orderServ.from = this.from
    this.orderServ.to = this.to


    this.orderServ.to_arr = this.to_arr;
    console.log(this.to_arr);
    this.router.navigate(['/order']);
  }

  readFile(input: any) {

  }


  changeListener($event:any): void {
    if ( $event.target.files[0].name != "" ) { 
      this.upload_mod_status = "IN_PROCESS"
      this.readThis($event.target);
    }
  }

readThis(inputValue: any): void {

this.file = inputValue.files[0];

let files = []
files.push(this.file)
files.forEach( item => {
  this.files.push(item)
})
this.orderServ.fileName = this.file.name
this.orderServ.files = this.files


var form = new FormData();


let language_id = ""
this.orderServ.getAll().subscribe( (res: any) => {
console.log(res.languages)
let keys = Object.keys(res.languages)

for (var i = 0, l = keys.length; i < l; i++) {
  if (res.languages[keys[i]] == this.from) {
    language_id = keys[i]
  }
}
})

form.append("agency_id", "16");
form.append("language_id", language_id);
form.append("file", this.file);
this.orderServ.upload(form).subscribe( res => {

  if ( res.status == "counted" ) {
    this.word = this.word + res.wordCount
    this.orderServ.word = this.word
    if (this.word == 0) {
      this.upload_mod_status ='ERROR'
    }
    else {
      this.upload_mod_status = "OK"
    }
    this.fileCount = this.files.length
    if (this.fileCount > 1 ) {
      this.orderServ.fileName = this.fileCount + ' files'
      this.fileCountStr = this.fileCount + ' files'
      this.word = this.word + res.wordCount
      this.orderServ.word = this.word
    }
    else if  (this.fileCount = 1 ) { 
      this.fileCountStr = this.fileCount + ' file'
    }

  }
  else if (res.status == "IN_PROCESS") {

    do {
      this.sleep(2000);
      this.Statistics(res.id)
    } while (this.upload_mod_status != "IN_PROCESS");

    
   
  }
  else {
    this.upload_mod_status = "ERROR"
    this.word = 0
  }
})


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
      this.word = res.wordCount
      if (this.word == 0) {
        this.upload_mod_status ='ERROR'
      }
      else {
        this.upload_mod_status = "OK"
      }

      this.fileCount = this.files.length
      if (this.fileCount > 1 ) {
        this.orderServ.fileName = this.fileCount + ' files'
        this.fileCountStr = this.fileCount + ' files'
        this.word = this.word + res.wordCount
        this.orderServ.word = this.word
      }
      else if  (this.fileCount = 1 ) { 
        this.fileCountStr = this.fileCount + ' file'
      }
    }
  })

}

UploudModOpen() {
  this.upload_mod = true;
  window.scrollTo(0, 100)
}

UploudModClose() {
  this.upload_mod = false;
  window.scrollTo(0, 100)
}


DateModOpen() {
  this.date_mod = true;
  window.scrollTo(0, 100)
}

DateModClose() {
  if (this.delivery_mod == 'Delivery guaranteed by') {
    this.delivery = this.mod_date + " " + this.mod_time + " " + this.mod_type
  }
  else {
    this.delivery = 'Auto (best price)'
  }

  this.date_mod = false;
  window.scrollTo(0, 100)
}

onKeydown(event: { key: string; preventDefault: () => void; }) {
  if ( ['0','1','2','3','4','5','6','7','8','9'].includes( event.key ) && this.word >= 1000000 ) {
    event.preventDefault()
    this.word = 1000000
  }

  if ( ( (this.word + "").length > 5 && this.word != 1000000 && this.word != 100000 ) ) {
    event.preventDefault()
    this.word = 1000000
  }
  if( ['+','-','e', '.'].includes( event.key ) ) {
    event.preventDefault()
  }
 
}

deleteFile() {
  this.upload_mod_status = "";
  this.orderServ.fileName = "";
  this.word = 0;
  this.files = [];
}

allModalClose() {
  this.DateModClose();
  this.UploudModClose();
  this.closeDropdown = false;
  this.arrowCheckbox = false;
}


// dropdown to 
onCheckboxChange(e: any) {
  const country: FormArray = this.formOrder.get('country') as FormArray;
  if (e.target.checked) {
    country.push(new FormControl(e.target.value));
    this.to = e.target.value
  } else {
    let i: number = 0;
    country.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        country.removeAt(i);
        return;
      }
      i++;
    });
  }

  if (this.formOrder.value.country.length === 0) {
    this.valueCheckbox = "Choose a place...";
  }
  if (this.formOrder.value.country.length === 1) {
    this.valueCheckbox = this.formOrder.value.country[0];
  }
  if (this.formOrder.value.country.length > 1) {
    this.valueCheckbox = this.formOrder.value.country.length + " languages selected";
  }

  this.to_arr = country.value
}


onSearchInputChange(event: any) {
  if (event.target.value != "") {
    this.languages_code_list = this.languages_code_list.filter((res: any) => {
      return res.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase())
    });
  }
  else if(event.target.value == "") {
    this.ngOnInit();
  }
}

openDropdown() {
  if (this.closeDropdown === false) {
    this.closeDropdown = true;
    this.arrowCheckbox = true;
  }
  else {
    this.closeDropdown = false;
    this.arrowCheckbox = false;
  }
}


}
