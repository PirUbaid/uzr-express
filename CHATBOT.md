# UZR Express Chatbot

## Architecture

The chatbot is a free local FAQ assistant that runs inside the Angular frontend.

- Frontend widget: `src/app/components/chatbot/chatbot.component.ts`
- Frontend styles: `src/app/components/chatbot/chatbot.component.scss`
- Local matcher service: `src/app/services/chatbot.service.ts`
- Frontend config: `src/app/chatbot/chatbot.config.ts`
- Types: `src/app/chatbot/chatbot.models.ts`
- Knowledge base: `src/app/chatbot/chatbot-knowledge-base.ts`

The assistant does not call any external provider. It does not use API keys, serverless chat endpoints, paid models, or a database.

## Behaviour

- Responses are selected locally with normalized keyword and phrase matching.
- English, Urdu terms, Roman Urdu, common spelling mistakes, and common synonyms are supported.
- The widget stores open/closed state and the latest conversation in `localStorage` under `uzr_chatbot_v1`.
- Stored chatbot data is validated before use, limited to the latest 50 messages, and ignored safely if corrupted or unavailable.
- New Chat shows a custom UZR-themed confirmation modal before clearing chatbot history.
- New Chat clears only chatbot storage; it does not clear cart, checkout draft, payment method, or WhatsApp order data.
- The assistant shows route and WhatsApp actions for common support flows.
- It uses a short simulated typing indicator and does not falsely claim to be generative AI.

## Current Knowledge

The assistant can answer about:

- UZR Express and Kohat City delivery service
- Food, grocery, parcel, document, medicine, gift and jewellery delivery
- Delivery coverage, charges and timing
- Jewellery products and current website prices
- Orders, tracking, Cash on Delivery and manual Online Transfer
- Office address, contact number and WhatsApp support
- Rider applications, business partnerships and policy pages

For order-specific status, exact delivery charges, current availability, business hours or manual payment verification, it directs customers to UZR Express WhatsApp support at `0336 8877657`.

## Future Changes

Keep the chatbot local unless the business explicitly chooses to add a backend service later. Do not add paid AI providers, payment gateways, secrets or private APIs to the frontend.
