import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-web-software-page',
  templateUrl: './web-software-page.component.html',
  styleUrls: ['./web-software-page.component.scss']
})
export class WebSoftwarePageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
