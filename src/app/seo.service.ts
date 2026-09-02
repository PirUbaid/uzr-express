import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type SeoData = {
  title: string;
  description: string;
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://uzr-expresscom.vercel.app';
  private readonly defaultImage = `${this.siteUrl}/assets/images/uzr-logo.png`;

  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateSeo());

    this.updateSeo();
  }

  private updateSeo(): void {
    const route = this.getDeepestRoute(this.router.routerState.snapshot.root);
    const seo = route.data['seo'] as SeoData | undefined;

    if (!seo) {
      return;
    }

    const url = `${this.siteUrl}${this.router.url === '/' ? '' : this.router.url}`;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'UZR Express' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_PK' });
    this.meta.updateTag({ property: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ property: 'og:image:alt', content: 'UZR Express logo' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultImage });
    this.updateCanonicalUrl(url);
  }

  private getDeepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }

  private updateCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }
}
