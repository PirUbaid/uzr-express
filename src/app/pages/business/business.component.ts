import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-business',
  template: `
<section class="business-hero">
  <div class="business-content">
    <span class="badge">For Local Businesses</span>

    <h1>Grow Your Business With UZR Express</h1>

    <p>
      Partner with UZR Express and start delivering your products across Kohat.
      Perfect for restaurants, grocery stores, pharmacies, online sellers and local shops.
    </p>

    <div class="actions">
      <a class="btn primary"
         href="https://wa.me/923368877657?text=Assalamualaikum, I want to partner my business with UZR Express"
         target="_blank" rel="noopener noreferrer">
        Partner on WhatsApp   <i class="fab fa-whatsapp"></i>

      </a>

      <a class="btn secondary" href="tel:+923368877657">
        Call for Details
      </a>
    </div>
  </div>

  <div class="partner-card">
    <h3>Who Can Partner?</h3>

    <ul>
      <li>Restaurants & Cafes</li>
      <li>Grocery Stores</li>
      <li>Medical Stores</li>
      <li>Online Sellers</li>
      <li>Gift Shops</li>
      <li>Local Shops</li>
    </ul>
  </div>
</section>

<section class="business-benefits">
  <h2>Why Partner With Us?</h2>

  <div class="benefit-grid">
    <div class="benefit-card">
      <div class="icon">🚚</div>
      <h3>Fast Delivery</h3>
      <p>Deliver customer orders quickly across Kohat.</p>
    </div>

    <div class="benefit-card">
      <div class="icon">📈</div>
      <h3>More Sales</h3>
      <p>Reach more customers without managing your own riders.</p>
    </div>

    <div class="benefit-card">
      <div class="icon">🛵</div>
      <h3>Rider Network</h3>
      <p>UZR riders handle pickup and delivery for your business.</p>
    </div>

    <div class="benefit-card">
      <div class="icon">💬</div>
      <h3>WhatsApp Support</h3>
      <p>Easy order coordination through WhatsApp support.</p>
    </div>
  </div>
</section>

<section class="partner-steps">
  <h2>How Partnership Works</h2>

  <div class="steps">
    <div class="step">
      <span>1</span>
      <h3>Contact Us</h3>
      <p>Send your business details on WhatsApp.</p>
    </div>

    <div class="step">
      <span>2</span>
      <h3>Setup Delivery</h3>
      <p>We confirm service area, charges and order process.</p>
    </div>

    <div class="step">
      <span>3</span>
      <h3>Start Delivering</h3>
      <p>We pick orders from your shop and deliver to customers.</p>
    </div>
  </div>
</section>

<section class="business-cta">
  <h2>Ready To Grow Your Business?</h2>
  <p>Let UZR Express become your trusted delivery partner in Kohat.</p>

  <a href="https://wa.me/923368877657?text=I want to register my business with UZR Express"
     target="_blank" rel="noopener noreferrer">
    Become a Partner
  </a>
</section>
`,
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {}
