import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CustomLocalizationPageComponent } from './custom-localization-page/custom-localization-page.component';
import { DevelopersPageComponent } from './developers-page/developers-page.component';
import { DisclosureComponent } from './disclosure/disclosure.component';
import { EnterprisesPageComponent } from './enterprises-page/enterprises-page.component';
import { ExcellenceComponent } from './excellence/excellence.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { GeneralComponent } from './general/general.component';
import { GoogleAdsPageComponent } from './google-ads-page/google-ads-page.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MultilingualPageComponent } from './multilingual-page/multilingual-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { OfficialTraslationsPageComponent } from './official-traslations-page/official-traslations-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { PaymentComponent } from './payment/payment.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProfessionalPageComponent } from './professional-page/professional-page.component';
import { QuotePageComponent } from './quote-page/quote-page.component';
import { SubtitlingPageComponent } from './subtitling-page/subtitling-page.component';
import { TermPageComponent } from './term-page/term-page.component';
import { TranslatorsPageComponent } from './translators-page/translators-page.component';
import { WebSoftwarePageComponent } from './web-software-page/web-software-page.component';
import { WebsiteLocalizationPageComponent } from './website-localization-page/website-localization-page.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  // { path: 'home', component: HomePageComponent },
  // { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',   redirectTo: '', pathMatch: 'full' },
  { path: 'developers', component: DevelopersPageComponent },
  { path: 'translators', component: TranslatorsPageComponent },
  { path: 'enterprises', component: EnterprisesPageComponent },
  { path: 'term', component: TermPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'website-translation-service', component: ProfessionalPageComponent },
  { path: 'adwords-localization', component: GoogleAdsPageComponent },
  { path: 'web-software-localization', component: WebSoftwarePageComponent },
  { path: 'terms', component: TermPageComponent },
  { path: 'transcription-subtitle-translation', component: SubtitlingPageComponent },
  { path: 'multilingual-dtp-services', component: MultilingualPageComponent },
  { path: 'custom-localization-solutions', component: CustomLocalizationPageComponent},
  { path: 'quote', component: QuotePageComponent},
  { path: 'сase-studies', component: FormPageComponent},
  { path: 'order', component: OrderPageComponent},
  { path: 'website-localization', component: WebsiteLocalizationPageComponent},
  { path: 'sworn-certified-official-translation', component: OfficialTraslationsPageComponent},
  { path: 'production-process', component: ExcellenceComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'multilingual-chatbot-services', component: ChatbotComponent},
  { path: 'general', component: GeneralComponent},
  { path: 'disclosure', component: DisclosureComponent},
  { path: 'privacy', component: PrivacyPageComponent},
  { path: 'faq', component: FaqPageComponent},
  { path: 'urgent-translations', component: QuotePageComponent},
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    //  scrollPositionRestoration: 'enabled'
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
