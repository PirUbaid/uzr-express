import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-footer',
     standalone: true,
      imports: [RouterLink], 
      template:
       `<footer class="footer">
       <div>
       <img src="assets/images/uzr-logo.png" alt="UZR" class="flogo">
       <p>Kohat's trusted local delivery partner.</p>
       <b>Aapka Karobar, Hamari Zimmedari.</b>
       </div>
       <div>
       <h4>Quick Links</h4>
       <a routerLink="/">Home</a>
       <a routerLink="/services">Services</a>
       <a routerLink="/jewelry">Jewellery Shop</a>
       <a routerLink="/track-order">Track Order</a>
       <a routerLink="/become-rider">Become a Rider</a>
       </div>
       <div>
       <h4>Services</h4>
       <p>Food Delivery</p>
       <p>Grocery Delivery</p>
       <p>Parcel Delivery</p>
       <p>Documents</p>
       <p>Medicine</p>
       </div>
       <div>
       <h4>Contact</h4>
       <a href="https://wa.me/923368877657" target="_blank" rel="noopener noreferrer">WhatsApp: 0336 8877657</a>
       <a href="tel:+923368877657">Phone: 0336 8877657</a>
       <a href="https://www.facebook.com/uzrexpress/" target="_blank" rel="noopener noreferrer">Facebook: UZR Express Delivery</a>
       <a href="https://www.instagram.com/uzrexpress/" target="_blank" rel="noopener noreferrer">Instagram: uzrexpress</a>
       <p>Near Pearl Oasis, City Centre Gate No. 1, KDA Sector 2, Kohat, Pakistan</p>
       </div>
       </footer>
       <div class="copy">© 2026 UZR Express. All Rights Reserved.</div>` })
export class FooterComponent { }
