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

    <h1>Check Your Order Status on WhatsApp</h1>

    <p>
      Enter your order number and send it to UZR Express on WhatsApp.
      Our support team will reply with the latest available pickup, rider and delivery status.
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
        Check Status on WhatsApp  <i class="fab fa-whatsapp"></i>
      </button>
    </div>
    @if (showOrderError) {
      <p class="field-error" id="orderNumberError" role="alert">Please enter your order number.</p>
    }
  </div>

  <div class="status-card">
    <h3>Typical Order Status Steps</h3>

    <div class="status">
      <span>1</span>
      <div>
        <h4>Order Received</h4>
        <p>Your order request has been received by support.</p>
      </div>
    </div>

    <div class="status">
      <span>2</span>
      <div>
        <h4>Rider Assigned</h4>
        <p>A rider is assigned when available for your location.</p>
      </div>
    </div>

    <div class="status">
      <span>3</span>
      <div>
        <h4>On The Way</h4>
        <p>Your delivery is moving toward the destination.</p>
      </div>
    </div>

    <div class="status">
      <span>4</span>
      <div>
        <h4>Delivered</h4>
        <p>Your order has been delivered successfully.</p>
      </div>
    </div>
  </div>
</section>

<section class="tracking-info">
  <h2>How WhatsApp Status Updates Work</h2>

  <div class="info-grid">
    <div class="info-card">
      <h3>1. Send Order Number</h3>
      <p>Share your order number with us on WhatsApp.</p>
    </div>

    <div class="info-card">
      <h3>2. Get Rider Update</h3>
      <p>Our team replies with the latest support-verified status.</p>
    </div>

    <div class="info-card">
      <h3>3. Receive Delivery</h3>
      <p>Your order is delivered according to the confirmed details.</p>
    </div>
  </div>
</section>

<section class="track-cta">
  <h2>Need Help With Your Order?</h2>
  <p>Our support team can check the latest available status on WhatsApp.</p>

  <a href="https://wa.me/923368877657?text=I need help tracking my UZR Express order"
     target="_blank" rel="noopener noreferrer">
    Check Status with Support
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

    const message = `Assalamualaikum, I want to check my UZR Express order status. Order Number: ${trimmedOrderNumber}`;
    window.open(`https://wa.me/923368877657?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
}
