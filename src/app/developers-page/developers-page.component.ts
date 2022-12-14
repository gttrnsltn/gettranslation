import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-developers-page',
  templateUrl: './developers-page.component.html',
  styleUrls: ['./developers-page.component.scss']
})
export class DevelopersPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Seamless tools for globalization engineers");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Translation APIs for continuous localization, advanced repetition leveraging, content extraction from 71 file formats and 21 content sources, neural adaptive machine translation, and much more.' },  
      { name: 'keywords', content: 'Translation APIs for continuous localization, advanced repetition leveraging, content extraction from 71 file formats and 21 content sources, neural adaptive machine translation, and much more.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
  }

}
