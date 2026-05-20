export type ShowcaseFrame = {
  src: string;
  label: string;
  title: string;
  body: string;
  meta: string;
};

export const aksaShowcaseFrames = [
  {
    src: "/projects/aksa-xiterz/Dashboard.png",
    label: "01 / System Intent",
    title: "Built to make delivery less manual.",
    body: "I shaped Aksa Xiterz around a simple problem: checkout should not depend on repeated chats, screenshots, or manual key handoffs.",
    meta: "Intent, checkout, delivery",
  },
  {
    src: "/projects/aksa-xiterz/list%20product.png",
    label: "02 / Product Logic",
    title: "The catalog is part of the system.",
    body: "Packages, stock, and delivery rules are visible early so the interface reflects what the backend can actually fulfill.",
    meta: "Catalog, stock, rules",
  },
  {
    src: "/projects/aksa-xiterz/Contoh%20Qris%20Payment.png",
    label: "03 / Payment State",
    title: "Payment state stays readable.",
    body: "The QRIS flow keeps amount, expiry, order ID, and status checks close together because clarity reduces support work.",
    meta: "QRIS, amount, status",
  },
  {
    src: "/projects/aksa-xiterz/Contoh%20Crypto%20Payment.png",
    label: "04 / Strict Rules",
    title: "Crypto checkout needs firm edges.",
    body: "I made the network, amount, address, and warnings explicit so the system has fewer ambiguous states to recover from.",
    meta: "Network, amount, checks",
  },
  {
    src: "/projects/aksa-xiterz/license%20section.png",
    label: "05 / Fulfillment",
    title: "Delivery is backend logic.",
    body: "Paid keys are tied to order state and copy actions instead of being treated as a loose message after purchase.",
    meta: "Licenses, order state, copy",
  },
  {
    src: "/projects/aksa-xiterz/order%20history.png",
    label: "06 / Traceability",
    title: "History is part of trust.",
    body: "I want users to see what happened, what is waiting, and what failed without asking an admin to explain the order.",
    meta: "Orders, status, trace",
  },
  {
    src: "/projects/aksa-xiterz/Guides%20Blog.png",
    label: "07 / Support Surface",
    title: "Repeated questions should become tools.",
    body: "The guide area came from noticing support patterns and turning the same setup fixes into something users can follow alone.",
    meta: "Guides, support, setup",
  },
  {
    src: "/projects/aksa-xiterz/Download%20Section.png",
    label: "08 / Continuity",
    title: "The flow continues after payment.",
    body: "Files and companion tools stay organized by product so the system does not end at the invoice screen.",
    meta: "Downloads, tools, follow-through",
  },
] satisfies readonly ShowcaseFrame[];

export const eduvestShowcaseFrames = [
  {
    src: "/projects/eduvest/dashboard.png",
    label: "01 / Learning Hub",
    title: "A learning app needs a clear path.",
    body: "With EduVest, I focused on turning finance material into a route people can follow, not a dashboard full of loose blocks.",
    meta: "Path, session, structure",
  },
  {
    src: "/projects/eduvest/all-courses.png",
    label: "02 / Content Shape",
    title: "Structure makes learning calmer.",
    body: "I grouped stock, crypto, and finance basics into tracks so the user always knows what kind of lesson they are entering.",
    meta: "Courses, categories, intent",
  },
  {
    src: "/projects/eduvest/playlist.png",
    label: "03 / Video Flow",
    title: "The interface follows the lesson order.",
    body: "The playlist model keeps the learning flow sequential, which fits how I like building apps: state first, decoration later.",
    meta: "Playlist, order, state",
  },
  {
    src: "/projects/eduvest/learning-progress.png",
    label: "04 / User State",
    title: "Progress should be easy to resume.",
    body: "Belajarku is less about showing numbers and more about remembering where the learner should continue next.",
    meta: "Progress, resume, activity",
  },
  {
    src: "/projects/eduvest/my-courses.png",
    label: "05 / Next Action",
    title: "Focused screens make decisions lighter.",
    body: "The active course list keeps title, category, lesson count, and continue action close because those are the decisions that matter.",
    meta: "Current course, action, focus",
  },
  {
    src: "/projects/eduvest/news-faq-testimonials.png",
    label: "06 / Product Context",
    title: "A complete product still needs restraint.",
    body: "I kept FAQ, updates, and feedback close to the learning story instead of letting the page turn into a generic landing page.",
    meta: "FAQ, context, restraint",
  },
] satisfies readonly ShowcaseFrame[];

export const fashionShowcaseFrames = [
  {
    src: "/projects/brl-fashion/dashboard.png",
    label: "01 / Composition",
    title: "The page needed visual order.",
    body: "For BRL Fashion, I paid attention to hierarchy: brand, search, categories, and product mood all needed room to breathe.",
    meta: "Hierarchy, search, layout",
  },
  {
    src: "/projects/brl-fashion/catalog-gallery.png",
    label: "02 / Browsing Rhythm",
    title: "Product browsing should feel guided.",
    body: "I treated the catalog and gallery as a rhythm problem: enough movement to explore, enough structure to stay oriented.",
    meta: "Catalog, gallery, rhythm",
  },
  {
    src: "/projects/brl-fashion/blog.png",
    label: "03 / Editorial Layer",
    title: "Content can soften the interface.",
    body: "The blog area adds care notes and context, giving the storefront an editorial layer without pulling focus from products.",
    meta: "Editorial, context, care",
  },
  {
    src: "/projects/brl-fashion/feedback.png",
    label: "04 / Human Signals",
    title: "Feedback gives the layout a pulse.",
    body: "Customer notes and service questions help the page feel inhabited, but I kept them secondary to the product structure.",
    meta: "Feedback, FAQ, balance",
  },
  {
    src: "/projects/brl-fashion/faq-chatbot.png",
    label: "05 / Support UI",
    title: "Support should stay close, not loud.",
    body: "The FAQ and assistant sit near the shopping flow so help is available without becoming the center of the interface.",
    meta: "FAQ, assistant, support",
  },
  {
    src: "/projects/brl-fashion/product-list.png",
    label: "06 / Dense UI",
    title: "Small details carry the buying decision.",
    body: "Price, stock, size, quantity, and action placement matter because ecommerce UI is mostly a sequence of small choices.",
    meta: "Price, stock, choices",
  },
  {
    src: "/projects/brl-fashion/checkout-payment.png",
    label: "07 / Checkout Shape",
    title: "Checkout has to feel composed.",
    body: "I kept delivery, payment, cart state, and totals in one readable flow so the final step does not feel like a separate app.",
    meta: "Checkout, totals, flow",
  },
] satisfies readonly ShowcaseFrame[];
