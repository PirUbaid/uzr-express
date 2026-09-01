import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-track-order',
  imports: [FormsModule],
  template: `
<section class="track-hero">
  <div class="track-content">
    <span class="badge">WhatsApp Order Updates</span>

    <h1>Track Your UZR Express Order</h1>

    <p>
      Enter your order number or contact us on WhatsApp to get the latest delivery status.
      Our team will update you about pickup, rider assignment and delivery.
    </p>

    <div class="track-box">
      <input
        #orderInput
        type="text"
        placeholder="Enter Order No. e.g. UZR12345"
        maxlength="30"
        [(ngModel)]="orderNumber"
        [class.invalid]="showOrderError"
        [attr.aria-invalid]="showOrderError"
        aria-describedby="orderNumberError"
      />
      <button type="button" (click)="trackOnWhatsApp()">
        Track on WhatsApp  <i class="fab fa-whatsapp"></i>
      </button>
    </div>
    @if (showOrderError) {
      <p class="field-error" id="orderNumberError" role="alert">Please enter your order number.</p>
    }
  </div>

  <div class="status-card">
    <h3>Typical Order Progress</h3>

    <div class="status">
      <span>1</span>
      <div>
        <h4>Order Received</h4>
        <p>Your order request is received.</p>
      </div>
    </div>

    <div class="status">
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
     target="_blank" rel="noopener noreferrer">
    Contact Support
  </a>
</section>
`,
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent {
  @ViewChild('orderInput') orderInput?: ElementRef<HTMLInputElement>;

  orderNumber = '';
  showOrderError = false;

  trackOnWhatsApp(): void {
    const trimmedOrderNumber = this.orderNumber.trim();
    this.orderNumber = trimmedOrderNumber;
    this.showOrderError = trimmedOrderNumber.length === 0;

    if (this.showOrderError) {
      this.orderInput?.nativeElement.focus();
      return;
    }

    const message = `Assalamualaikum, I want to track my UZR Express order. Order Number: ${trimmedOrderNumber}`;
    window.open(`https://wa.me/923368877657?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
}
