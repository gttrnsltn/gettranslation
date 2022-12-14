import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
