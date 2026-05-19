import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ServicesComponent } from './app/pages/services/services.component';
import { TrackOrderComponent } from './app/pages/track-order/track-order.component';
import { RiderComponent } from './app/pages/rider/rider.component';
import { BusinessComponent } from './app/pages/business/business.component';
import { DownloadAppComponent } from './app/pages/download-app/download-app.component';
import { ContactComponent } from './app/pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'UZR Express' },
  { path: 'services', component: ServicesComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'become-rider', component: RiderComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'download-app', component: DownloadAppComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', { enabled: true, registrationStrategy: 'registerWhenStable:30000' })
  ]
}).catch(err => console.error(err));
