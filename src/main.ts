import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ServicesComponent } from './app/pages/services/services.component';
import { TrackOrderComponent } from './app/pages/track-order/track-order.component';
import { RiderComponent } from './app/pages/rider/rider.component';
import { BusinessComponent } from './app/pages/business/business.component';
import { DownloadAppComponent } from './app/pages/download-app/download-app.component';
import { ContactComponent } from './app/pages/contact/contact.component';
import { JewelryComponent } from './app/pages/jewelry/jewelry.component';

const routes: Routes = [
    { path: '', component: HomeComponent, title: 'UZR Express' },
    { path: 'services', component: ServicesComponent },
    { path: 'track-order', component: TrackOrderComponent },
    { path: 'become-rider', component: RiderComponent },
    { path: 'business', component: BusinessComponent },
    { path: 'jewelry', component: JewelryComponent },
    { path: 'download-app', component: DownloadAppComponent },
    { path: 'contact', component: ContactComponent },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'top',
                anchorScrolling: 'enabled',
            })
        ),
        provideLottieOptions({
            player: () => player,
        }),
        provideServiceWorker('ngsw-worker.js', {
            enabled: false,
        }),
    ],
}).catch((err) => console.error(err));
