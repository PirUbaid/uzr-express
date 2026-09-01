import { Component } from '@angular/core';
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
    <span class="pill">UZR Jewelry Collection</span>
    <h1>Shop Jewelry Online</h1>
    <p>Choose items, add them to your cart, enter delivery details, and confirm your order on WhatsApp.</p>
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
    <b>Jewelry delivered in Kohat</b>
    <span>WhatsApp confirmation with full product summary.</span>
  </div>
</section>

<section class="shopShell" id="products">
  <div class="shopHeader">
    <div>
      <span class="eyebrow">Products</span>
      <h2>Available Jewelry</h2>
    </div>
    <button class="cartSummary" type="button" (click)="openCart()">
      <i class="fa-solid fa-cart-shopping"></i>
      {{ cartCount }} items · Rs {{ cartTotal }}
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
            <span class="photoFallback"><i class="fa-solid fa-gem"></i></span>
          }
        </button>

        <div class="productInfo">
          <small>{{ product.category }}</small>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <div class="productFoot">
            <strong>Rs {{ product.price }}</strong>
            <button type="button" (click)="addToCart(product)">
              <i class="fa-solid fa-plus"></i>
              Add
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
        <span class="photoFallback"><i class="fa-solid fa-gem"></i></span>
      }
    </div>

    <div class="detailCopy">
      <span class="eyebrow">{{ selectedProduct.category }}</span>
      <h2>{{ selectedProduct.name }}</h2>
      <p>{{ selectedProduct.description }}</p>
      <strong>Rs {{ selectedProduct.price }}</strong>
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
        <h2>{{ cartCount }} items</h2>
      </div>
      <button class="iconClose" type="button" aria-label="Close cart" (click)="closeCart()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    @if (cart.length === 0) {
      <div class="emptyCart">
        <i class="fa-solid fa-bag-shopping"></i>
        <b>Your cart is empty</b>
        <p>Add jewelry items to continue checkout.</p>
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
              <small>Rs {{ item.product.price }}</small>
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
          <b>Rs {{ cartTotal }}</b>
        </div>

        <label>
          Your Name
          <input type="text" placeholder="Enter name" [(ngModel)]="customerName">
        </label>

        <label>
          Phone Number
          <input type="tel" placeholder="03xx xxxxxxx" [(ngModel)]="customerPhone">
        </label>

        <label>
          Delivery Address
          <textarea rows="4" placeholder="House / street / area" [(ngModel)]="customerAddress"></textarea>
        </label>

        <label>
          Note
          <input type="text" placeholder="Color, size, gift packing..." [(ngModel)]="orderNote">
        </label>

        <a class="whatsappBtn" [href]="whatsappOrderUrl" target="_blank">
          <i class="fab fa-whatsapp"></i>
          Confirm Order on WhatsApp
        </a>
      </div>
    }
  </aside>
}
`,
  styleUrls: ['./jewelry.component.scss']
})
export class JewelryComponent {
  private readonly whatsappNumber = '923368877657';

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
      name: 'Pearl Jewelry Set',
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

  get cartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get whatsappOrderUrl(): string {
    const items = this.cart
      .map((item, index) =>
        `${index + 1}. ${item.product.name} (${item.product.category}) - Rs ${item.product.price} x ${item.quantity} = Rs ${item.product.price * item.quantity}`
      )
      .join('\n');

    const message = [
      'Assalam o Alaikum, I want to confirm my jewelry order from UZR Express.',
      '',
      'Order Items:',
      items || '-',
      '',
      `Subtotal: Rs ${this.cartTotal}`,
      '',
      `Name: ${this.customerName || '-'}`,
      `Phone: ${this.customerPhone || '-'}`,
      `Address: ${this.customerAddress || '-'}`,
      `Note: ${this.orderNote || '-'}`
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  viewProduct(product: JewelryProduct): void {
    this.selectedProduct = product;
  }

  closeProduct(): void {
    this.selectedProduct = null;
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
  }

  closeCart(): void {
    this.isCartOpen = false;
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
}
