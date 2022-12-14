import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-translators-page',
  templateUrl: './translators-page.component.html',
  styleUrls: ['./translators-page.component.scss']
})
export class TranslatorsPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Seamless working environment");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Get the chance to work on interesting projects, at your own pace, and deciding your own rate. We provide the technology for free, and support your career with continuous education programs.' },  
      { name: 'keywords', content: 'Get the chance to work on interesting projects, at your own pace, and deciding your own rate. We provide the technology for free, and support your career with continuous education programs.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
  }

}
