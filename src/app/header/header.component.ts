import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpInfoAPI } from "../ip-api/ipapi.service"

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


  email= new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  constructor(
    private activeRoute: ActivatedRoute,
    private ipAPI: IpInfoAPI
  ) { }

  ngOnInit(): void {
    this.ipAPI.initIpBasedInfo();
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

  allModalClose() {
    this.loginModClose()
    this.service = false
  }

}
