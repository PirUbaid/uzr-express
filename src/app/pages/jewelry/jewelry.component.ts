import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JEWELRY_PRODUCTS, JewelryProduct, JewelryProductImage } from '../../data/jewelry-products';

type CartItem = {
  product: JewelryProduct;
  quantity: number;
};

type PaymentMethod = 'Cash on Delivery' | 'Online Transfer';

type ProductFilter = 'All' | 'Jewellery Set' | 'Pendant' | 'Watch';

type StoredCartItem = {
  id: number;
  quantity: number;
};

type StoredCart = {
  items?: StoredCartItem[];
  paymentMethod?: string;
};

type CheckoutDraft = {
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  orderNote?: string;
};

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
<div class="jewelryAnnouncement" aria-label="Store information">
  <span>New jewellery drop</span>
  <i aria-hidden="true"></i>
  <span>Delivery in Kohat</span>
  <i aria-hidden="true"></i>
  <span>Order confirmation on WhatsApp</span>
</div>

<section class="jewelryHero" aria-labelledby="jewelryHeroTitle">
  <div class="heroCopy">
    <span class="pill"><i class="fa-regular fa-gem"></i> UZR Jewellery</span>
    <p class="heroKicker">The new collection · Kohat</p>
    <h1 id="jewelryHeroTitle">Everyday elegance, <em>delivered.</em></h1>
    <p class="heroLead">A curated edit of jewellery sets, pendants and watches—selected for effortless gifting and personal style.</p>
    <div class="heroActions">
      <a class="shopNow" href="#products">Explore the collection <i class="fa-solid fa-arrow-right"></i></a>
      <button class="cartBtn" type="button" (click)="openCart()">
        <i class="fa-solid fa-bag-shopping"></i>
        View bag
        @if (cartCount > 0) {
          <span>{{ cartCount }}</span>
        }
      </button>
    </div>
    <div class="heroNotes" aria-label="Shopping benefits">
      <span><b>{{ products.length }}</b> curated pieces</span>
      <span><b>COD</b> available</span>
      <span><b>Local</b> WhatsApp support</span>
    </div>
  </div>

  <div class="heroVisual" aria-label="Featured UZR Jewellery pieces">
    <button class="heroImage heroImage--main" type="button" (click)="viewProduct(products[0])" aria-label="View Silver White Jewellery Set">
      <img [src]="mainProductImage(products[0])?.src" [alt]="mainProductImage(products[0])?.alt" fetchpriority="high">
    </button>
    <button class="heroImage heroImage--accent" type="button" (click)="viewProduct(products[2])" aria-label="View Black Jewellery Set">
      <img [src]="mainProductImage(products[2])?.src" [alt]="mainProductImage(products[2])?.alt">
    </button>
    <div class="heroMonogram" aria-hidden="true">
      <small>Curated by</small>
      <b>UZR</b>
      <span>JEWELLERY</span>
    </div>
  </div>
</section>

<section class="trustRibbon" aria-label="UZR Jewellery shopping benefits">
  <div><i class="fa-regular fa-gem"></i><span><b>Curated collection</b><small>Carefully selected styles</small></span></div>
  <div><i class="fa-solid fa-box"></i><span><b>Secure handling</b><small>Prepared with care</small></span></div>
  <div><i class="fa-solid fa-money-bill-wave"></i><span><b>Flexible payment</b><small>COD or online transfer</small></span></div>
  <div><i class="fa-brands fa-whatsapp"></i><span><b>Personal support</b><small>Confirmation on WhatsApp</small></span></div>
</section>

<section class="shopShell" id="products">
  <div class="shopHeader">
    <div>
      <span class="eyebrow">The UZR edit</span>
      <h2>Find your signature piece</h2>
      <p>Modern accents for everyday moments, celebrations and thoughtful gifts.</p>
    </div>
    <button class="cartSummary" type="button" (click)="openCart()">
      <i class="fa-solid fa-cart-shopping"></i>
      {{ cartItemLabel }} · {{ formatPrice(cartTotal) }}
    </button>
  </div>

  <div class="collectionFilters" aria-label="Filter jewellery collection">
    @for (filter of productFilters; track filter) {
      <button
        type="button"
        [class.is-active]="activeFilter === filter"
        [attr.aria-pressed]="activeFilter === filter"
        (click)="setProductFilter(filter)"
      >
        {{ filter === 'All' ? 'All collection' : filter }}
      </button>
    }
  </div>

  <div class="productGrid">
    @for (product of filteredProducts; track product.id) {
      <article class="productCard">
        <button class="photo" type="button" (click)="viewProduct(product)">
          @if (product.badge) {
            <span class="badge">{{ product.badge }}</span>
          }
          @if (mainProductImage(product); as image) {
            @if (!isMissingImage(image.src)) {
              <img [src]="image.src" [alt]="image.alt" loading="lazy" decoding="async" (error)="markMissingImage(image.src)">
            } @else {
              <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
            }
          } @else {
            <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
          }
        </button>

        <div class="productInfo">
          <div class="productTitleRow">
            <div>
              <small>{{ product.category }}</small>
              <h3>{{ product.name }}</h3>
            </div>
            <strong>{{ formatPrice(product.price) }}</strong>
          </div>
          <button class="viewDetails" type="button" (click)="viewProduct(product)">View details <i class="fa-solid fa-arrow-right"></i></button>
          <div class="productActions">
            <button type="button" (click)="addToCart(product)">
              <i class="fa-solid fa-cart-plus"></i>
              Add to Cart
            </button>
            <button class="buyBtn" type="button" (click)="buyNow(product)">
              <i class="fa-solid fa-bolt"></i>
              Buy Now
            </button>
          </div>
        </div>
      </article>
    }
  </div>
</section>

<section class="brandStory">
  <div class="brandStoryCopy">
    <span class="eyebrow">Made for your moments</span>
    <h2>Small details.<br><em>Lasting impressions.</em></h2>
    <p>UZR Jewellery brings together polished, accessible pieces with the convenience of local ordering. See every available view, choose your favourite and confirm the complete order directly on WhatsApp.</p>
    <a href="#products">Discover the collection <i class="fa-solid fa-arrow-right"></i></a>
  </div>
  <button class="brandStoryImage" type="button" (click)="viewProduct(products[6])" aria-label="View Golden Watch">
    <img [src]="mainProductImage(products[6])?.src" [alt]="mainProductImage(products[6])?.alt" loading="lazy">
    <span>Golden details<br><b>Timeless style</b></span>
  </button>
</section>

@if (selectedProduct) {
  <div class="overlay" (click)="closeProduct()"></div>
  <section
    #productDialog
    class="productDialog"
    role="dialog"
    aria-modal="true"
    aria-label="Product detail"
    tabindex="-1"
    (keydown.arrowleft)="showPreviousImage()"
    (keydown.arrowright)="showNextImage()"
    (keydown.escape)="closeProduct()"
  >
    <button class="iconClose" type="button" aria-label="Close product detail" (click)="closeProduct()">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div
      class="detailGallery"
      (touchstart)="onGalleryTouchStart($event)"
      (touchend)="onGalleryTouchEnd($event)"
    >
      <div class="detailPhoto">
      @if (selectedGalleryImage; as image) {
        @if (!isMissingImage(image.src)) {
          <img [src]="image.src" [alt]="image.alt" (error)="markMissingImage(image.src)">
        } @else {
          <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
        }
      } @else {
        <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
      }
        @if (hasMultipleSelectedImages) {
          <button class="galleryNav galleryNav--prev" type="button" aria-label="Previous product image" (click)="showPreviousImage()">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="galleryNav galleryNav--next" type="button" aria-label="Next product image" (click)="showNextImage()">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        }
      </div>

      @if (hasMultipleSelectedImages) {
        <div class="galleryThumbs" aria-label="Product image thumbnails">
          @for (image of selectedProduct.images; track image.src; let index = $index) {
            <button
              type="button"
              [class.is-active]="index === selectedImageIndex"
              [attr.aria-label]="'Show image ' + (index + 1) + ' of ' + selectedProduct.images.length"
              [attr.aria-current]="index === selectedImageIndex ? 'true' : null"
              (click)="selectGalleryImage(index)"
            >
              @if (!isMissingImage(image.src)) {
                <img [src]="image.src" [alt]="image.alt" (error)="markMissingImage(image.src)">
              } @else {
                <i class="fa-solid fa-gem"></i>
              }
            </button>
          }
        </div>
      }
    </div>

    <div class="detailCopy">
      <span class="eyebrow">{{ selectedProduct.category }}</span>
      <h2>{{ selectedProduct.name }}</h2>
      <p>{{ selectedProduct.description }}</p>
      <dl class="detailMeta">
        @for (detail of productDetailRows(selectedProduct); track detail.label) {
          <div>
            <dt>{{ detail.label }}</dt>
            <dd>{{ detail.value }}</dd>
          </div>
        }
      </dl>
      <strong>{{ formatPrice(selectedProduct.price) }}</strong>
      <div class="detailActions">
        <button class="darkAction" type="button" (click)="addToCart(selectedProduct); closeProduct()">
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
        <button class="lightAction" type="button" (click)="buyNow(selectedProduct)">
          Buy Now
        </button>
      </div>
    </div>
  </section>
}

@if (isCartOpen) {
  <div class="overlay" (click)="closeCart()"></div>
  <aside class="cartDrawer" aria-label="Shopping cart">
    <div class="drawerHead">
      <div>
        <span class="eyebrow">Your Cart</span>
        <h2>{{ cartItemLabel }}</h2>
      </div>
      <div class="drawerActions">
        @if (cart.length > 0) {
          <button #startNewOrderButton class="resetOrderBtn" type="button" (click)="startNewOrder()">
            Start New Order
          </button>
        }
        <button class="iconClose" type="button" aria-label="Close cart" (click)="closeCart()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    @if (cart.length === 0) {
      <div class="emptyCart">
        <i class="fa-solid fa-bag-shopping"></i>
        <b>Your cart is empty</b>
        <p>Add Jewellery items to continue checkout.</p>
      </div>
    } @else {
      <div class="cartItems">
        @for (item of cart; track item.product.id) {
          <div class="cartItem">
            <span class="cartPhoto">
              @if (mainProductImage(item.product); as image) {
                @if (!isMissingImage(image.src)) {
                  <img [src]="image.src" [alt]="image.alt" (error)="markMissingImage(image.src)">
                } @else {
                  <i class="fa-solid fa-gem"></i>
                }
              } @else {
                <i class="fa-solid fa-gem"></i>
              }
            </span>
            <div>
              <b>{{ item.product.name }}</b>
              <small>{{ formatPrice(item.product.price) }}</small>
              <div class="qty">
                <button type="button" (click)="decreaseQuantity(item.product.id)">-</button>
                <span>{{ item.quantity }}</span>
                <button type="button" (click)="increaseQuantity(item.product.id)">+</button>
              </div>
            </div>
            <button class="remove" type="button" aria-label="Remove item" (click)="removeFromCart(item.product.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        }
      </div>

      <div class="checkout">
        <div class="totalRow">
          <span>Subtotal</span>
          <b>{{ formatPrice(cartTotal) }}</b>
        </div>
        <p class="deliveryNote">Delivery charges are not included in the subtotal and will be confirmed on WhatsApp.</p>

        <label>
          Your Name
          <input
            #nameInput
            type="text"
            name="customerName"
            placeholder="Enter name"
            [ngModel]="customerName"
            (ngModelChange)="updateCustomerName($event)"
            [class.invalid]="submitted && !isCustomerNameValid"
            [attr.aria-invalid]="submitted && !isCustomerNameValid"
            aria-describedby="customerNameError"
          >
          @if (submitted && !isCustomerNameValid) {
            <span class="fieldError" id="customerNameError" role="alert">Please enter at least 2 characters.</span>
          }
        </label>

        <label>
          Phone Number
          <input
            #phoneInput
            type="text"
            inputmode="tel"
            autocomplete="tel"
            name="customerPhone"
            placeholder="03xx xxxxxxx"
            [(ngModel)]="customerPhone"
            (input)="updateCustomerPhone(phoneInput.value)"
            [class.invalid]="submitted && !isCustomerPhoneValid"
            [attr.aria-invalid]="submitted && !isCustomerPhoneValid"
            aria-describedby="customerPhoneError"
          >
          @if (submitted && !isCustomerPhoneValid) {
            <span class="fieldError" id="customerPhoneError" role="alert">Enter a valid Pakistani mobile number.</span>
          }
        </label>

        <label>
          Delivery Address
          <textarea
            #addressInput
            name="customerAddress"
            rows="4"
            placeholder="House / street / area"
            [ngModel]="customerAddress"
            (ngModelChange)="updateCustomerAddress($event)"
            [class.invalid]="submitted && !isCustomerAddressValid"
            [attr.aria-invalid]="submitted && !isCustomerAddressValid"
            aria-describedby="customerAddressError"
          ></textarea>
          @if (submitted && !isCustomerAddressValid) {
            <span class="fieldError" id="customerAddressError" role="alert">Please enter a complete delivery address.</span>
          }
        </label>

        <label>
          Note
          <input type="text" name="orderNote" placeholder="Color, size, gift packing..." [ngModel]="orderNote" (ngModelChange)="updateOrderNote($event)">
        </label>

        <fieldset class="paymentMethod" [class.invalid]="submitted && !isPaymentMethodValid">
          <legend>Payment Method</legend>
          <label class="paymentOption">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              [ngModel]="paymentMethod"
              (ngModelChange)="onPaymentMethodChange($event)"
              required
            >
            <span>
              <b>Cash on Delivery</b>
              <small>Pay when your order is delivered.</small>
            </span>
          </label>
          <label class="paymentOption">
            <input
              type="radio"
              name="paymentMethod"
              value="Online Transfer"
              [ngModel]="paymentMethod"
              (ngModelChange)="onPaymentMethodChange($event)"
              required
            >
            <span>
              <b>Online Transfer</b>
              <small>JazzCash, Easypaisa, or Bank Transfer.</small>
            </span>
          </label>
          @if (paymentMethod === 'Online Transfer') {
            <p class="onlinePaymentNote">After submitting your order, payment details will be shared with you on WhatsApp. Your order will be confirmed after payment verification.</p>
          }
          @if (submitted && !isPaymentMethodValid) {
            <span class="fieldError" role="alert">Please select a payment method.</span>
          }
        </fieldset>

        <button class="whatsappBtn" type="button" (click)="confirmOrder()">
          <i class="fab fa-whatsapp"></i>
          Confirm Order on WhatsApp
        </button>
      </div>
    }
  </aside>
}

@if (isStartNewOrderModalOpen) {
  <div class="confirmBackdrop" (click)="closeStartNewOrderModal()"></div>
  <section
    #startNewOrderDialog
    class="confirmDialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="startNewOrderTitle"
    tabindex="-1"
    (keydown.escape)="closeStartNewOrderModal()"
  >
    <button class="confirmClose" type="button" aria-label="Close confirmation" (click)="closeStartNewOrderModal()">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="confirmIcon" aria-hidden="true">
      <i class="fa-solid fa-triangle-exclamation"></i>
    </div>

    <h2 id="startNewOrderTitle">Start a New Order?</h2>
    <p>Your current cart contains {{ cartItemLabel }}. Starting a new order will clear your cart and checkout details.</p>
    <strong>This action cannot be undone.</strong>

    <div class="confirmActions">
      <button class="keepOrderBtn" type="button" (click)="closeStartNewOrderModal()">
        Keep Current Order
      </button>
      <button class="confirmResetBtn" type="button" (click)="confirmStartNewOrder()">
        Yes, Start New Order
      </button>
    </div>
  </section>
}

<section class="orderInfo">
  <div class="sectionIntro">
    <span class="eyebrow">The UZR promise</span>
    <h2>Beautifully simple shopping</h2>
    <p>Clear product details and personal order support from selection to confirmation.</p>
  </div>
  <div class="infoList">
    <article><span>01</span><i class="fa-regular fa-eye"></i><h3>See every detail</h3><p>Open a product to view its available gallery, colour, finish and product information.</p></article>
    <article><span>02</span><i class="fa-solid fa-bag-shopping"></i><h3>Build your order</h3><p>Add one or more pieces to your bag. Your cart stays saved when the page refreshes.</p></article>
    <article><span>03</span><i class="fa-brands fa-whatsapp"></i><h3>Confirm personally</h3><p>Send your complete order summary to UZR on WhatsApp for delivery confirmation.</p></article>
  </div>
</section>

<section class="shopPolicies">
  <div class="sectionIntro">
    <span class="eyebrow">Shop with clarity</span>
    <h2>Helpful details before you order</h2>
  </div>
  <div class="policyGrid">
    <a routerLink="/return-exchange-policy">
      <i class="fa-solid fa-rotate-left"></i>
      <b>Return & Exchange Policy</b>
      <span>Review simple return and exchange guidance before ordering.</span>
    </a>
    <a routerLink="/delivery-policy">
      <i class="fa-solid fa-truck-fast"></i>
      <b>Delivery Policy</b>
      <span>Learn how Kohat delivery charges and timing are confirmed.</span>
    </a>
    <a routerLink="/privacy-policy">
      <i class="fa-solid fa-shield-halved"></i>
      <b>Privacy Policy</b>
      <span>See how order and contact details are used for service support.</span>
    </a>
    <a routerLink="/terms-conditions">
      <i class="fa-solid fa-file-contract"></i>
      <b>Terms & Conditions</b>
      <span>Understand the basic ordering terms for UZR Express services.</span>
    </a>
  </div>
</section>
`,
  styleUrls: ['./jewelry.component.scss']
})
export class JewelryComponent implements OnInit {
  private readonly cartStorageKey = 'uzr_express_cart';
  private readonly checkoutDraftStorageKey = 'uzr_express_checkout_draft';
  private readonly maxQuantity = 99;
  private readonly whatsappNumber = '923368877657';
  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('phoneInput') phoneInput?: ElementRef<HTMLInputElement>;
  @ViewChild('addressInput') addressInput?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('startNewOrderButton') startNewOrderButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('startNewOrderDialog') startNewOrderDialog?: ElementRef<HTMLElement>;
  @ViewChild('productDialog') productDialog?: ElementRef<HTMLElement>;

  products: JewelryProduct[] = JEWELRY_PRODUCTS;
  readonly productFilters: ProductFilter[] = ['All', 'Jewellery Set', 'Pendant', 'Watch'];
  activeFilter: ProductFilter = 'All';

  cart: CartItem[] = [];
  selectedProduct: JewelryProduct | null = null;
  selectedImageIndex = 0;
  isCartOpen = false;
  isStartNewOrderModalOpen = false;
  customerName = '';
  customerPhone = '';
  customerAddress = '';
  orderNote = '';
  paymentMethod: PaymentMethod = 'Cash on Delivery';
  submitted = false;
  private missingImageSources = new Set<string>();
  private galleryTouchStartX: number | null = null;

  ngOnInit(): void {
    this.restoreCart();
    this.restoreCheckoutDraft();
  }

  get cartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartItemLabel(): string {
    return `${this.cartCount} ${this.cartCount === 1 ? 'item' : 'items'}`;
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get filteredProducts(): JewelryProduct[] {
    return this.activeFilter === 'All'
      ? this.products
      : this.products.filter((product) => product.category === this.activeFilter);
  }

  setProductFilter(filter: ProductFilter): void {
    this.activeFilter = filter;
  }

  get selectedGalleryImage(): JewelryProductImage | null {
    if (!this.selectedProduct) {
      return null;
    }

    return this.selectedProduct.images[this.selectedImageIndex] || this.mainProductImage(this.selectedProduct);
  }

  get hasMultipleSelectedImages(): boolean {
    return (this.selectedProduct?.images.length || 0) > 1;
  }

  get isCustomerNameValid(): boolean {
    return this.customerName.trim().length >= 2;
  }

  get isCustomerPhoneValid(): boolean {
    return /^(03\d{9}|923\d{9}|\+923\d{9})$/.test(this.customerPhone.trim().replace(/\s|-/g, ''));
  }

  get isCustomerAddressValid(): boolean {
    return this.customerAddress.trim().length >= 8;
  }

  get isPaymentMethodValid(): boolean {
    return this.paymentMethod === 'Cash on Delivery' || this.paymentMethod === 'Online Transfer';
  }

  get whatsappOrderUrl(): string {
    const items = this.cart
      .map((item, index) =>
        `${index + 1}. ${item.product.name} (${item.product.category}) - ${this.formatPrice(item.product.price)} x ${item.quantity} = ${this.formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');

    const message = [
      'Assalam o Alaikum, I want to confirm my Jewellery order from UZR Express.',
      '',
      'Order Items:',
      items || '-',
      '',
      `Subtotal: ${this.formatPrice(this.cartTotal)}`,
      'Delivery charges are not included in the subtotal and will be confirmed on WhatsApp.',
      `Payment Method: ${this.paymentMethod || '-'}`,
      ...(this.paymentMethod === 'Online Transfer'
        ? ['Online payment selected. Payment will be manually verified by UZR before order confirmation.']
        : []),
      '',
      `Name: ${this.customerName || '-'}`,
      `Phone: ${this.customerPhone || '-'}`,
      `Address: ${this.customerAddress || '-'}`,
      `Note: ${this.orderNote || '-'}`
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  formatPrice(value: number): string {
    return `Rs ${value.toLocaleString('en-PK')}`;
  }

  productDetailRows(product: JewelryProduct): Array<{ label: string; value: string }> {
    return [
      { label: 'Material', value: product.material || 'Details confirmed on WhatsApp' },
      { label: 'Size', value: product.size || 'Size details confirmed before order' },
      { label: 'Colour', value: product.colour || 'Colour options confirmed on WhatsApp' },
      { label: 'Availability', value: product.availability || 'Confirmed before order completion' }
    ];
  }

  mainProductImage(product: JewelryProduct): JewelryProductImage | null {
    return product.images[0] || null;
  }

  isMissingImage(src: string): boolean {
    return this.missingImageSources.has(src);
  }

  markMissingImage(src: string): void {
    this.missingImageSources.add(src);
  }

  viewProduct(product: JewelryProduct): void {
    this.selectedProduct = product;
    this.selectedImageIndex = 0;
    this.updateBodyScrollLock();
    setTimeout(() => this.productDialog?.nativeElement.focus());
  }

  closeProduct(): void {
    this.selectedProduct = null;
    this.selectedImageIndex = 0;
    this.updateBodyScrollLock();
  }

  selectGalleryImage(index: number): void {
    if (!this.selectedProduct) {
      return;
    }

    this.selectedImageIndex = Math.min(
      this.selectedProduct.images.length - 1,
      Math.max(0, index)
    );
  }

  showPreviousImage(): void {
    if (!this.hasMultipleSelectedImages || !this.selectedProduct) {
      return;
    }

    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.selectedProduct.images.length) %
      this.selectedProduct.images.length;
  }

  showNextImage(): void {
    if (!this.hasMultipleSelectedImages || !this.selectedProduct) {
      return;
    }

    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.selectedProduct.images.length;
  }

  onGalleryTouchStart(event: TouchEvent): void {
    this.galleryTouchStartX = event.changedTouches[0]?.clientX ?? null;
  }

  onGalleryTouchEnd(event: TouchEvent): void {
    if (this.galleryTouchStartX === null || !this.hasMultipleSelectedImages) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? this.galleryTouchStartX;
    const deltaX = endX - this.galleryTouchStartX;
    this.galleryTouchStartX = null;

    if (Math.abs(deltaX) < 42) {
      return;
    }

    deltaX < 0 ? this.showNextImage() : this.showPreviousImage();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isStartNewOrderModalOpen) {
      this.closeStartNewOrderModal();
      return;
    }

    if (this.selectedProduct) {
      this.closeProduct();
      return;
    }

    if (this.isCartOpen) {
      this.closeCart();
    }
  }

  addToCart(product: JewelryProduct): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === product.id);

    if (item) {
      item.quantity = this.normalizeQuantity(item.quantity + 1);
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.saveCart();
  }

  buyNow(product: JewelryProduct): void {
    this.addToCart(product);
    this.closeProduct();
    this.openCart();
  }

  openCart(): void {
    this.isCartOpen = true;
    this.updateBodyScrollLock();
  }

  closeCart(): void {
    this.isCartOpen = false;
    this.updateBodyScrollLock();
  }

  increaseQuantity(productId: number): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);

    if (item) {
      item.quantity = this.normalizeQuantity(item.quantity + 1);
      this.saveCart();
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
      return;
    }

    item.quantity = this.normalizeQuantity(item.quantity - 1);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
    this.saveCart();
  }

  updateCustomerName(value: string): void {
    this.customerName = value;
    this.saveCheckoutDraft();
  }

  updateCustomerPhone(value: string): void {
    this.customerPhone = value;
    this.saveCheckoutDraft();
  }

  updateCustomerAddress(value: string): void {
    this.customerAddress = value;
    this.saveCheckoutDraft();
  }

  updateOrderNote(value: string): void {
    this.orderNote = value;
    this.saveCheckoutDraft();
  }

  onPaymentMethodChange(value: string): void {
    this.paymentMethod = this.normalizePaymentMethod(value);
    this.saveCart();
  }

  startNewOrder(): void {
    if (this.cart.length > 0) {
      this.openStartNewOrderModal();
      return;
    }

    this.resetCurrentOrder();
  }

  confirmStartNewOrder(): void {
    this.resetCurrentOrder();
    this.closeStartNewOrderModal({ restoreFocus: false });
  }

  closeStartNewOrderModal(options: { restoreFocus?: boolean } = {}): void {
    const { restoreFocus = true } = options;

    this.isStartNewOrderModalOpen = false;
    this.updateBodyScrollLock();

    if (restoreFocus) {
      setTimeout(() => this.startNewOrderButton?.nativeElement.focus());
    }
  }

  private openStartNewOrderModal(): void {
    this.isStartNewOrderModalOpen = true;
    this.updateBodyScrollLock();
    setTimeout(() => this.startNewOrderDialog?.nativeElement.focus());
  }

  private resetCurrentOrder(): void {
    this.cart = [];
    this.customerName = '';
    this.customerPhone = '';
    this.customerAddress = '';
    this.orderNote = '';
    this.paymentMethod = 'Cash on Delivery';
    this.submitted = false;
    this.removeStoredCart();
    this.removeCheckoutDraft();
  }

  confirmOrder(): void {
    this.submitted = true;

    if (!this.isCustomerNameValid) {
      this.focusInvalidField(this.nameInput);
      return;
    }

    if (!this.isCustomerPhoneValid) {
      this.focusInvalidField(this.phoneInput);
      return;
    }

    if (!this.isCustomerAddressValid) {
      this.focusInvalidField(this.addressInput);
      return;
    }

    if (!this.isPaymentMethodValid) {
      return;
    }

    window.open(this.whatsappOrderUrl, '_blank', 'noopener,noreferrer');
  }

  private focusInvalidField(field?: ElementRef<HTMLInputElement | HTMLTextAreaElement>): void {
    field?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field?.nativeElement.focus();
  }

  private updateBodyScrollLock(): void {
    document.body.classList.toggle(
      'modal-open',
      this.isCartOpen || !!this.selectedProduct || this.isStartNewOrderModalOpen
    );
  }

  private restoreCart(): void {
    const storedCart = this.readJson<StoredCart>('local', this.cartStorageKey);

    if (!storedCart) {
      return;
    }

    this.paymentMethod = this.normalizePaymentMethod(storedCart.paymentMethod);

    if (!Array.isArray(storedCart.items)) {
      this.cart = [];
      this.saveCart();
      return;
    }

    const restoredItems = new Map<number, CartItem>();

    storedCart.items.forEach((storedItem) => {
      const product = this.products.find((item) => item.id === storedItem.id);
      const quantity = this.normalizeStoredQuantity(storedItem.quantity);

      if (!product || quantity === null) {
        return;
      }

      const existingItem = restoredItems.get(product.id);
      const updatedQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      restoredItems.set(product.id, {
        product,
        quantity: this.normalizeQuantity(updatedQuantity)
      });
    });

    this.cart = Array.from(restoredItems.values());

    this.saveCart();
  }

  private restoreCheckoutDraft(): void {
    const draft = this.readJson<CheckoutDraft>('session', this.checkoutDraftStorageKey);

    if (!draft) {
      return;
    }

    this.customerName = typeof draft.customerName === 'string' ? draft.customerName : '';
    this.customerPhone = typeof draft.customerPhone === 'string' ? draft.customerPhone : '';
    this.customerAddress = typeof draft.customerAddress === 'string' ? draft.customerAddress : '';
    this.orderNote = typeof draft.orderNote === 'string' ? draft.orderNote : '';
  }

  saveCheckoutDraft(): void {
    this.writeJson('session', this.checkoutDraftStorageKey, {
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      customerAddress: this.customerAddress,
      orderNote: this.orderNote
    });
  }

  private saveCart(): void {
    this.writeJson('local', this.cartStorageKey, {
      items: this.cart.map((item) => ({
        id: item.product.id,
        quantity: this.normalizeQuantity(item.quantity)
      })),
      paymentMethod: this.paymentMethod
    });
  }

  private normalizeQuantity(value: unknown): number {
    const quantity = Number(value);

    if (!Number.isFinite(quantity)) {
      return 1;
    }

    return Math.min(this.maxQuantity, Math.max(1, Math.floor(quantity)));
  }

  private normalizeStoredQuantity(value: unknown): number | null {
    const quantity = Number(value);

    if (!Number.isFinite(quantity) || quantity < 1) {
      return null;
    }

    return Math.min(this.maxQuantity, Math.floor(quantity));
  }

  private normalizePaymentMethod(value: unknown): PaymentMethod {
    return value === 'Online Transfer' ? 'Online Transfer' : 'Cash on Delivery';
  }

  private readJson<T>(storageType: 'local' | 'session', key: string): T | null {
    const storage = this.getStorage(storageType);

    if (!storage) {
      return null;
    }

    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      try {
        storage.removeItem(key);
      } catch {
        // Storage may become unavailable between read and cleanup.
      }

      return null;
    }
  }

  private writeJson(storageType: 'local' | 'session', key: string, value: unknown): void {
    const storage = this.getStorage(storageType);

    if (!storage) {
      return;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch {
      // Checkout remains usable if browser storage is full or blocked.
    }
  }

  private removeStoredCart(): void {
    this.removeStorageItem('local', this.cartStorageKey);
  }

  private removeCheckoutDraft(): void {
    this.removeStorageItem('session', this.checkoutDraftStorageKey);
  }

  private removeStorageItem(storageType: 'local' | 'session', key: string): void {
    const storage = this.getStorage(storageType);

    if (!storage) {
      return;
    }

    try {
      storage.removeItem(key);
    } catch {
      // Checkout remains usable if browser storage is unavailable.
    }
  }

  private getStorage(storageType: 'local' | 'session'): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return storageType === 'local' ? window.localStorage : window.sessionStorage;
    } catch {
      return null;
    }
  }
}
