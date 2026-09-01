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
    {
        path: '',
        component: HomeComponent,
        title: 'UZR Express | Fast Delivery & Courier Service in Kohat',
        data: { seo: { title: 'UZR Express | Fast Delivery & Courier Service in Kohat', description: 'UZR Express provides fast and reliable food, grocery, parcel, document, medicine and Jewellery delivery services across Kohat City. Order easily through WhatsApp.' } },
    },
    {
        path: 'services',
        component: ServicesComponent,
        title: 'Delivery Services in Kohat | UZR Express',
        data: { seo: { title: 'Delivery Services in Kohat | UZR Express', description: 'Explore food delivery, grocery delivery, parcel delivery, courier service and document delivery in Kohat City with UZR Express.' } },
    },
    {
        path: 'track-order',
        component: TrackOrderComponent,
        title: 'Track Your Order | UZR Express Kohat',
        data: { seo: { title: 'Track Your Order | UZR Express Kohat', description: 'Send your UZR Express order number on WhatsApp to receive the latest delivery status update from our support team.' } },
    },
    {
        path: 'become-rider',
        component: RiderComponent,
        title: 'Become a Rider in Kohat | UZR Express',
        data: { seo: { title: 'Become a Rider in Kohat | UZR Express', description: 'Apply to become a UZR Express rider in Kohat and earn through local delivery work.' } },
    },
    {
        path: 'business',
        component: BusinessComponent,
        title: 'Business Delivery Partner in Kohat | UZR Express',
        data: { seo: { title: 'Business Delivery Partner in Kohat | UZR Express', description: 'Partner your restaurant, shop or online business with UZR Express for local delivery support in Kohat.' } },
    },
    {
        path: 'jewelry',
        component: JewelryComponent,
        title: 'Shop Jewellery Online in Kohat | UZR Express',
        data: { seo: { title: 'Shop Jewellery Online in Kohat | UZR Express', description: 'Shop Jewellery online in Kohat with Cash on Delivery and WhatsApp order confirmation from UZR Express. Delivery charges are confirmed before order completion.' } },
    },
    {
        path: 'download-app',
        component: DownloadAppComponent,
        title: 'UZR Express App — Coming Soon',
        data: { seo: { title: 'UZR Express App — Coming Soon', description: 'The UZR Express app is coming soon. Get launch updates on WhatsApp for the planned iOS and Android app.' } },
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact UZR Express | Kohat Delivery Service',
        data: { seo: { title: 'Contact UZR Express | Kohat Delivery Service', description: 'Contact UZR Express in Kohat by WhatsApp, phone, Facebook or Instagram for delivery booking and support.' } },
    },
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
