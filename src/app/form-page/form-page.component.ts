import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Case studies");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Serving thousands of customers worldwide, we partner with businesses of every size, adapting from small, on-demand tasks to high touch, fully managed solutions.' },  
      { name: 'keywords', content: 'Serving thousands of customers worldwide, we partner with businesses of every size, adapting from small, on-demand tasks to high touch, fully managed solutions.' },  
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }  ]);
  }

}
