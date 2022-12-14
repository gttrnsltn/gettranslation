import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-custom-localization-page',
  templateUrl: './custom-localization-page.component.html',
  styleUrls: ['./custom-localization-page.component.scss']
})
export class CustomLocalizationPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
