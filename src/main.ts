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
import { PolicyComponent } from './app/pages/policy/policy.component';

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
        title: 'Check Order Status on WhatsApp | UZR Express Kohat',
        data: { seo: { title: 'Check Order Status on WhatsApp | UZR Express Kohat', description: 'Send your UZR Express order number on WhatsApp and our support team will reply with the latest delivery status.' } },
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
    {
        path: 'return-exchange-policy',
        component: PolicyComponent,
        title: 'Return & Exchange Policy | UZR Express',
        data: {
            seo: { title: 'Return & Exchange Policy | UZR Express', description: 'Read the UZR Express return and exchange policy for jewellery orders in Kohat.' },
            policy: {
                title: 'Return & Exchange Policy',
                intro: 'Simple guidance for jewellery customers. Final return or exchange eligibility is confirmed by UZR Express support based on the order details.',
                sections: [
                    { heading: 'Before You Order', body: 'Please review product photos, price, size, colour and available details before confirming your order on WhatsApp.' },
                    { heading: 'Exchange Requests', body: 'If an item is damaged, incorrect, or different from the confirmed order details, contact UZR Express on WhatsApp as soon as possible with your order information and clear photos.' },
                    { heading: 'Return Requests', body: 'Return requests are reviewed case by case. Items should be unused, in their original condition, and shared with support for review before any return is accepted.' },
                    { heading: 'Customer Support', body: 'UZR Express will guide customers through the next step on WhatsApp. Delivery or pickup charges for return or exchange handling may depend on location and order details.' }
                ]
            }
        },
    },
    {
        path: 'delivery-policy',
        component: PolicyComponent,
        title: 'Delivery Policy | UZR Express',
        data: {
            seo: { title: 'Delivery Policy | UZR Express', description: 'Learn how UZR Express delivery timing, locations and charges are confirmed for Kohat orders.' },
            policy: {
                title: 'Delivery Policy',
                intro: 'UZR Express coordinates delivery in Kohat through WhatsApp support and local rider availability.',
                sections: [
                    { heading: 'Delivery Area', body: 'UZR Express serves customers within Kohat City. Delivery availability for a specific address is confirmed on WhatsApp.' },
                    { heading: 'Delivery Charges', body: 'Delivery charges may vary depending on distance and location. Charges are confirmed with the customer before the order is completed.' },
                    { heading: 'Delivery Timing', body: 'Delivery timing depends on order details, rider availability, traffic and location. UZR Express support will share the expected status on WhatsApp.' },
                    { heading: 'Order Updates', body: 'Customers can check order status by sharing their order number on WhatsApp. This is a support-assisted status update, not a live GPS tracking system.' }
                ]
            }
        },
    },
    {
        path: 'privacy-policy',
        component: PolicyComponent,
        title: 'Privacy Policy | UZR Express',
        data: {
            seo: { title: 'Privacy Policy | UZR Express', description: 'Read how UZR Express uses customer contact and order details to provide delivery and WhatsApp support.' },
            policy: {
                title: 'Privacy Policy',
                intro: 'UZR Express uses customer information only to process orders, coordinate delivery and provide support.',
                sections: [
                    { heading: 'Information We Use', body: 'Customers may share their name, phone number, delivery address, order details and notes when placing an order or requesting support.' },
                    { heading: 'How Information Is Used', body: 'Order information is used to confirm items, coordinate riders, calculate delivery needs, provide WhatsApp updates and complete customer support requests.' },
                    { heading: 'Payment Information', body: 'Do not share debit card, credit card, passwords or sensitive payment credentials through the website. Online payment details are handled directly through WhatsApp support when needed.' },
                    { heading: 'Data Care', body: 'UZR Express aims to keep customer order details private and uses them only for service-related communication and order handling.' }
                ]
            }
        },
    },
    {
        path: 'terms-conditions',
        component: PolicyComponent,
        title: 'Terms & Conditions | UZR Express',
        data: {
            seo: { title: 'Terms & Conditions | UZR Express', description: 'Review the basic terms for using UZR Express delivery and jewellery ordering services in Kohat.' },
            policy: {
                title: 'Terms & Conditions',
                intro: 'These terms explain the basic customer expectations for using UZR Express delivery and jewellery ordering services.',
                sections: [
                    { heading: 'Order Confirmation', body: 'Orders are confirmed through WhatsApp after UZR Express receives the required customer details, product selection and delivery information.' },
                    { heading: 'Prices and Availability', body: 'Product prices and availability are shown on the website where available, but final confirmation happens on WhatsApp before completion.' },
                    { heading: 'Payments', body: 'Cash on Delivery and Online Transfer options may be available. Online Transfer orders are not marked paid automatically and are confirmed after payment verification.' },
                    { heading: 'Delivery', body: 'Delivery charges may vary depending on distance and location. UZR Express will confirm delivery details with the customer before completing the order.' }
                ]
            }
        },
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
