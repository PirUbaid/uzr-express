import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './seo.service';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({selector:'app-root',
    standalone:true,
    imports:[RouterOutlet,NavbarComponent,FooterComponent,ChatbotComponent],
    template:`
    <app-navbar/>
    <main><router-outlet/>
    </main>
    <app-footer/>
<a class="float-wa" href="https://wa.me/923368877657" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-whatsapp"></i>
</a>  
<app-chatbot/>
  `})
export class AppComponent {
  constructor(seoService: SeoService) {
    seoService.init();
  }
}
