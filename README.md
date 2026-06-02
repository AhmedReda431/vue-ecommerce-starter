# 🛒 Vue E-Commerce Starter

&gt; _"Once upon a time, a developer needed to build an online store..."_

This is not just another boilerplate. It's a **production-ready, battle-tested e-commerce foundation** built with Vue 3, Vuetify 3, and modern web technologies. Clone it, customize it, ship it.

---

## 📖 The Story Behind This Project

Every great e-commerce platform starts with the same headaches:

- **Authentication** that actually works with JWT tokens
- **Shopping carts** that persist across page refreshes
- **Product filters** that don't make 47 API calls
- **Responsive design** that looks good on a phone _and_ a 4K monitor
- **Touch gestures** that feel native on mobile
- **Theming** that respects user preference and switches seamlessly
- **Internationalization** that actually scales beyond two languages

We solved all of them. So you don't have to.

---

## ✨ What You're Getting

### The Foundation

| Feature              | Technology              | Why It Matters                                                                |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------- |
| **Framework**        | Vue 3 + Composition API | Modern, performant, TypeScript-ready                                          |
| **UI Library**       | Vuetify 3               | Material Design 3, 100+ components, dark mode                                 |
| **State Management** | Pinia                   | Better than Vuex, devtools support, modular                                   |
| **HTTP Client**      | Axios                   | Interceptors, automatic auth headers, error handling                          |
| **Notifications**    | SweetAlert2             | Beautiful toasts and confirmation dialogs                                     |
| **Icons**            | Material Design Icons   | 7,000+ icons, one import                                                      |
| **Carousels**        | Swiper                  | Hardware-accelerated touch, 3D effects, thumbnails                            |
| **Theming**          | Vuetify 3 Theme System  | Light/dark/auto modes, persistent preference, CSS variables                   |
| **i18n**             | Vue I18n                | Multi-language support, locale switching, RTL-ready, lazy-loaded translations |

### The E-Commerce Engine

| Feature                | How It Works                                                   |
| ---------------------- | -------------------------------------------------------------- |
| **Authentication**     | JWT login/register with **AES-encrypted cookies**, 2-hour session expiration, auto-logout, protected routes |
| **Product Catalog**    | Real API integration (DummyJSON), category filtering, search   |
| **Shopping Cart**      | LocalStorage persistence, quantity management, stock awareness |
| **Favorites/Wishlist** | Heart toggle on every card, dedicated page                     |
| **Checkout**           | 3-step wizard (shipping → payment → review)                    |
| **Responsive Navbar**  | Collapses to drawer on mobile, search bar, cart badge          |
| **Responsive Footer**  | 4-column layout, newsletter signup, social links               |

### The Carousel System

| Component                | Use Case                          | Touch Support                  |
| ------------------------ | --------------------------------- | ------------------------------ |
| `SwiperCarousel`         | Hero banners, image galleries     | ✅ Swipe, drag, autoplay       |
| `SwiperProductCarousel`  | Product rows, "You May Also Like" | ✅ Horizontal scroll with snap |
| `SwiperCategoryCarousel` | Category browsing                 | ✅ Momentum scrolling          |
| `TestimonialCarousel`    | Customer reviews                  | ✅ Auto-rotating               |

---

## 🚀 Quick Start

```bash
# 1. Clone the story
git clone https://github.com/yourname/vue-ecommerce-starter.git
cd vue-ecommerce-starter

# 2. Install the magic
npm install

# 3. Set your scene
cp .env.example .env
# Edit .env: VITE_API_URL=https://your-api.com
# Edit .env: VITE_APP_CRYPTO_KEY=your-32-char-secret-key

# 4. Start the show
npm run dev
# Open http://localhost:3000

## Ahmed Reda
