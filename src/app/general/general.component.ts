import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("General contractual terms and conditions ");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'Gettranslation reserves the right to modify, in whole or in part, these general terms and conditions at any time by giving a notice of at least 7 days through the Website; should the methods of managing the services significantly change' },  
      { name: 'keywords', content: 'Gettranslation reserves the right to modify, in whole or in part, these general terms and conditions at any time by giving a notice of at least 7 days through the Website; should the methods of managing the services significantly change' },  
      { name: 'robots', content: 'noindex, nofollow' },
      { charset: 'UTF-8' }  ]); 
  }

}
