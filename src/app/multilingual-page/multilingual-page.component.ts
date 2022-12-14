import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-multilingual-page',
  templateUrl: './multilingual-page.component.html',
  styleUrls: ['./multilingual-page.component.scss']
})
export class MultilingualPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
