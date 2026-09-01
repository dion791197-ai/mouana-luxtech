# План переноса mouana-website → mouana-luxtech (Astro, без React)

## Источник
`C:\Users\Cold52\Desktop\mouana-website` — Next.js 16 + React 19 + Tailwind 4 + next-intl (en/ru/th/zh) + react-hook-form/zod + framer-motion + Google Maps.
Разделы: главная, о компании, проекты (4 виллы-проекта), блог, контакты.

## Принцип переноса
Astro рендерит всё в статический HTML по умолчанию — React не нужен нигде. Интерактивные куски (там, где в оригинале был React-компонент с состоянием) переписываются как:
- обычные `<script>` с vanilla TS, ИЛИ
- Astro-компоненты + CSS (для чисто визуальных эффектов, без runtime-логики).
React/JSX не используется вообще ни на одном этапе.

## Соответствие компонентов (React → Astro/TS)

| Next.js/React | Что делает | Замена без React |
|---|---|---|
| `components/layout/Navbar.tsx`, `Footer.tsx` | шапка/подвал | `.astro`-компоненты, статика |
| `components/layout/LanguageSwitcher.tsx` | смена языка | `.astro` + `<a>`-ссылки на другие `/[locale]/...` пути (без клиентского стейта) |
| `components/home/HeroSection.tsx` | герой-баннер | `.astro` + CSS-анимации |
| `components/home/GalleryShowcase.tsx`, `components/projects/ProjectGallery.tsx` | слайдеры/галереи | vanilla TS-скрипт (свой мини-слайдер) или лёгкая либа без фреймворка (напр. `embla-carousel` — framework-agnostic core) |
| `components/home/ProjectMap.tsx` | Google Maps | vanilla `@googlemaps/js-api-loader` вместо `@react-google-maps/api` |
| `components/shared/ScrollReveal.tsx` | анимация при скролле | `IntersectionObserver` на vanilla TS + CSS transitions (замена framer-motion) |
| `components/contact/ContactForm.tsx` | форма + валидация (react-hook-form + zod) | обычная HTML-форма + zod (framework-agnostic, работает без React) на клиенте, отправка на тот же API-эндпоинт |
| `components/shared/Button.tsx`, `SectionHeading.tsx`, `WhatsAppButton.tsx` | презентационные | `.astro`-компоненты (пропсы вместо React-пропсов) |
| `components/about/*`, `components/projects/*` (карточки, гриды) | презентационные, без состояния | `.astro`-компоненты один в один |
| `app/api/contact/route.ts` | API route на отправку формы | Astro API endpoint (`src/pages/api/contact.ts`) — фреймворк не участвует, переносится почти без изменений |
| `next-intl` + `dictionaries/*.json` | i18n роутинг `/[locale]/...` | встроенный Astro i18n-роутинг (`i18n.locales`, `[locale]` в путях) + свои JSON-словари (те же файлы) |
| `data/projects.ts`, `company.ts`, `blog.ts` | контент | переносится как есть (чистый TS/данные, не JSX) |
| `framer-motion` | анимации | CSS `@keyframes`/`transition` + `IntersectionObserver` |

## Этапы

1. **Настройка Astro-проекта**
   - `astro add tailwind` (тот же дизайн-язык, Tailwind 4)
   - `astro add sitemap` (Next давал это из коробки, для SEO)
   - Настройка `i18n` в `astro.config.mjs` (locales: en, ru, th, zh; defaultLocale)

2. **Перенос данных и типов**
   - `data/*.ts`, `types/*.ts`, `dictionaries/*.json`, `lib/utils.ts` — копируются почти без изменений (это чистый TS, не зависит от React)

3. **Layout и статические секции**
   - `Layout.astro` (base) → `Navbar.astro`, `Footer.astro`, обёртка страницы
   - Секции без интерактивности (`AboutPreview`, `CompanyStory`, `ServicesGrid`, `ProjectOverview`, `MasterPlan`, `VillaTypeSection`, карточки) — прямой перенос JSX-разметки в `.astro`-темплейты с пропсами

4. **Интерактивные острова (vanilla TS)**
   - Слайдер/галерея — свой `<script>` модуль или `embla-carousel` (без React-обвязки)
   - `ScrollReveal` — общий `reveal.ts` с `IntersectionObserver`, применяется через `data-reveal` атрибут
   - `ProjectMap` — `googleMaps.ts` модуль, инициализация карты на `DOMContentLoaded`
   - `StatsCounter` (анимация цифр) — vanilla TS с `IntersectionObserver`
   - `LanguageSwitcher` — статические ссылки, без JS вообще (не нужен клиентский стейт)

5. **Форма контактов**
   - HTML `<form>` + `zod` схема в `<script type="module">` на клиенте (валидация перед отправкой)
   - `fetch('/api/contact')` → Astro API route (перенос `route.ts` почти 1:1, framework-agnostic)

6. **Роутинг и страницы**
   - `[locale]/page.tsx` → `src/pages/[locale]/index.astro` (или через Astro i18n автоматически без сегмента в URL для дефолтного языка)
   - `[locale]/projects/page.tsx` + `[slug]/page.tsx` → `projects/index.astro` + `projects/[slug].astro` с `getStaticPaths()`
   - Аналогично `about`, `blog`, `blog/[slug]`, `contact`

7. **Стили**
   - `globals.css` → `src/styles/global.css`, Tailwind-конфиг переносится как есть (Tailwind не зависит от React)

8. **SEO/метаданные**
   - `generateMetadata` (Next) → фронтматтер/пропсы `Layout.astro` + `<meta>`-теги вручную

9. **Проверка и деплой**
   - `npm run build` + визуальная сверка каждой страницы с оригиналом
   - Проверка форм, карты, галерей, переключения языков
   - Настройка хостинга (Vercel/Netlify/статика — уточнить у пользователя)

## Открытые вопросы к пользователю
- Слайдер/карусель: писать полностью свой на vanilla TS или взять framework-agnostic библиотеку (например `embla-carousel`, без обвязки React)?
- Нужна ли интеграция с CMS для блога, или контент останется в `data/blog.ts` как сейчас?
- Куда деплоим (Vercel/Netlify/другое)?
- Переносим 4 языка (en/ru/th/zh) сразу или поэтапно?
