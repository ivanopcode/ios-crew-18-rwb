# iOS Crew #18 & RWB

Доклад **«Локальные модели для разработки под iOS на Apple Silicon»** как код:
[Slidev](https://sli.dev) + локальная тема `rwb-tech`. Дек — обычный Markdown,
всё версионируется и ревьюится как исходники.

## Быстрый старт

```bash
npm install
npm run dev          # http://localhost:3030
npm run dev:theme    # витрина всех раскладок темы
```

Режим докладчика с заметками — клавиша `p`, обзор слайдов — `o`.

## Структура

| Путь | Что там |
| --- | --- |
| `slides.md` | дек, 55 слайдов, заметки спикера в HTML-комментариях |
| `theme/` | локальная тема `slidev-theme-rwb-tech` — раскладки, компоненты, стили |
| `theme/example.md` | витрина: каждая раскладка на реальном слайде |
| `content/` | исходники для порта: аутлайн и дамп текста из pptx v6 |
| `docs/style-guide.md` | канон стиля: токены, раскладки, компоненты, чеклист |
| `docs/AGENT_PROMPT.md` | исходное задание на сборку репозитория |
| `docs/HOW_TO_RUN.md` | инструкция для зрителя, уезжает внутрь релизного архива |
| `.scripts/` | утилиты проекта |
| `.temp/` | сборки, экспорты, логи — **в гите нет** |

## Команды

| Команда | Что делает | Куда кладёт |
| --- | --- | --- |
| `npm run dev` | dev-сервер с hot reload | `localhost:3030` |
| `npm run dev:theme` | dev-сервер витрины темы | `localhost:3030` |
| `npm run dev:flat` | режим репетиции: всё содержимое слайда сразу, без пошаговых `v-click` | `localhost:3030` |
| `npm run lint` | проверка frontmatter (см. ниже) | stdout |
| `npm run build` | статическая сборка | `dist/` |
| `npm run build:offline` | сборка с относительными путями | `.temp/dist-offline/` |
| `npm run build:theme` | сборка витрины темы | `.temp/dist-theme/` |
| `npm run export` | PDF | `.temp/export/*.pdf` |
| `npm run export:pptx` | PPTX (слайды картинками) | `.temp/export/*.pptx` |
| `npm run notes` | заметки спикера отдельным PDF | `.temp/export/notes.pdf` |
| `node .scripts/audit-overflow.mjs <url> .temp/audit slides.md` | рендер каждого слайда в Chromium: переполнение, ошибки консоли, скриншоты | `.temp/audit/` |

Экспорт в PDF/PPTX требует headless Chromium, его нет в лок-файле:

```bash
npm install --no-save playwright-chromium
npm run export
```

## Проверка frontmatter

`.scripts/check-frontmatter.py` ловит класс ошибок, который YAML проглатывает молча:

```yaml
tag: 6 · ПЕРЕД ДЕМО: LLAMA.CPP С НУЛЯ   # → объект, а не строка
title: iOS Crew #18 & RWB               # → обрезается на комментарии
```

Такой дек соберётся без ошибок, но раскладка получит объект вместо текста, а тег
просто не отрисуется. Значение с `: ` или ` #` внутри надо брать в кавычки.
Проверка висит гейтом в обоих CI-воркфлоу; локально — `npm run lint`.

## Аудит слайдов

`.scripts/audit-overflow.mjs` открывает каждый слайд в headless Chromium в финальном
состоянии кликов, меряет нижнюю границу текучего контента относительно строки источника
и складывает скриншоты в `.temp/audit/`. Локально:

```bash
npm run build:offline
python3 -m http.server 8093 --directory .temp/dist-offline &
node .scripts/audit-overflow.mjs http://localhost:8093/ .temp/audit slides.md
```

Выход ненулевой, если хоть один слайд переполнен или в консоли есть ошибки. В CI это
гейт в `build.yml`; скриншоты уезжают артефактом `slides-audit`.

## Сборка и раздача

`npm run build` даёт статический SPA в `dist/`. Рантайма на раздаче не нужно, но:

- **двойным кликом по `index.html` дек не откроется** — браузер грузит слайды как
  ES-модули, а с `file://` это запрещено CORS. Проверено: страница остаётся пустой.
  Нужен любой локальный HTTP-сервер;
- дек собран с `routerMode: hash`, поэтому ссылки на слайды выглядят как `/#/9` и
  работают на любом статическом сервере без history-fallback.

## CI

| Воркфлоу | Когда | Что делает |
| --- | --- | --- |
| [`build.yml`](.github/workflows/build.yml) | push в `main`, PR, вручную | линт, сборка, экспорт PDF → артефакты `slides-html` и `slides-pdf`, 90 дней |
| [`release.yml`](.github/workflows/release.yml) | тег `v*`, вручную | линт, сборка, PDF → **GitHub Release с приложенными файлами** |
| [`pages.yml`](.github/workflows/pages.yml) | только вручную | деплой на GitHub Pages |

### Релиз

```bash
git tag -s v0.2.0 -m 'Черновой порт, раскладки уточнены'
git push origin v0.2.0
```

CI соберёт и приложит к релизу два файла:

| Ассет | Что это |
| --- | --- |
| `ios-crew-18-rwb-<tag>-html.zip` | статическая сборка + `HOW_TO_RUN.md` внутри |
| `ios-crew-18-rwb-<tag>.pdf` | тот же дек в PDF |

Скачать последний релиз:

```bash
gh release download --pattern '*.pdf'
gh release download --pattern '*.zip' && unzip -q *.zip -d deck && (cd deck && python3 -m http.server 8080)
```

### GitHub Pages

`pages.yml` готов, но стоит на ручном запуске: **Pages недоступен для приватных
реп на free-плане**. Чтобы включить — сделать репу публичной или перейти на
Pro/Team, затем *Settings → Pages → Source: GitHub Actions* и запустить воркфлоу.
Он собирает с `--base /<repo>/`.

Нужен приватный URL — Cloudflare Pages / Netlify / Vercel собирают приватные репы
на бесплатных тарифах; Cloudflare Access закроет сайт авторизацией.

## Правила работы с деком

Полный канон — в [`docs/style-guide.md`](docs/style-guide.md). Коротко:

- одна композиция на слайд, не больше двух брендовых акцентов;
- сирень — модель и веса, оранжевый — цена, лайм — проверка;
- логотип только на титуле и финале, пиксельный мотив — титул, открывашки, финал;
- заголовки — утверждения или вопросы, без «не X, а Y»;
- заметки спикера не сокращать: это абзацы авторского текста;
- ничего мельче 13 px; не помещается — резать на два слайда, а не уменьшать кегль.
