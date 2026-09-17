# Tamil Fireworks Showcase

Build a temporary 3-month fireworks catalogue website for a Tamil Nadu fireworks retailer.



I will upload the product list. Use that file as the single source of truth for product names, categories, sizes and prices. Do not invent products or details.



Goal



Create a single-page, modern, minimal, user friendly product catalogue. 



Use the attached image as a reference for the UI style and look. 

Default is light theme. Keep dark theme switch. 



Language

Primary language: Tamil.

Add a simple Tamil / English language switch at the very top of the page.



Tamil is the default language.

Switching to English changes the website UI text to English.



Product names must always display both Tamil and English, exactly as provided in the product list.



Do not translate, modify or invent product names.



Hero Section

Keep the hero very small and compact. It should not dominate the page.





Heading:

Diwali Fireworks, Your Way.



Subtext:

Browse our collection, find your favourites, and enquire directly on WhatsApp.





Include a subtle line:

Tamil Nadu • Seasonal Collection • Enquiries on WhatsApp



The hero should occupy minimal vertical space, especially on mobile.



Layout

Keep everything on one page:

Very compact hero

Category navigation

Contact / WhatsApp section

Smooth and mobile-friendly

Do not create separate pages for categories

Product Cards

Each product card should support:

Product image placeholder

English product name

Tamil product name

Pack/size

Price

Add to cart button



Both product languages must always be visible.

Use the actual names from the uploaded product list.



Visual Design

Use reference image

Mobile-first

Modern aesthetic

Minimal and clean

Clear typography

Indian/Tamil Nadu Deepavali festival feel

No excessive traditional decoration or unwanted icons

No clutter

No cheesy fireworks stock-photo aesthetic

Product images should be prominent

Use image placeholders until actual images are provided

Fast loading

WhatsApp integration: 

After user adds products to cart and clicks on the cart icon, the list of products selected shuld be displayed and when place order button is clicked, the list of items along with total amount must be sent to the owner's whatsapp chat with a pre-filled message directly. Remember to ask for user's name, mobile, address (one text area box), city and pin fields, and email(optional) before enabling Place Order. 







Use a placeholder WhatsApp number. +91123456789



Important: Do NOT build

Shopping cart & checkout all one popup/page. Must look like enquiry only. Don't use the word Cart. 

Don't include anything else. 

This is a temporary seasonal catalogue, not a full e-commerce platform.

Technical Approach

Keep the implementation extremely simple.

Use reusable React components and local product data.

Do not add unnecessary libraries, APIs or architecture.



The product list should be easy to replace/update later when the client provides the final product images and information.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://festival-catalog.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2414fd3e-d9bc-4f10-9672-d05d051f9d36).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
