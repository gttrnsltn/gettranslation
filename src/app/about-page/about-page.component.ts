import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("About us");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'We offer solutions and tools for efficient, precise communication on a global or local scale. Fluent in over 190 languages, we offer more than 50,000 translators and language specialists on hand.' },  
      { name: 'keywords', content: 'We offer solutions and tools for efficient, precise communication on a global or local scale. Fluent in over 190 languages, we offer more than 50,000 translators and language specialists on hand.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
  }

}
