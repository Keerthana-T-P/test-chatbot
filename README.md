## Sustainable Shopping Assistant Chatbot
A chatbot designed to assist users in making sustainable purchasing decisions. This chatbot provides information on eco-friendly products and guides users on recycling and repurposing items effectively.

## Introduction
The Sustainable Shopping Assistant Chatbot is built to promote eco-friendly habits among consumers. It educates users on making sustainable choices, minimizing waste, and adopting environmentally conscious practices in their daily lives.

## Features
Eco-Friendly Product Recommendations: Suggests products that are sustainable and environmentally friendly.
Waste Reduction Tips: Provides actionable advice to minimize waste.
Recycling Guidance: Guides users on how to recycle materials properly.
Interactive Conversations: Engages users with personalized and easy-to-understand responses.

## How It Works
User Interaction: Users ask questions or seek advice related to sustainable living.
Natural Language Processing: The chatbot uses NLP to understand the query.
Knowledge Base: The chatbot pulls relevant information from its database of eco-friendly practices, products, and recycling guidelines.
Response Generation: A clear and actionable response is provided to the user.

## Frameworks used

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports Google (default), OpenAI, Anthropic, Cohere, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Vercel Postgres powered by Neon](https://vercel.com/storage/postgres) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient object storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## Model Providers

This template ships with Google Gemini `gemini-1.5-pro` models as the default. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.



## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various Google Cloud and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).
