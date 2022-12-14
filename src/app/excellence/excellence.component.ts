import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-excellence',
  templateUrl: './excellence.component.html',
  styleUrls: ['./excellence.component.scss']
})
export class ExcellenceComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Production process");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Accuracy starts with processes. We work hard to make translation services more effective, powering our production processes with great technologies and talented people.' },  
      { name: 'keywords', content: 'Accuracy starts with processes. We work hard to make translation services more effective, powering our production processes with great technologies and talented people.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
  }

}
