import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-disclosure',
  templateUrl: './disclosure.component.html',
  styleUrls: ['./disclosure.component.scss']
})
export class DisclosureComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;
  constructor(
    private titleService: Title,  
    private metaTagService: Meta 
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Disclosure on the processing of translator's personal data");  
   
    this.metaTagService.addTags([  
      { name: 'description', content: 'The information is provided exclusively for this website ("Site"), therefore Gettranslation does not assume any responsibility regarding the other websites that may be consulted through hypertext links on the Site.' },  
      { name: 'keywords', content: 'The information is provided exclusively for this website ("Site"), therefore Gettranslation does not assume any responsibility regarding the other websites that may be consulted through hypertext links on the Site.' },  
      { name: 'robots', content: 'noindex, nofollow' },
      { charset: 'UTF-8' }  ]); 
  }

}
