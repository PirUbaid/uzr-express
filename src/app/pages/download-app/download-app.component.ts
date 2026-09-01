import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-download-app',
  template: `
<section class="app-hero">
  <div class="app-content">
    <span class="badge">UZR Express App</span>

    <h1>Download UZR Express App</h1>

    <p>
      Our customer app is coming soon. Very soon you will be able to book delivery,
      track orders, contact riders and manage your delivery requests from your mobile.
    </p>

    <div class="status-box">
      <h3>Coming Soon</h3>
      <p>IOS /Android app install option will be available soon.</p>
    </div>

    <div class="actions">
      <a class="btn primary"
         href="https://wa.me/923368877657?text=Notify me when UZR Express app is available"
         target="_blank">
        Notify Me on WhatsApp
      </a>

      <a class="btn secondary" href="tel:03368877657">
        Call for Details
      </a>
    </div>
  </div>

  <div class="app-card">
    <h3>App Features</h3>
    <ul>
      <li>Easy delivery booking</li>
      <li>Live order tracking</li>
      <li>Rider updates</li>
      <li>WhatsApp support</li>
      <li>Food, grocery, parcel & medicine delivery</li>
    </ul>
  </div>
</section>

<section class="features-section">
  <h2>What You’ll Get</h2>

  <div class="features-grid">
    <div class="feature-card">
      <div class="icon">📱</div>
      <h3>Easy Ordering</h3>
      <p>Book deliveries quickly from your mobile.</p>
    </div>

    <div class="feature-card">
      <div class="icon">📍</div>
      <h3>Live Tracking</h3>
      <p>Track your rider and order status in real time.</p>
    </div>

    <div class="feature-card">
      <div class="icon">💬</div>
      <h3>Support</h3>
      <p>Contact UZR Express support directly.</p>
    </div>

    <div class="feature-card">
      <div class="icon">🛵</div>
      <h3>Fast Delivery</h3>
      <p>Get food, grocery, parcels and documents delivered fast.</p>
    </div>
  </div>
</section>

<section class="app-cta">
  <h2>Want App Launch Updates?</h2>
  <p>Message us and we’ll notify you when the UZR Express app is available.</p>

  <a href="https://wa.me/923368877657?text=Please notify me when UZR Express app launches"
     target="_blank">
    Get App Update
  </a>
</section>
`,
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent {}