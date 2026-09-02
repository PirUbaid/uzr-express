import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type PolicySection = {
  heading: string;
  body: string;
};

type PolicyPage = {
  title: string;
  intro: string;
  sections: PolicySection[];
};

@Component({
  standalone: true,
  selector: 'app-policy',
  imports: [RouterLink],
  template: `
<section class="policyHero">
  <span class="badge">UZR Express</span>
  <h1>{{ policy.title }}</h1>
  <p>{{ policy.intro }}</p>
  <a routerLink="/jewelry">Back to Jewellery Shop</a>
</section>

<section class="policyContent">
  @for (section of policy.sections; track section.heading) {
    <article>
      <h2>{{ section.heading }}</h2>
      <p>{{ section.body }}</p>
    </article>
  }

  <div class="policyNote">
    <b>Need clarification?</b>
    <p>Message UZR Express on WhatsApp before placing your order. These pages are written to be simple and editable as business policies are finalized.</p>
  </div>
</section>
`,
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
  policy: PolicyPage = this.route.snapshot.data['policy'] as PolicyPage;

  constructor(private readonly route: ActivatedRoute) {}
}
