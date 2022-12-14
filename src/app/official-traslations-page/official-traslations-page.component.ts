import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-official-traslations-page',
  templateUrl: './official-traslations-page.component.html',
  styleUrls: ['./official-traslations-page.component.scss']
})
export class OfficialTraslationsPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
