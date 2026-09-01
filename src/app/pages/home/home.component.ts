import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  standalone: true,
  imports: [RouterLink, LottieComponent],
  template: `
<section class="hero reveal">
  <div class="heroText">
    <span class="pill">📍 Kohat Ki</span>
    <h1>Fast & Reliable <span>Delivery Service in Kohat</span></h1>
    <p>UZR Express provides food, grocery, parcel, document, medicine, gift and Jewellery delivery within Kohat City.</p>

    <div class="badges">
      <b>🚚 Fast Delivery</b>
      <b>🛡️ Secure Handling</b>
      <b>🎧 WhatsApp Support</b>
      <b>{{ googleRating }}★ on Google · {{ googleReviewCount }} reviews</b>
    </div>

    <div class="actions">
      <a class="btn yellow" href="https://wa.me/923368877657" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>
        Order Now on WhatsApp
      </a>

      <a class="btn dark" routerLink="/download-app">
        App Coming Soon
      </a>

      <a class="btn yellow" routerLink="/jewelry">
        Shop Jewellery
      </a>
    </div>

    <em>Aapka Karobar, Hamari Zimmedari.</em>
  </div>

  <div class="heroArt">
    <ng-lottie
      class="rider-lottie"
      [options]="riderAnimation">
    </ng-lottie>

    <div class="bag">UZR<br><small>EXPRESS</small></div>
  </div>
</section>

<section class="jewelrySpotlight reveal">
  <div class="jewelCopy">
    <span class="dealPill">New Jewellery Drop</span>
    <h2>Trendy Jewellery, Delivered Fast</h2>
    <p>Necklace sets, earrings, rings, bangles and gift pieces. Add to cart and confirm your order on WhatsApp.</p>

    <div class="jewelPerks">
      <b><i class="fa-solid fa-bag-shopping"></i> Add to Cart</b>
      <b><i class="fa-brands fa-whatsapp"></i> WhatsApp Order</b>
      <b><i class="fa-solid fa-truck-fast"></i> Kohat Delivery</b>
    </div>

    <a class="jewelCta" routerLink="/jewelry">
      Shop Jewellery Now
      <i class="fa-solid fa-arrow-right"></i>
    </a>
  </div>

  <a class="jewelShowcase" routerLink="/jewelry" aria-label="Open jewellery shop">
    <span class="jewelCard mainJewel">
      <i class="fa-solid fa-gem"></i>
      <b>Necklace Sets</b>
      <small>From Rs 2,500</small>
    </span>
    <span class="jewelCard">
      <i class="fa-solid fa-ring"></i>
      <b>Rings</b>
      <small>Party wear</small>
    </span>
    <span class="jewelCard">
      <i class="fa-solid fa-gift"></i>
      <b>Gift Items</b>
      <small>Ready to order</small>
    </span>
  </a>
</section>

<section class="localLinks reveal">
  <a routerLink="/services">Delivery Services in Kohat</a>
  <a routerLink="/jewelry">Shop Jewellery in Kohat</a>
  <a routerLink="/track-order">Track Your UZR Express Order</a>
  <a routerLink="/contact">Contact UZR Express</a>
</section>

<section class="app reveal">
  <div>
    <span class="pill">NEW • UZR EXPRESS APP</span>
    <h2>UZR Express App — <span>Coming Soon</span></h2>
    <p>The UZR Express app is planned for easier delivery booking, order updates and customer support from your mobile.</p>

    <div class="checks">
      <p>✓ Planned Easy Ordering</p>
      <p>✓ Planned Order Updates</p>
      <p>✓ Planned Payment Options</p>
      <p>✓ Planned Support Tools</p>
    </div>

    <a class="store" routerLink="/download-app">Get Launch Updates</a>
  </div>

  <div class="phones">
    <div class="phone">
      <b>Categories</b>
      <p>🍔 Food</p>
      <p>🛒 Grocery</p>
      <p>📦 Parcel</p>
      <p>💊 Medicine</p>
    </div>

    <div class="phone main">
      <b>WhatsApp Update Preview</b>
      <div class="map">🛵</div>
      <a routerLink="/track-order">Send Order Number</a>
    </div>

    <div class="phone">
      <b>Order Update</b>
      <p>Share your order number on WhatsApp.</p>
      <p>Our team will reply with the latest status.</p>
    </div>
  </div>
</section>

<section class="section reveal">
  <h2>Our <span>Services</span></h2>

  <div class="cards">
    <div class="card"><span class="card-icon">🍔</span><h3>Food Delivery</h3><p>Your favorite food delivered fast.</p></div>
    <div class="card"><span class="card-icon">🛒</span><h3>Grocery Delivery</h3><p>Daily essentials delivered to you.</p></div>
    <div class="card"><span class="card-icon">📦</span><h3>Parcel Delivery</h3><p>Safe and secure parcel delivery.</p></div>
    <div class="card"><span class="card-icon">📋</span><h3>Documents</h3><p>Important documents on time.</p></div>
    <div class="card"><span class="card-icon">🎁</span><h3>Gifts</h3><p>Surprises to your loved ones.</p></div>
    <div class="card"><span class="card-icon">💊</span><h3>Medicine</h3><p>Medicine delivered to doorstep.</p></div>
  </div>
</section>

<section class="split reveal">
  <div class="black">
    <h2>How It <span>Works</span></h2>

    <div class="steps">
      <p><b>1</b> Send order on WhatsApp</p>
      <p><b>2</b> Rider assigned instantly</p>
      <p><b>3</b> Fast delivery to destination</p>
    </div>
  </div>

  <div class="yellowBox">
    <h2>WhatsApp Order Updates</h2>
    <p>Send your order number on WhatsApp and our team will reply with the latest delivery status.</p>
    <a class="btn dark" routerLink="/track-order">Track Your Order</a>
  </div>
</section>

<section class="two reveal">
  <div>
    <h2>Become a Rider</h2>
    <p>Earn daily with flexible timing.</p>

    <ul>
      <li>Full Time / Part Time</li>
      <li>Weekly Payments</li>
      <li>Daily Earnings</li>
    </ul>

    <a class="btn dark" routerLink="/become-rider">Apply Now</a>
  </div>

  <div>
    <h2>For Businesses</h2>
    <p>Restaurants, grocery stores and online sellers can grow with UZR Express.</p>
    <a class="btn yellow" routerLink="/business">Partner With Us</a>
  </div>
</section>
`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  googleRating = '4.8';
  googleReviewCount = 11;

  riderAnimation: AnimationOptions = {
    path: 'assets/animations/delivery-service.json.json',
    loop: true,
    autoplay: true
  };

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    elements.forEach(el => observer.observe(el));
  }
}
