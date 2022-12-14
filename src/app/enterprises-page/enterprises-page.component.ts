import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-enterprises-page',
  templateUrl: './enterprises-page.component.html',
  styleUrls: ['./enterprises-page.component.scss']
})
export class EnterprisesPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Seamless solutions for your business");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Trusted partnerships, reliable support and accessible solutions at scale. Our expertise and solutions are always tailored to your specific business, markets and goals.' },  
      { name: 'keywords', content: 'Trusted partnerships, reliable support and accessible solutions at scale. Our expertise and solutions are always tailored to your specific business, markets and goals.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);  
   

  }

}
