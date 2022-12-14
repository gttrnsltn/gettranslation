import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-website-localization-page',
  templateUrl: './website-localization-page.component.html',
  styleUrls: ['./website-localization-page.component.scss']
})
export class WebsiteLocalizationPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Website Localization");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Fully managed solutions for bringing your website to another culture, from multilingual Wordpress sites to complex architectures.' },  
      { name: 'keywords', content: 'Fully managed solutions for bringing your website to another culture, from multilingual Wordpress sites to complex architectures.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
  }

}
