import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-term-page',
  templateUrl: './term-page.component.html',
  styleUrls: ['./term-page.component.scss']
})
export class TermPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("General contractual terms and conditions");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'These general sales conditions apply to all jobs carried out by Gettranslation for its clients.' },  
      { name: 'keywords', content: 'These general sales conditions apply to all jobs carried out by Gettranslation for its clients.' },  
      { name: 'robots', content: 'noindex, nofollow' },
      { charset: 'UTF-8' }  ]);  
  }

}
