# Transportes Treinta — website

A static lead-generation website for Transportes Treinta 30, a trucking business
based in Pital, Costa Rica. The four-step quote form builds a WhatsApp message
and opens it for the customer to send. It has no application backend or database.

Production website: https://transportestreinta.com/

The customer-facing website is in Spanish. This README documents its setup,
analytics, content, and maintenance in English; route names, code identifiers,
and on-screen labels retain their original Spanish names.

## Technology and tools

Versions below are the versions declared in `package.json`; `pnpm-lock.yaml`
records the resolved dependency tree.

| Tool | Version / configuration | Purpose |
|---|---|---|
| Node.js | 24.x | Local tooling, builds, and prerendering |
| pnpm | 11.25.0 | Package management and reproducible installs |
| React / React DOM | ^19.3.1 | Components, server rendering, and browser hydration |
| React Router | ^8.5.1 | Page routes and navigation |
| Material UI / icons | ^9.5.0 | UI components, layout, and icons |
| Emotion | 11.x | Styling and server-rendered style extraction |
| Motion | ^14.9.0 | Section, page, form, and image-viewer animations |
| Vite / React plugin | ^8.3.5 / ^6.1.2 | Development server, production bundles, and SSR build |
| Sharp | ^0.35.5 | WebP conversion, resizing, and thumbnails |
| Node test runner | Built into Node.js | Analytics privacy and consent tests |
| Vercel | `vercel.json` | Hosting, builds, previews, caching, and security headers |
| GitHub | This repository | Source control |
| Google Analytics 4 | Direct `gtag.js` integration | Consented page views, quote progress, and contact clicks |
| Vercel Web Analytics | @vercel/analytics ^2.0.1 | General traffic statistics |
| Vercel Speed Insights | @vercel/speed-insights ^2.0.0 | Real-user performance monitoring |
| Google Search Console | Verification tag in `index.html` | Search visibility and sitemap submission |
| Google Business Profile / Maps | Business listing linked from the site | Local discovery and business contact information |
| WhatsApp | `https://wa.me/` links | Customer inquiries and quote handoff |
| Facebook | Optional profile plugin | Business profile preview, loaded on request |

## Run locally

Install **Node 24** and **pnpm 11**. The lockfile is `pnpm-lock.yaml`.
If pnpm is not installed, use `npx pnpm@11 <command>` instead.

```bash
pnpm install --frozen-lockfile
pnpm dev                 # http://localhost:5173
```

`package.json` specifies the Node version for Vercel and the pnpm version so
local and production installations use the same toolchain.

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Build browser assets, build SSR code, and prerender every page |
| `pnpm preview` | Serve the production build locally at http://localhost:4173 |
| `pnpm validate` | Run analytics tests and validate the built site's pages and metadata |
| `pnpm img:optimize` | Resize JPEG/PNG images in `public/img/` and create WebP versions |
| `pnpm img:mini` | Generate lightweight WebP thumbnails in `public/img/mini/` |

## Deploy with Vercel

The production domain is `transportestreinta.com`. The local Vercel project
link is stored in `.vercel/`, which is excluded from Git.
Vercel uses the settings in `vercel.json`: `pnpm install --frozen-lockfile`,
then `pnpm run build`, with `dist/` as the output directory.

```bash
pnpm build               # Build and prerender all pages
pnpm preview             # Inspect the production build locally
npx vercel               # Create a preview deployment with its own URL
npx vercel --prod        # Deploy to transportestreinta.com
```

`.vercelignore` excludes `output/`, `assets/`, and working photo folders from
deployment uploads. They are not required to build the site.
`.gitignore` also excludes dependencies, builds, local caches, environment files,
local settings, and backups. Backups referenced below under `output/` are local
working copies and are not included in this repository.

`vercel.json` sets a one-year immutable cache for hashed `/assets/` files and a
one-day cache with stale-while-revalidate for `/img/`. It also defines content-type,
framing, referrer, and camera/microphone/geolocation permission headers.
With `cleanUrls`, `/servicios` serves `servicios.html`. Unknown routes serve
`404.html` with a real 404 status instead of redirecting to the home page.

## Analytics and measurement

### Google Analytics 4

The business account's GA4 identifiers are:

| Setting | Value |
|---|---|
| Property ID | `562767634` |
| Web stream ID | `16282064349` |
| Measurement ID | `G-57MSCT9L7E` |
| Integration | `src/analitica.js` and `src/components/Medicion.jsx` |

GA4 loads only on `transportestreinta.com` or `www.transportestreinta.com`,
after the visitor allows analytics. Local development and preview visits do
not enter GA4. The preference is stored in `localStorage` under
`tt-analitica-v1`; visitors can reopen preferences and revoke permission.
Without accessible preference storage, GA4 does not activate.

Page views are sent explicitly on route changes. The custom event allowlist is:

| Event | Meaning |
|---|---|
| `quote_start` | The visitor starts the quote flow |
| `quote_step` | The visitor reaches an intermediate quote step |
| `quote_review` | The visitor reaches the final quote review |
| `whatsapp_click` | The visitor clicks a WhatsApp contact link |
| `phone_click` | The visitor clicks a telephone link |
| `review_click` | The visitor clicks a link marked as a Google review link |

Custom parameters are restricted to predefined cargo types (`cargo_type`),
integer quote steps from 1 to 4 (`quote_step`), and predefined contact contexts
(`contact_context`: `direct`, `quote`, `mobile`, or `service`). Names, free-text
addresses, cargo descriptions, and WhatsApp message contents are not sent.
Page URLs exclude query strings and fragments; unrecognized paths map to
`/404`. Campaign values use an allowlist, and referrers are reduced to their origin.
Google signals and advertising personalization signals are disabled in code.

As recorded in the November 2026 setup notes, GA4 enhanced measurement is disabled
in the stream to avoid capturing WhatsApp URLs containing messages.
`whatsapp_click` and `phone_click` are configured as key events with no monetary
value, counted once per session. These are contact attempts: the site cannot
confirm that a customer sent a message, received a reply, or booked a trip.
`quote_review` means the visitor reached the quote review screen.

### Vercel traffic and performance tools

`src/main.jsx` loads Vercel Web Analytics for traffic statistics and Speed Insights
for real-user performance measurements. Enable the corresponding features in the
Vercel project dashboard to view their data after deployment.

Both integrations use `filtrarEventoVercel` from `src/analitica.js` to sanitize
page URLs and suppress internal visits. The GA4 consent preference controls GA4;
the Vercel components are mounted separately and are excluded for internal visits.

### Exclude your own visits

Open `https://transportestreinta.com/?tt_internal=1` once in each browser or device
used by the business. That browser stops loading GA4, Vercel Web Analytics, and
Speed Insights. The flag is stored under `tt-visita-interna-v1` and persists across
IP address changes. The query parameter is removed from the address bar after use.

To resume measurement, open `https://transportestreinta.com/?tt_internal=0` and
allow GA4 analytics again if desired. Clearing site data or using a new incognito
session removes the exclusion. Do not share the exclusion link with customers.
It does not change statistics already collected.

### Campaign links

Use these links for future posts and profiles. Do not edit other people's posts
or send messages automatically.

- Google Business Profile: https://transportestreinta.com/?utm_source=google&utm_medium=organic&utm_campaign=perfil-google
- Pineapple transport on Facebook: https://transportestreinta.com/transporte-pina-yuca?utm_source=facebook&utm_medium=social&utm_campaign=pina-noviembre-2026
- Services on Facebook: https://transportestreinta.com/servicios?utm_source=facebook&utm_medium=social&utm_campaign=servicios-noviembre-2026
- Instagram bio: https://transportestreinta.com/?utm_source=instagram&utm_medium=social&utm_campaign=instagram-bio
- WhatsApp status: https://transportestreinta.com/cotizar?utm_source=whatsapp&utm_medium=social&utm_campaign=whatsapp-estado

Accepted campaign values are defined in `atribucionSegura`. Add a new campaign's
public identifier there before launching it. The legacy source `google_perfil`
is normalized to `google` for compatibility while the profile is updated.

### Business follow-up

Each message generated by the form starts with `*Cotización desde la página web*`
("Quote from the website") so the business can identify website inquiries.
Nelson should record each inquiry's TT reference, source, whether a quote was
provided, whether a trip was booked, and the trip value. Do not copy those details
to Analytics. Compare Costa Rica visits, inquiries, and booked trips by source
weekly, separating tests and internal visits before attributing growth.
A reference is generated in the browser; it is not a booking.

## Search visibility and business profile

The site includes prerendered service pages at `/fletes-san-carlos`,
`/transporte-pina-yuca`, and `/transporte-maquinaria-materiales`. They are linked
from Services and the footer and included in the generated sitemap. Each includes
a canonical URL, description, Service structured data, and visible FAQs.
Photo descriptions refer to the cargo shown; do not invent clients, dates, or routes.

Search Console uses the verification tag in `index.html`; do not remove it.
The property is `https://transportestreinta.com/`, and the sitemap is
`https://transportestreinta.com/sitemap.xml`. The November 5, 2026 setup notes
record that the property was verified and Google read all nine pages.

Google Maps is linked using CID `15081357595470814468`. The recorded primary
category is Trucking company, with Transportation service as the secondary category.
Google requested video verification showing the location, equipment, and proof
of management; verification was left pending at the user's direction.
The direct Google review link belongs in `negocio.googleResena`; do not invent one.
Until Google provides it, review invitations use Facebook. Do not add fabricated
reviews or star ratings.

## Before deployment

1. Check `src/config.js`: WhatsApp number in `506XXXXXXXX` format (no `+`, spaces,
   or hyphens), business name, phone, email, hours, and actual service areas.
   The JSON-LD is derived from these values. The name, phone, and service area
   must match the Google Business Profile exactly.
2. Check page titles and descriptions in `src/seo.js`.
3. Check truck photos in `public/img/`; see `public/img/LEEME.txt`.
4. Run `pnpm build` followed by `pnpm validate`. Validation covers analytics
   privacy and consent, all nine pages, images, links, canonicals, FAQs, and JSON-LD.
5. Test the full quote flow at a 390 px viewport, analytics preferences, and the
   final WhatsApp link on a real phone.

## Pages

| Route | Content |
|---|---|
| `/` | Home: quick actions, cargo selector, route explorer, road photos, Nelson, Facebook, and FAQs |
| `/servicios` | Cargo types, truck details, workflow, excluded cargo, pineapple/cassava transport, and machinery delivery |
| `/cobertura` | Routes from Pital with approximate travel times |
| `/sobre-nosotros` | Business story, truck photos, reviews, and contact information |
| `/cotizar` | Four-step quote flow ending in WhatsApp |
| `/fletes-san-carlos` | Freight services in San Carlos |
| `/transporte-pina-yuca` | Pineapple and cassava transport |
| `/transporte-maquinaria-materiales` | Machinery and construction materials transport |
| `/privacidad` | Privacy and analytics information |

Mobile navigation has a bottom bar with a yellow **Cotizar** (Get a quote) button
in the center. Desktop navigation uses a top menu.

### Prefilled quote links

Use these in Facebook posts or WhatsApp statuses:

```text
https://transportestreinta.com/cotizar?carga=agricola
https://transportestreinta.com/cotizar?destino=Puerto%20Caldera
https://transportestreinta.com/cotizar?carga=maquinaria&destino=Guanacaste
```

`carga` accepts `agricola`, `construccion`, `maquinaria`, `contenedor`, `general`,
or `otro`. A date can also be supplied as `fecha=YYYY-MM-DD`.

## Content maintained in `src/config.js`

- `resenas`: real reviews only. When empty, the site invites visitors to leave
  a review on Google if `negocio.google` has a link, otherwise on Facebook.
- `camion.datos`: truck dimensions and load capacity (20+ tonnes).
- `proceso` / `queSigue`: commitments made to customers. Cargo photos are provided
  only if requested.
- `trabajos` / `galeria`: photos shown on Home and About; Services cards and the
  quote form reuse the same images.

The quote calendar selects a preferred date; it does not show availability.
The date is confirmed through WhatsApp.

The November 6 local lead-generation update adds service links next to the Home
cargo selector. All three service pages repeat **Cotizar**, **WhatsApp**, and
**Llamar** after their FAQs, with the cargo type preselected and existing contact
measurement reused. No new events or form data are sent to Analytics.
The two-component backup is in `output/leads-2026-11-06/antes/`.
Local changes must be deployed to appear on the production domain.

## Branding and photos

The supplied **Transportes Treinta 30** logo appears in the header and footer
through `Marca` in `src/components/ui.jsx`. Transparent, cropped, optimized
versions are in `public/img/marca/`. `Logo30` uses the 30 extracted from the
original for square spaces, including the favicon and mobile home-screen icon.

Four photos selected from the business's materials show road cargo, covered cargo,
bagged cargo, and pineapple cargo on the road. WebP versions have thumbnails in
`public/img/mini/`. After adding or replacing a photo in `public/img/`, run:

```bash
pnpm img:mini
```

Posters containing text, the September social post, and videos remain social media
materials and are not loaded on the website. Shared-link previews use
`public/img/og-treinta30.jpg`, featuring the updated logo.

## Motion and interactions

Motion animates Home sections, page changes, and quote steps. Cards and buttons
respond to hovering and pressing. The green palette, yellow quote button, and
original logo are retained with softer cards and rounded corners.

Home and About photos open an enlarged viewer supporting buttons, arrow keys,
and swiping. Escape closes the viewer and returns focus to the original photo.
Large images load when opened; cards continue to use thumbnails.

`SelectorCarga` is shared by Home and Services: six always-visible choices, a
photo that changes with the selection, and a quote link with the selected cargo
type. Motion moves the highlight, crossfades photos, and resizes the panel.
All descriptions remain in each page's HTML.

`ExploradorRutas` is shared by Home and Coverage. It keeps the green route sign on
desktop and uses a native destination selector on mobile. Changing regions zooms
the map into Zona Norte or out to the whole country. Routes are drawn from Pital;
**Cotizar esta ruta** (Get a quote for this route) prefills the destination.
The map and travel times are illustrative: there is no GPS navigation,
availability lookup, or map-service API call.

The local outline in `src/data/mapa-costa-rica.json` comes from Natural Earth's
public-domain 1:50m dataset. The source URL is stored in the file.
Terms: https://www.naturalearthdata.com/about/terms-of-use/

The quote flow asks for a date after cargo and route selection. Named steps have
a moving indicator; selections appear as editable chips. The final button remains
a real WhatsApp link. Photo layouts combine a main image and supporting images;
the viewer animates between the thumbnail and enlarged positions. Mobile
navigation also moves its active indicator.

`src/components/movimiento.jsx` centralizes motion settings and respects
`prefers-reduced-motion`, skipping movement and quote/viewer transitions.
If the preference changes during an entrance animation, content becomes fully
visible. Prerendered HTML also starts visible. `movimiento-features.js` loads
Motion's full features in a separate chunk after the initial render.

The October 2026 update uses React 19.3.1, MUI 9.5.0, React Router 8.5.1,
Vite 8.3.5, and Motion 14.9.0. MUI Grid components use `size`, and styling uses `sx`.

Local backups:

- `output/experiencia-motion-2026-10-30/antes/`: before the second interaction phase.
- `output/modernizacion-motion-2026-10-30/antes/`: source, scripts, configuration,
  and lockfile before the dependency update. To restore that version, restore
  those files and run `pnpm install --frozen-lockfile` and `pnpm build`.
- `output/visibilidad-2026-11-05/antes/`: before the visibility and measurement update.

## Facebook preview

Home shows a Facebook card after Nelson and before the FAQs, implemented in
`src/components/FacebookPreview.jsx`. It uses `negocio.facebook` from
`src/config.js`, the site logo, and a local truck photo. The cover and text are
maintained manually. About includes another photo link below the gallery.

The official Facebook plugin loads only after the visitor selects **Mostrar perfil
de Facebook** (Show Facebook profile). It displays a compact profile with a Follow
button, without an SDK, tokens, or paid services. The card and **Ver en Facebook**
(View on Facebook) link remain available if the plugin cannot display content.
Embedding depends on Facebook allowing that public page to be embedded; test
while signed out and with blockers enabled. A feed is not included: the recorded
local test returned the profile header but no posts.

## Technical notes

- **Static prerendering (SSG):** `pnpm build` runs the standard Vite build, an SSR
  build of `src/entry-server.jsx` into temporary `.ssr/`, and
  `scripts/prerender.mjs`. The script renders each route in `paginas`
  (`src/seo.js`) using React in Node and writes complete HTML to `dist/`, including
  text, titles, descriptions, canonicals, Open Graph, and JSON-LD. Search engines
  can read the pages without JavaScript. It also generates `dist/sitemap.xml`
  and `404.html`. The temporary SSR directory is removed automatically.
- **Hydration:** React connects interactions to prerendered HTML with `hydrateRoot`.
  Links containing query parameters such as `?carga=`, `?paso=`, or `?fbclid=`
  render from scratch because the page depends on the URL. Date-dependent content,
  such as Home's day strip, is calculated in `useEffect`, never during rendering,
  because the static HTML was generated at build time.
- **New pages:** add the `<Route>` in `src/App.jsx` and its title/description to
  `paginas` in `src/seo.js`. The build prerenders it and adds it to the sitemap.
- **FAQs:** `preguntas` in `src/config.js` appears on Home and as FAQPage JSON-LD.
  Keep structured-data questions visible on the page.
- **WhatsApp handoff:** the final quote button is a real
  `<a href="https://wa.me/...">`; the browser performs navigation. Do not replace
  it with `window.open()` after an `await` or `fetch`: Safari on iOS can block
  that navigation and silently break the quote flow.
- **Step history:** the quote step is stored in the URL (`?paso=2`) so the phone's
  Back button returns to the previous step.
- **Link format:** use `https://wa.me/`, never the `whatsapp://` scheme.
