import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-subtitling-page',
  templateUrl: './subtitling-page.component.html',
  styleUrls: ['./subtitling-page.component.scss']
})
export class SubtitlingPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
