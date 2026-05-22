import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-services',
  template: `
<section class="services-hero">
  <div class="hero-text">
    <span class="badge">UZR Express Services</span>
    <h1>Fast Delivery Services Across Kohat</h1>
    <p>
      We deliver food, grocery, parcels, documents, gifts and medicines safely
      and quickly across Kohat.
    </p>

    <a class="hero-btn"
       href="https://wa.me/923368877657?text=Assalamualaikum, I want to book UZR Express delivery"
       target="_blank">
      Book Delivery on WhatsApp
    </a>
  </div>

  <div class="hero-card">
    <h3>Available Services</h3>
    <ul>
      <li>Food Delivery</li>
      <li>Grocery Delivery</li>
      <li>Parcel Delivery</li>
      <li>Documents Delivery</li>
      <li>Gifts Delivery</li>
      <li>Medicine Delivery</li>
    </ul>
  </div>
</section>

<section class="service-list">
  <h2>What We Deliver</h2>

  <div class="service-grid">
    <div class="service-card">
      <div class="icon">🍔</div>
      <h3>Food Delivery</h3>
      <p>Fast delivery from restaurants, cafes and local food points.</p>
    </div>

    <div class="service-card">
      <div class="icon">🛒</div>
      <h3>Grocery Delivery</h3>
      <p>Daily essentials and grocery items delivered to your doorstep.</p>
    </div>

    <div class="service-card">
      <div class="icon">📦</div>
      <h3>Parcel Delivery</h3>
      <p>Safe parcel pickup and delivery within Kohat city.</p>
    </div>

    <div class="service-card">
      <div class="icon">📄</div>
      <h3>Documents Delivery</h3>
      <p>Important files and documents delivered securely and on time.</p>
    </div>

    <div class="service-card">
      <div class="icon">🎁</div>
      <h3>Gifts Delivery</h3>
      <p>Send gifts and surprises to your loved ones with care.</p>
    </div>

    <div class="service-card">
      <div class="icon">💊</div>
      <h3>Medicine Delivery</h3>
      <p>Medicine and pharmacy item delivery when you need it.</p>
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

<section class="services-cta">
  <h2>Need Delivery Right Now?</h2>
  <p>Contact UZR Express and book your delivery instantly.</p>

  <a href="https://wa.me/923368877657?text=I want to book a delivery with UZR Express"
     target="_blank">
    Contact on WhatsApp
  </a>
</section>
`,
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {}