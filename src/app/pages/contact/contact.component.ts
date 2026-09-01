import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-contact',
  template: `
<section class="contact-hero">
  <div class="contact-content">
    <span class="badge">Contact UZR Express</span>

    <h1>Need Delivery Help?</h1>

    <p>
      Contact UZR Express for delivery booking, rider registration, business partnership,
      order tracking and customer support in Kohat.
    </p>

    <div class="actions">
      <a class="btn primary"
         href="https://wa.me/923368877657?text=Assalamualaikum, I want to contact UZR Express"
         target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>
        Chat on WhatsApp
      </a>

      <a class="btn secondary" href="tel:+923368877657">
        <i class="fas fa-phone"></i>
        Call Now
      </a>
    </div>
  </div>

  <div class="contact-card">
    <h3>Contact Details</h3>

    <div class="contact-row">
      <span><i class="fab fa-whatsapp"></i></span>
      <div>
        <h4>WhatsApp / Phone</h4>
        <p>
          <a href="https://wa.me/923368877657" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          ·
          <a href="tel:+923368877657">0336 8877657</a>
        </p>
      </div>
    </div>

    <div class="contact-row">
      <span><i class="fab fa-facebook-f"></i></span>
      <div>
        <h4>Facebook</h4>
        <p><a href="https://www.facebook.com/uzrexpress/" target="_blank" rel="noopener noreferrer">UZR Express Delivery</a></p>
      </div>
    </div>

    <div class="contact-row">
      <span><i class="fab fa-instagram"></i></span>
      <div>
        <h4>Instagram</h4>
        <p><a href="https://www.instagram.com/uzrexpress/" target="_blank" rel="noopener noreferrer">uzrexpress</a></p>
      </div>
    </div>

    <div class="contact-row">
      <span><i class="fas fa-location-dot"></i></span>
      <div>
        <h4>Location</h4>
        <p>Near Pearl Oasis, City Centre Gate No. 1, KDA Sector 2, Kohat, Pakistan</p>
      </div>
    </div>
  </div>
</section>

<section class="support-section">
  <h2>How Can We Help?</h2>

  <div class="support-grid">
    <div class="support-card">
      <div class="icon"><i class="fas fa-truck-fast"></i></div>
      <h3>Book Delivery</h3>
      <p>Send pickup and drop location to book your delivery.</p>
    </div>

    <div class="support-card">
      <div class="icon"><i class="fas fa-box"></i></div>
      <h3>Track Order</h3>
      <p>Ask our support team for your current order status.</p>
    </div>

    <div class="support-card">
      <div class="icon"><i class="fas fa-motorcycle"></i></div>
      <h3>Become Rider</h3>
      <p>Apply to join UZR Express rider team in Kohat.</p>
    </div>

    <div class="support-card">
      <div class="icon"><i class="fas fa-store"></i></div>
      <h3>Business Partner</h3>
      <p>Register your shop, restaurant or online business with us.</p>
    </div>
  </div>
</section>

<section class="contact-cta">
  <h2>Fastest Way To Reach Us</h2>
  <p>For quick response, contact us directly on WhatsApp.</p>

  <a href="https://wa.me/923368877657?text=Assalamualaikum UZR Express"
     target="_blank" rel="noopener noreferrer">
    <i class="fab fa-whatsapp"></i>
    Open WhatsApp
  </a>
</section>
`,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {}
