import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpInfoAPI } from "../rest/ipinfo/ipapi.service";
import { CurrencyAPI } from "../rest/currencyinfo/currency.service";
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  href: string = "";
  user_img = false;
  service_hover = false;
  quote = false;
  contact = false;
  login_mod = false;
  service = false;
  showMobileMenu = false;
  serviceMobile = false;


  email= new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  constructor(
    private activeRoute: ActivatedRoute,
    private ipAPI: IpInfoAPI,
    private currencyAPI: CurrencyAPI
  ) { }

  ngOnInit(): void {
    this.ipAPI.initIpBasedInfo();
    //this.currencyAPI.getSupportedCurrencies();
    let route = '';
    this.quote = false;
    this.contact = false;
    route = this.activeRoute.snapshot.url[0].path
    if (route == 'quote') {
      this.quote = true;
      this.contact = false;
    }
    else if (route == 'contact') {
      this.contact = true;
      this.quote = false;
    }
    else {
      this.quote = false;
      this.contact = false;
    }
  }

  onRoute() {
    this.service = false;
    let route = '';
    route = this.activeRoute.snapshot.url[0].path
    if (route == 'quote') {
      this.quote = true;
      this.contact = false;
    }
    else if (route == 'contact') {
      this.contact = true;
      this.quote = false;
    }
    else {
      this.quote = false;
      this.contact = false;
    }
  }

  onLoginMod() {
    this.login_mod = true
    this.service = false
  }

  loginModClose() {
    this.login_mod = false
  }

  showPassword() {
      var type = (document.getElementById("password") as HTMLInputElement).type;

      if (type === "password") {
        (document.getElementById("password") as HTMLInputElement).type = "text";
      } else {
        (document.getElementById("password") as HTMLInputElement).type = "password";
      }
  }

  onService() {
    this.login_mod = false
    if (this.service == false ) {
      this.service = true
    }
    else {
      this.service = false
    }

  }    
  onServiceMobile() {
    this.login_mod = false
    if (this.serviceMobile === false ) {
      this.serviceMobile = true
    }else {
      this.serviceMobile = false
    }
  }
  
  onShowMobileMenu(){
    if (this.showMobileMenu === false ) {
      this.showMobileMenu = true
    }else {
      this.showMobileMenu = false
    }
  }

  allModalClose() {
    this.loginModClose()
    this.service = false
  }

}
