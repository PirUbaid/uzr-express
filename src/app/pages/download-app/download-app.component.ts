import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-download-app',
  template: `
<section class="app-hero">
  <div class="app-content">
    <span class="badge">UZR Express App</span>

    <h1>UZR Express App — Coming Soon</h1>

    <p>
      Our customer app is not available yet. We are planning a mobile experience for easier
      delivery booking, order updates and customer support.
    </p>

    <div class="status-box">
      <h3>Coming Soon</h3>
      <p>iOS / Android app install options will be available after launch.</p>
    </div>

    <div class="actions">
      <a class="btn primary"
         href="https://wa.me/923368877657?text=Notify me when UZR Express app is available"
         target="_blank" rel="noopener noreferrer">
        Get Launch Updates on WhatsApp
      </a>

      <a class="btn secondary" href="tel:+923368877657">
        Call for Details
      </a>
    </div>
  </div>

  <div class="app-card">
    <h3>Planned App Features</h3>
    <ul>
      <li>Easy delivery booking</li>
      <li>Order status updates</li>
      <li>Rider coordination updates</li>
      <li>WhatsApp support access</li>
      <li>Food, grocery, parcel & medicine delivery requests</li>
    </ul>
  </div>
</section>

<section class="features-section">
  <h2>Planned App Features</h2>

  <div class="features-grid">
    <div class="feature-card">
      <div class="icon">📱</div>
      <h3>Easy Ordering</h3>
      <p>Planned feature for booking deliveries from your mobile.</p>
    </div>

    <div class="feature-card">
      <div class="icon">📍</div>
      <h3>Order Updates</h3>
      <p>Planned support for checking delivery progress more easily.</p>
    </div>

    <div class="feature-card">
      <div class="icon">💬</div>
      <h3>Support</h3>
      <p>Planned quick access to UZR Express support.</p>
    </div>

    <div class="feature-card">
      <div class="icon">🛵</div>
      <h3>Fast Delivery</h3>
      <p>Planned delivery request flow for food, grocery, parcels and documents.</p>
    </div>
  </div>
</section>

<section class="app-cta">
  <h2>Want App Launch Updates?</h2>
  <p>Message us and we’ll notify you when the UZR Express app is available.</p>

  <a href="https://wa.me/923368877657?text=Please notify me when UZR Express app launches"
     target="_blank" rel="noopener noreferrer">
    Get Launch Updates on WhatsApp
  </a>
</section>
`,
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent {}
