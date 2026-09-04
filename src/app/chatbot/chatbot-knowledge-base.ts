import { JEWELRY_PRODUCTS } from '../data/jewelry-products';
import { ChatbotAction, ChatbotIntent } from './chatbot.models';

export const UZR_WHATSAPP_NUMBER = '923368877657';
export const UZR_SUPPORT_WHATSAPP_URL =
  `https://wa.me/${UZR_WHATSAPP_NUMBER}?text=Assalamualaikum%2C%20I%20need%20help%20from%20UZR%20Express%20support.`;

const whatsappAction: ChatbotAction = {
  label: 'Contact WhatsApp',
  url: UZR_SUPPORT_WHATSAPP_URL,
};

const jewelryPriceList = JEWELRY_PRODUCTS
  .map((product) => `${product.name}: Rs. ${product.price}`)
  .join('\n');

export const CHATBOT_QUICK_ACTIONS: ChatbotAction[] = [
  { label: 'Our Services', route: '/services' },
  { label: 'Shop Jewellery', route: '/jewelry' },
  { label: 'Jewellery Prices', route: '/jewelry' },
  { label: 'Delivery Charges', url: UZR_SUPPORT_WHATSAPP_URL },
  { label: 'Track Order', route: '/track-order' },
  { label: 'Payment Options', route: '/jewelry' },
  { label: 'Office Address', route: '/contact' },
  { label: 'Become a Rider', route: '/become-rider' },
  whatsappAction,
];

export const CHATBOT_SYNONYMS: Record<string, string[]> = {
  delivery: ['delievry', 'dilervry', 'deliveri', 'deliver', 'dilevery'],
  jewelry: ['jewellery', 'jewellry', 'jwellery', 'jewllery', 'jewelry'],
  price: ['rate', 'rates', 'kitne', 'kitni', 'qeemat', 'qimat'],
  order: ['booking', 'book', 'mangwana', 'khareedna', 'buy', 'purchase'],
  payment: ['pay', 'cod', 'cash', 'jazzcash', 'easypaisa', 'transfer'],
  address: ['location', 'office', 'kahan', 'kidhar', 'pata'],
  rider: ['job', 'jobs', 'apply', 'banna'],
  business: ['partnership', 'partner', 'merchant', 'restaurant', 'shop'],
  track: ['tracking', 'status', 'kahan', 'mera'],
};

export const CHATBOT_INTENTS: ChatbotIntent[] = [
  {
    id: 'greeting',
    keywords: { hi: 4, hello: 4, salam: 5, assalam: 5, alaikum: 3, aoa: 5, hey: 3 },
    reply: 'Assalam-o-Alaikum! Welcome to UZR Express. How can I help you today?',
  },
  {
    id: 'what-is-uzr',
    keywords: { uzr: 5, usr: 4, express: 2, what: 2, kya: 2, about: 2 },
    phrases: ['uzr express', 'what is uzr', 'uzr kya hai'],
    reply:
      'UZR Express is a local Kohat City delivery and jewellery ordering service. Customers can order delivery support and jewellery through WhatsApp with UZR team confirmation.',
    actions: [{ label: 'Our Services', route: '/services' }, whatsappAction],
  },
  {
    id: 'meaning',
    keywords: { meaning: 5, matlab: 5, full: 3, form: 3, uzr: 4 },
    reply:
      'The website uses UZR as the UZR Express business name and brand. For official brand details, please contact UZR Express on WhatsApp.',
    actions: [whatsappAction],
  },
  {
    id: 'services',
    keywords: {
      service: 4,
      services: 4,
      food: 5,
      grocery: 5,
      parcel: 5,
      document: 5,
      medicine: 5,
      gift: 5,
      delivery: 3,
      same: 2,
      day: 2,
    },
    reply:
      'UZR Express supports food delivery, grocery delivery, parcel and document delivery, medicine delivery, gift delivery, jewellery orders, and local business delivery support in Kohat City. Same-day delivery depends on order details and rider availability.',
    actions: [{ label: 'Our Services', route: '/services' }, { label: 'Business Partnership', route: '/business' }],
  },
  {
    id: 'coverage',
    keywords: { coverage: 5, area: 5, city: 3, kohat: 4, kda: 2, delivery: 3 },
    reply:
      'UZR Express serves Kohat City. Delivery availability for a specific pickup or delivery address is confirmed through WhatsApp.',
    actions: [{ label: 'Contact WhatsApp', url: UZR_SUPPORT_WHATSAPP_URL }],
  },
  {
    id: 'charges',
    keywords: { charge: 5, charges: 5, fee: 4, delivery: 3, price: 2, cost: 3, kitne: 3 },
    reply:
      'Delivery charges depend on the pickup and delivery location. Please share your location on WhatsApp and our team will confirm the charges.',
    actions: [whatsappAction],
  },
  {
    id: 'timing',
    keywords: { timing: 5, time: 4, open: 4, close: 4, closing: 5, kab: 4, hours: 4, delivery: 2 },
    reply:
      'Delivery timing and business-hour availability can depend on order details and rider availability. Please contact UZR Express on WhatsApp for the current timing.',
    actions: [whatsappAction],
  },
  {
    id: 'order',
    keywords: { order: 5, booking: 4, buy: 4, mangwana: 5, khareedna: 5, place: 3, confirm: 3 },
    reply:
      'You can place an order from the website and finalize it through WhatsApp. Choose your items or service details, share your name, phone and address, and the UZR team will confirm the order.',
    actions: [{ label: 'Shop Jewellery', route: '/jewelry' }, whatsappAction],
  },
  {
    id: 'track',
    keywords: { track: 5, tracking: 5, status: 4, order: 3, mera: 3, kahan: 3 },
    phrases: ['mera order kahan hai', 'track order'],
    reply:
      'To track your order, please contact UZR Express on WhatsApp and share your order details.',
    actions: [{ label: 'Track Order', route: '/track-order' }, whatsappAction],
  },
  {
    id: 'payment',
    keywords: { payment: 5, cod: 5, cash: 4, delivery: 2, online: 4, transfer: 4, jazzcash: 5, easypaisa: 5, bank: 4 },
    reply:
      'UZR Express supports Cash on Delivery and manual Online Transfer. Online payment details and verification are handled through WhatsApp. There is no automated online payment gateway.',
    actions: [{ label: 'Shop Jewellery', route: '/jewelry' }, whatsappAction],
  },
  {
    id: 'jewelry',
    keywords: { jewelry: 5, jewellery: 5, set: 2, pendant: 4, watch: 4, product: 3, available: 3, stock: 3 },
    reply:
      'UZR Express currently lists jewellery sets, a gold-tone pendant, and a gold-tone watch. Product availability is confirmed on WhatsApp before order completion.',
    actions: [{ label: 'Shop Jewellery', route: '/jewelry' }, whatsappAction],
  },
  {
    id: 'prices',
    keywords: { price: 5, prices: 5, rate: 5, rates: 5, kitne: 4, kitni: 4, qeemat: 4, jewelry: 3 },
    reply: `Current jewellery prices shown on the website:\n${jewelryPriceList}\n\nDelivery charges are separate and confirmed on WhatsApp.`,
    actions: [{ label: 'Shop Jewellery', route: '/jewelry' }, whatsappAction],
  },
  {
    id: 'address',
    keywords: { address: 5, location: 5, office: 4, kahan: 4, pata: 4, contact: 2 },
    reply:
      'UZR Express address: Near Pearl Oasis, City Centre Gate No. 1, KDA Sector 2, Kohat, Pakistan.',
    actions: [{ label: 'Office Address', route: '/contact' }, whatsappAction],
  },
  {
    id: 'contact',
    keywords: { contact: 5, phone: 5, whatsapp: 5, support: 4, number: 4, help: 3 },
    reply:
      'You can contact UZR Express on WhatsApp or phone at 0336 8877657. International WhatsApp number: +92 336 8877657.',
    actions: [whatsappAction, { label: 'Contact Page', route: '/contact' }],
  },
  {
    id: 'rider',
    keywords: { rider: 5, job: 5, jobs: 5, apply: 4, earn: 3, banna: 4 },
    reply:
      'To become a UZR Express rider in Kohat, use the rider application page or contact the team on WhatsApp for current openings and requirements.',
    actions: [{ label: 'Become a Rider', route: '/become-rider' }, whatsappAction],
  },
  {
    id: 'business',
    keywords: { business: 5, partnership: 5, partner: 5, restaurant: 4, shop: 4, merchant: 4 },
    reply:
      'Restaurants, shops and online sellers can partner with UZR Express for local delivery support in Kohat. The team confirms partnership details through WhatsApp.',
    actions: [{ label: 'Business Partnership', route: '/business' }, whatsappAction],
  },
  {
    id: 'policies',
    keywords: { return: 5, exchange: 5, privacy: 5, terms: 5, conditions: 4, policy: 4, delivery: 2 },
    reply:
      'UZR Express policy pages explain return and exchange guidance, delivery policy, privacy information, and terms. Final order-specific details are confirmed through WhatsApp.',
    actions: [
      { label: 'Return & Exchange', route: '/return-exchange-policy' },
      { label: 'Delivery Policy', route: '/delivery-policy' },
      { label: 'Privacy Policy', route: '/privacy-policy' },
      { label: 'Terms', route: '/terms-conditions' },
    ],
  },
  {
    id: 'thanks',
    keywords: { thanks: 5, thank: 5, shukriya: 5, bye: 4, goodbye: 4, allah: 3, hafiz: 3 },
    reply: 'You are welcome. Thank you for contacting UZR Express!',
  },
];

export const CHATBOT_FALLBACK_REPLY =
  'Sorry, I could not fully understand your question. You can ask about delivery, jewellery, prices, orders, tracking, payment, address or rider registration.';
