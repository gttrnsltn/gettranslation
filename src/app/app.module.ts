import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EnterprisesPageComponent } from './enterprises-page/enterprises-page.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { LogoBlockComponent } from './components/logo-block/logo-block.component';
import { BannerComponent } from './components/banner/banner.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { OurProfessionalComponent } from './components/our-professional/our-professional.component';
import { KeyBenefitsComponent } from './components/key-benefits/key-benefits.component';
import { EmbraceComponent } from './components/embrace/embrace.component';
import { MoreComponent } from './components/more/more.component';
import { InstantComponent } from './components/instant/instant.component';
import { DevelopersPageComponent } from './developers-page/developers-page.component';
import { TranslatorsPageComponent } from './translators-page/translators-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { TermPageComponent } from './term-page/term-page.component';
import { WhyComponent } from './components/why/why.component';
import { FooterComponent } from './footer/footer.component';
import { LogoAppComponent } from './components/logo-app/logo-app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { WebsiteLocalizationPageComponent } from './website-localization-page/website-localization-page.component';
import { GoogleAdsPageComponent } from './google-ads-page/google-ads-page.component';
import { WebSoftwarePageComponent } from './web-software-page/web-software-page.component';
import { SubtitlingPageComponent } from './subtitling-page/subtitling-page.component';
import { MultilingualPageComponent } from './multilingual-page/multilingual-page.component';
import { CustomLocalizationPageComponent } from './custom-localization-page/custom-localization-page.component';
import { HowComponent } from './components/how/how.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { OfficialTraslationsPageComponent } from './official-traslations-page/official-traslations-page.component';
import { QuotePageComponent } from './quote-page/quote-page.component';
import { WhyChoouseComponent } from './components/why-choouse/why-choouse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProfessionalPageComponent } from './professional-page/professional-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ExcellenceComponent } from './excellence/excellence.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { PaymentComponent } from './payment/payment.component';
import { DisclosureComponent } from './disclosure/disclosure.component';
import { GeneralComponent } from './general/general.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatorComponent } from './components/translator/translator.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    EnterprisesPageComponent,
    OurClientsComponent,
    LogoBlockComponent,
    BannerComponent,
    BenefitsComponent,
    OurProfessionalComponent,
    KeyBenefitsComponent,
    EmbraceComponent,
    MoreComponent,
    InstantComponent,
    DevelopersPageComponent,
    TranslatorsPageComponent,
    ContactPageComponent,
    AboutPageComponent,
    TermPageComponent,
    WhyComponent,
    FooterComponent,
    LogoAppComponent,
    NotFoundPageComponent,
    WebsiteLocalizationPageComponent,
    GoogleAdsPageComponent,
    WebSoftwarePageComponent,
    SubtitlingPageComponent,
    MultilingualPageComponent,
    CustomLocalizationPageComponent,
    HowComponent,
    DiscoverComponent,
    OfficialTraslationsPageComponent,
    QuotePageComponent,
    WhyChoouseComponent,
    ProfessionalPageComponent,
    FormPageComponent,
    OrderPageComponent,
    ExcellenceComponent,
    ChatbotComponent,
    PaymentComponent,
    DisclosureComponent,
    GeneralComponent,
    PrivacyPageComponent,
    FaqPageComponent,
    TranslatorComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
  })
  ],
  providers: [DatePipe, 
  // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
