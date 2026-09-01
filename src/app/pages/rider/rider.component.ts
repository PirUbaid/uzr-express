import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-rider',
  template: `
<section class="rider-hero">
  <div class="content">
    <span class="badge">Join UZR Express</span>

    <h1>Become a Rider & Earn Daily</h1>

    <p>
      Join UZR Express rider team in Kohat. Work full-time or part-time,
      deliver food, grocery, parcels, documents and earn with flexible timing.
    </p>

    <div class="actions">
      <a class="btn primary"
         href="https://wa.me/923368877657?text=I want to become a UZR Express rider"
         target="_blank" rel="noopener noreferrer">
        Apply on WhatsApp
      </a>

      <a class="btn secondary" href="tel:+923368877657">
        Call Now
      </a>
    </div>
  </div>

  <div class="image-box">
    <div class="rider-card">
      <h3>Rider Benefits</h3>

      <ul>
        <li>Daily earning opportunity</li>
        <li>Full-time / part-time work</li>
        <li>Weekly payments</li>
        <li>Student friendly timing</li>
        <li>Work in Kohat city</li>
      </ul>
    </div>
  </div>
</section>

<section class="requirements">
  <h2>What You Need</h2>

  <div class="cards">

    <div class="card">
      <h3>Bike / Transport</h3>
      <p>You should have your own bike or transport.</p>
    </div>

    <div class="card">
      <h3>CNIC</h3>
      <p>Valid CNIC is required for rider verification.</p>
    </div>

    <div class="card">
      <h3>Smartphone</h3>
      <p>You need a mobile phone for orders and WhatsApp updates.</p>
    </div>

    <div class="card">
      <h3>Good Behavior</h3>
      <p>Professional dealing with customers and businesses.</p>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Ready to Start Earning?</h2>

  <p>
    Contact us now and become part of Kohat’s trusted delivery network.
  </p>

  <a href="https://wa.me/923368877657?text=Assalamualaikum, I want to apply as UZR Express rider"
     target="_blank" rel="noopener noreferrer">
    Apply Now on WhatsApp
  </a>
</section>
`,
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent {}
