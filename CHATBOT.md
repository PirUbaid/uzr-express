# UZR Express Chatbot

## Architecture

The chatbot is implemented as a safe frontend widget plus a Vercel serverless API endpoint.

- Frontend widget: `src/app/components/chatbot/chatbot.component.ts`
- Frontend styles: `src/app/components/chatbot/chatbot.component.scss`
- Frontend API client: `src/app/services/chatbot.service.ts`
- Frontend config: `src/app/chatbot/chatbot.config.ts`
- Backend endpoint: `api/ai/chat.js`

The Angular app never stores or exposes an AI API key. The browser sends messages to `POST /api/ai/chat`, and the serverless function calls the configured AI provider from the backend.

## Environment Variables

Set these in Vercel or the hosting environment:

- `AI_API_KEY`: required for live AI responses.
- `AI_MODEL`: optional model name. Defaults to `gpt-4o-mini`.
- `AI_API_BASE_URL`: optional OpenAI-compatible chat completions URL. Defaults to `https://api.openai.com/v1/chat/completions`.

If `AI_API_KEY` is not configured, the backend returns safe built-in UZR Express support guidance instead of crashing.

## Production Debugging

The API returns a friendly customer-safe fallback if the AI provider fails, but it logs safe diagnostic details in Vercel Runtime Logs. Logs include provider status, message, type, code, model, and endpoint path when available.

The API must never log or return `AI_API_KEY`.

Example log shape:

```text
AI provider error: {
  status: 401,
  message: 'Invalid API key',
  type: 'invalid_request_error',
  code: 'invalid_api_key',
  model: 'gpt-4o-mini',
  endpoint: 'https://api.openai.com/v1/chat/completions'
}
```

## Current Tools

No database, payment gateway, rider tracking, or live order-status tool is connected in this implementation.

The assistant is instructed not to invent:

- Product prices
- Delivery charges
- Exact delivery times
- Order status
- Payment status
- Private customer details

For live order status, payment confirmation, and exact delivery charges, it directs customers to UZR Express WhatsApp support.

## Adding Future Backend Tools

Future tools should be added only on the server side inside `api/ai/chat.js` or another backend route. Good candidates are:

- Product availability lookup
- Order status lookup
- Delivery area and charge lookup
- Human support ticket or CRM handoff

Do not call private APIs directly from Angular. Keep keys and service credentials in backend environment variables only.

## Frontend Behaviour

- Floating bottom-right UZR Assistant button.
- Quick actions for ordering, tracking, delivery information, services, and support.
- Conversation memory is kept only in component state while the widget is open.
- New Chat clears only chatbot messages.
- Closing or minimizing the chatbot does not affect cart, checkout data, payment method, or WhatsApp ordering.
- Talk to Support opens the existing UZR WhatsApp support flow.

To disable the widget, set `enabled: false` in `src/app/chatbot/chatbot.config.ts`.
