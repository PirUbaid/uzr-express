import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type JewelryProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  badge?: string;
  description: string;
};

type CartItem = {
  product: JewelryProduct;
  quantity: number;
};

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
<section class="jewelryHero">
  <div class="heroCopy">
    <span class="pill">UZR Jewellery Collection</span>
    <h1>Shop Jewellery Online</h1>
    <p>Customers in Kohat can order Jewellery from UZR Express through WhatsApp with Cash on Delivery and delivery charges confirmed before completion.</p>
    <div class="heroActions">
      <a class="shopNow" href="#products">Shop Now</a>
      <button class="cartBtn" type="button" (click)="openCart()">
        <i class="fa-solid fa-bag-shopping"></i>
        Cart
        @if (cartCount > 0) {
          <span>{{ cartCount }}</span>
        }
      </button>
    </div>
  </div>

  <div class="heroPanel">
    <strong>Cash on Delivery</strong>
    <b>Jewellery delivered in Kohat</b>
    <span>WhatsApp confirmation with full product summary.</span>
  </div>
</section>

<section class="shopShell" id="products">
  <div class="shopHeader">
    <div>
      <span class="eyebrow">Products</span>
      <h2>Available Jewellery</h2>
    </div>
    <button class="cartSummary" type="button" (click)="openCart()">
      <i class="fa-solid fa-cart-shopping"></i>
      {{ cartItemLabel }} · {{ formatPrice(cartTotal) }}
    </button>
  </div>

  <div class="productGrid">
    @for (product of products; track product.id) {
      <article class="productCard">
        <button class="photo" type="button" (click)="viewProduct(product)">
          @if (product.badge) {
            <span class="badge">{{ product.badge }}</span>
          }
          @if (product.image) {
            <img [src]="product.image" [alt]="product.name">
          } @else {
            <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
          }
        </button>

        <div class="productInfo">
          <small>{{ product.category }}</small>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <div class="productPrice">
            <strong>{{ formatPrice(product.price) }}</strong>
          </div>
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

@if (selectedProduct) {
  <div class="overlay" (click)="closeProduct()"></div>
  <section class="productDialog" role="dialog" aria-label="Product detail">
    <button class="iconClose" type="button" aria-label="Close product detail" (click)="closeProduct()">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="detailPhoto">
      @if (selectedProduct.image) {
        <img [src]="selectedProduct.image" [alt]="selectedProduct.name">
      } @else {
        <span class="photoFallback"><i class="fa-solid fa-gem"></i><small>Photo coming soon</small></span>
      }
    </div>

    <div class="detailCopy">
      <span class="eyebrow">{{ selectedProduct.category }}</span>
      <h2>{{ selectedProduct.name }}</h2>
      <p>{{ selectedProduct.description }}</p>
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
      <button class="iconClose" type="button" aria-label="Close cart" (click)="closeCart()">
        <i class="fa-solid fa-xmark"></i>
      </button>
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
              @if (item.product.image) {
                <img [src]="item.product.image" [alt]="item.product.name">
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
            placeholder="Enter name"
            [(ngModel)]="customerName"
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
            type="tel"
            placeholder="03xx xxxxxxx"
            [(ngModel)]="customerPhone"
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
            rows="4"
            placeholder="House / street / area"
            [(ngModel)]="customerAddress"
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
          <input type="text" placeholder="Color, size, gift packing..." [(ngModel)]="orderNote">
        </label>

        <button class="whatsappBtn" type="button" (click)="confirmOrder()">
          <i class="fab fa-whatsapp"></i>
          Confirm Order on WhatsApp
        </button>
      </div>
    }
  </aside>
}

<section class="orderInfo">
  <span class="eyebrow">Order Information</span>
  <h2>Before You Order</h2>
  <div class="infoList">
    <p><i class="fa-solid fa-money-bill-wave"></i> Cash on Delivery</p>
    <p><i class="fa-brands fa-whatsapp"></i> WhatsApp order confirmation</p>
    <p><i class="fa-solid fa-location-dot"></i> Delivery within Kohat</p>
    <p><i class="fa-solid fa-truck"></i> Delivery charges confirmed on WhatsApp</p>
  </div>
  <p class="ownerNeeded">Business information still required: return policy, exchange policy, warranty details, material, size, colour and stock status.</p>
</section>
`,
  styleUrls: ['./jewelry.component.scss']
})
export class JewelryComponent {
  private readonly whatsappNumber = '923368877657';
  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('phoneInput') phoneInput?: ElementRef<HTMLInputElement>;
  @ViewChild('addressInput') addressInput?: ElementRef<HTMLTextAreaElement>;

  products: JewelryProduct[] = [
    {
      id: 1,
      name: 'Elegant Necklace Set',
      price: 2500,
      category: 'Necklace',
      badge: 'Popular',
      image: '',
      description: 'A polished necklace set for parties, gifting, and everyday styling.'
    },
    {
      id: 2,
      name: 'Gold Plated Earrings',
      price: 1200,
      category: 'Earrings',
      badge: 'New',
      image: '',
      description: 'Lightweight gold plated earrings with a clean premium finish.'
    },
    {
      id: 3,
      name: 'Classic Bracelet',
      price: 1500,
      category: 'Bracelet',
      image: '',
      description: 'Simple bracelet design that pairs well with daily and formal looks.'
    },
    {
      id: 4,
      name: 'Party Ring',
      price: 900,
      category: 'Ring',
      image: '',
      description: 'Statement ring with a bright finish for casual and party wear.'
    },
    {
      id: 5,
      name: 'Bridal Bangles',
      price: 3200,
      category: 'Bangles',
      badge: 'Hot',
      image: '',
      description: 'Detailed bangles set for bridal, festive, and gift orders.'
    },
    {
      id: 6,
      name: 'Pearl Jewellery Set',
      price: 2800,
      category: 'Set',
      image: '',
      description: 'Soft pearl-style set with a graceful look for events and gifts.'
    }
  ];

  cart: CartItem[] = [];
  selectedProduct: JewelryProduct | null = null;
  isCartOpen = false;
  customerName = '';
  customerPhone = '';
  customerAddress = '';
  orderNote = '';
  submitted = false;

  get cartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartItemLabel(): string {
    return `${this.cartCount} ${this.cartCount === 1 ? 'item' : 'items'}`;
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
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

  viewProduct(product: JewelryProduct): void {
    this.selectedProduct = product;
    this.updateBodyScrollLock();
  }

  closeProduct(): void {
    this.selectedProduct = null;
    this.updateBodyScrollLock();
  }

  addToCart(product: JewelryProduct): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === product.id);

    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
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
      item.quantity += 1;
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

    item.quantity -= 1;
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
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

    window.open(this.whatsappOrderUrl, '_blank', 'noopener,noreferrer');
  }

  private focusInvalidField(field?: ElementRef<HTMLInputElement | HTMLTextAreaElement>): void {
    field?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field?.nativeElement.focus();
  }

  private updateBodyScrollLock(): void {
    document.body.classList.toggle('modal-open', this.isCartOpen || !!this.selectedProduct);
  }
}
