import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({ selector: 'app-navbar', standalone: true, imports: [RouterLink, RouterLinkActive], template: `<nav class="nav"><a routerLink="/" class="brand" (click)="closeMenu()"><img src="assets/images/uzr-logo.png" alt="UZR Express"></a><button class="menuBtn" type="button" aria-label="Open navigation menu" [attr.aria-expanded]="isMenuOpen" (click)="toggleMenu()"><span></span><span></span><span></span></button><div class="links" [class.open]="isMenuOpen"><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Home</a><a routerLink="/services" routerLinkActive="active" (click)="closeMenu()">Services</a><a routerLink="/jewelry" routerLinkActive="active" (click)="closeMenu()">Jewelry</a><a routerLink="/track-order" routerLinkActive="active" (click)="closeMenu()">Track Order</a><a routerLink="/business" routerLinkActive="active" (click)="closeMenu()">For Businesses</a><a routerLink="/become-rider" routerLinkActive="active" (click)="closeMenu()">Become a Rider</a><a routerLink="/download-app" routerLinkActive="active" (click)="closeMenu()">Download App</a><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></div>
  
  <button class="menuOverlay" type="button" aria-label="Close navigation menu" [class.open]="isMenuOpen" (click)="closeMenu()"></button></nav>`,
    styleUrls: ['./navbar.component.scss']


})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
