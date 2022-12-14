import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { routingAnimation } from '../shared/animation/routing-animation';

@Component({
  animations: [routingAnimation],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing: any;

  ipAddress: string = "";


  constructor(
    private titleService: Title,  
    private metaTagService: Meta,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gettranslation: Seamless multilingual solutions for your business");  

    this.metaTagService.addTags([  
      { name: 'description', content: 'Solutions and tools for efficient, precise communication on a global or local scale. Fluent in over 190 languages, we offer more than 50,000 translators and language specialists on hand.' },  
      { name: 'keywords', content: 'Solutions and tools for efficient, precise communication on a global or local scale. Fluent in over 190 languages, we offer more than 50,000 translators and language specialists on hand.' },  
      { name: 'robots', content: 'index, follow' }, 
      { charset: 'UTF-8' }  ]);  
    this.router.navigate(['/home']);
  }


}