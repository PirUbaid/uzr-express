import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-services',
  imports: [RouterLink],
  template: `
<section class="services-hero">
  <div class="hero-text">
    <span class="badge">UZR Express Services</span>
    <h1>Food, Grocery, Parcel & Courier Delivery in Kohat</h1>
    <p>
      UZR Express provides delivery and courier support within Kohat City for homes,
      shops, restaurants and online sellers.
    </p>

    <a class="hero-btn"
       href="https://wa.me/923368877657?text=Assalamualaikum, I want to book UZR Express delivery"
       target="_blank" rel="noopener noreferrer">
         <i class="fab fa-whatsapp"></i>

      Book Delivery on WhatsApp
    </a>
  </div>

  <div class="hero-card">
    <h3>Available Services</h3>
    <ul>
      <li>Food Delivery in Kohat</li>
      <li>Grocery Delivery in Kohat</li>
      <li>Parcel Delivery in Kohat</li>
      <li>Document Delivery in Kohat</li>
      <li>Gift Delivery in Kohat</li>
      <li>Medicine Delivery in Kohat</li>
    </ul>
  </div>
</section>

<section class="service-list">
  <h2>What We Deliver</h2>

  <div class="service-grid">
    <div class="service-card">
      <div class="icon">🍔</div>
      <h3>Food Delivery in Kohat</h3>
      <p>Order food from local restaurants and food points for delivery within Kohat City.</p>
    </div>

    <div class="service-card">
      <div class="icon">🛒</div>
      <h3>Grocery Delivery in Kohat</h3>
      <p>Get daily grocery items and household essentials delivered to your address in Kohat City.</p>
    </div>

    <div class="service-card">
      <div class="icon">📦</div>
      <h3>Parcel and Courier Service in Kohat</h3>
      <p>Send parcels through UZR Express for local courier pickup and delivery within Kohat City.</p>
    </div>

    <div class="service-card">
      <div class="icon">📄</div>
      <h3>Document Delivery in Kohat</h3>
      <p>Share document pickup and drop-off details on WhatsApp for delivery support in Kohat City.</p>
    </div>

    <div class="service-card">
      <div class="icon">🎁</div>
      <h3>Gift Delivery in Kohat</h3>
      <p>Send gift items locally with pickup and delivery coordinated through UZR Express.</p>
    </div>

    <div class="service-card">
      <div class="icon">💊</div>
      <h3>Medicine Delivery in Kohat</h3>
      <p>Request medicine or pharmacy item delivery within Kohat City by sharing details on WhatsApp.</p>
    </div>
  </div>
</section>

<section class="how-book">
  <h2>How To Book Delivery</h2>

  <div class="steps">
    <div class="step">
      <span>1</span>
      <h3>Send Details</h3>
      <p>Share pickup and drop location on WhatsApp.</p>
    </div>

    <div class="step">
      <span>2</span>
      <h3>Rider Assigned</h3>
      <p>Nearest rider will be assigned for your delivery.</p>
    </div>

    <div class="step">
      <span>3</span>
      <h3>Delivered Safely</h3>
      <p>Your order reaches safely and quickly.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <h2>Frequently Asked Questions</h2>

  <div class="faq-grid">
    <div class="faq-card">
      <h3>What areas does UZR Express cover?</h3>
      <p>UZR Express serves customers within Kohat City.</p>
    </div>

    <div class="faq-card">
      <h3>How can I book a delivery in Kohat?</h3>
      <p>You can book by sending your pickup, drop-off and item details to UZR Express on WhatsApp.</p>
    </div>

    <div class="faq-card">
      <h3>What items can UZR Express deliver?</h3>
      <p>UZR Express handles food, groceries, parcels, documents, medicine, gifts and Jewellery delivery requests.</p>
    </div>

    <div class="faq-card">
      <h3>Does UZR Express provide same-day delivery in Kohat?</h3>
      <p>Same-day delivery in Kohat may be available depending on order details and rider availability, confirmed on WhatsApp.</p>
    </div>

    <div class="faq-card">
      <h3>How can I track my UZR Express order?</h3>
      <p>Use the <a routerLink="/track-order">Track Your UZR Express Order</a> page and send your order number on WhatsApp.</p>
    </div>

    <div class="faq-card">
      <h3>Can I order Jewellery online in Kohat?</h3>
      <p>Yes, you can <a routerLink="/jewelry">Shop Jewellery in Kohat</a> and confirm your cart on WhatsApp.</p>
    </div>

    <div class="faq-card">
      <h3>How are delivery charges confirmed?</h3>
      <p>Delivery charges are confirmed on WhatsApp before order completion.</p>
    </div>
  </div>
</section>

<section class="services-cta">
  <h2>Need Delivery Right Now?</h2>
  <p>Contact UZR Express and book your delivery in Kohat City.</p>

  <a href="https://wa.me/923368877657?text=I want to book a delivery with UZR Express"
     target="_blank" rel="noopener noreferrer">
    Contact on WhatsApp
  </a>
  <a class="secondary-link" routerLink="/contact">Contact UZR Express</a>
</section>
`,
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {}
