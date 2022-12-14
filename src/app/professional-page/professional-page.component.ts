import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-professional-page',
  templateUrl: './professional-page.component.html',
  styleUrls: ['./professional-page.component.scss']
})
export class ProfessionalPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Professional translation services");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Professional translation services.  40 areas of expertise. 71 file formats. 190 languages.' },  
      { name: 'keywords', content: 'Professional translation services.  40 areas of expertise. 71 file formats. 190 languages.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]); 
  }

}
