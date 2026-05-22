import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-track-order',
  template: `
<section class="track-hero">
  <div class="track-content">
    <span class="badge">Live Tracking</span>

    <h1>Track Your UZR Express Order</h1>

    <p>
      Enter your order number or contact us on WhatsApp to get the latest delivery status.
      Our team will update you about pickup, rider assignment and delivery.
    </p>

    <div class="track-box">
      <input type="text" placeholder="Enter Order No. e.g. UZR12345" />
      <a href="https://wa.me/923368877657?text=Assalamualaikum, I want to track my UZR Express order"
         target="_blank">
        Track on WhatsApp  <i class="fab fa-whatsapp"></i>

      </a>
    </div>
  </div>

  <div class="status-card">
    <h3>Order Status</h3>

    <div class="status active">
      <span>1</span>
      <div>
        <h4>Order Received</h4>
        <p>Your order request is received.</p>
      </div>
    </div>

    <div class="status active">
      <span>2</span>
      <div>
        <h4>Rider Assigned</h4>
        <p>Nearest rider will be assigned.</p>
      </div>
    </div>

    <div class="status">
      <span>3</span>
      <div>
        <h4>On The Way</h4>
        <p>Your parcel is on the way.</p>
      </div>
    </div>

    <div class="status">
      <span>4</span>
      <div>
        <h4>Delivered</h4>
        <p>Order delivered successfully.</p>
      </div>
    </div>
  </div>
</section>

<section class="tracking-info">
  <h2>How Tracking Works</h2>

  <div class="info-grid">
    <div class="info-card">
      <h3>1. Send Order Number</h3>
      <p>Share your order number with us on WhatsApp.</p>
    </div>

    <div class="info-card">
      <h3>2. Get Rider Update</h3>
      <p>We will confirm rider assignment and pickup status.</p>
    </div>

    <div class="info-card">
      <h3>3. Receive Delivery</h3>
      <p>Your order reaches safely and quickly.</p>
    </div>
  </div>
</section>

<section class="track-cta">
  <h2>Need Help With Your Order?</h2>
  <p>Our support team is available on WhatsApp.</p>

  <a href="https://wa.me/923368877657?text=I need help tracking my UZR Express order"
     target="_blank">
    Contact Support
  </a>
</section>
`,
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent {}