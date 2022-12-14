import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-google-ads-page',
  templateUrl: './google-ads-page.component.html',
  styleUrls: ['./google-ads-page.component.scss']
})
export class GoogleAdsPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
