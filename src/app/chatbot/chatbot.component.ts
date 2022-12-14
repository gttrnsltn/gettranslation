import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor() { }

  ngOnInit(): void {
  }

}
