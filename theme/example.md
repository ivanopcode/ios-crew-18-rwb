---
theme: ./
title: Локальные модели для разработки под iOS на Apple Silicon
info: Витрина темы slidev-theme-rwb-tech — каждая раскладка и компонент на реальном слайде доклада
transition: fade
layout: cover
event: PODLODKA iOS CREW · 14.09.2026
who: Иван Опарин
role:
  - 'Старший программный инженер, RWB'
  - 'Relux Works — соавтор open-source экосистемы агентской разработки'
contacts: t.me/ivanopcode · github.com/ivanopcode
---

# Интегрируем локальные LLM в рабочие процессы разработки

<!--
Текстовый титул темы. В деке титул — карточка конференции: `image: /media/cover-podlodka.webp`.
-->

---
layout: section
num: '03'
sub: Память, квантизация, архитектура, скорость
icon: computer
transition: slide-left
---

# Как запустить на своём Mac

<!--
Открывашка: фиолетовый фон, лесенка квадратов, 3D-иконка шаблона (server · cubes · computer · notepad).
-->

---
layout: default
tag: '03 · КАК ЗАПУСТИТЬ НА СВОЁМ MAC'
source: Опубликованные кванты — huggingface.co/unsloth/Qwen3.8-27B-GGUF
---

# Квантизация: *размер, точность, скорость*

| Квант Qwen3.8-27B | Размер GGUF | Что даёт |
| --- | --- | --- |
| UD-Q4_K_M | `≈ 16.5 GB` | Место для более способной модели или больше памяти контексту |
| UD-Q6_K | `≈ 22 GB` | Ближе к исходной точности при большем размере |

<p class="lead">Компромисс проверяется на задачах: вместе с размером могут меняться точность и скорость конкретной реализации.</p>

<!--
Рабочий слайд: заголовок с сиреневым акцентом (*курсив*), таблица, вывод плашкой `.lead` внизу, источник строкой над футером.
-->

---
layout: default
tag: '02 · ЗАЧЕМ, ЕСЛИ ЕСТЬ ОБЛАКО'
---

# Четыре *причины*

<div class="cards cols-2 grow">
<div v-click="1" class="card num" data-num="01"><h2>Экономика</h2><p>Токены дорожают, Mac уже куплен и простаивает 16 часов в сутки.</p></div>
<div v-click="2" class="card num" data-num="02"><h2>Контроль среды исполнения</h2><p>Свой код, своё железо, никакой зависимости от внешнего сервиса.</p></div>
<div v-click="3" class="card num" data-num="03"><h2>Чувствительные задачи</h2><p>Код и данные, которые нельзя выносить за контур.</p></div>
<div v-click="4" class="card num" data-num="04"><h2>Закрытые политиками задачи</h2><p>Реверс-инжиниринг протокола — облачная модель откажет, локальная сделает.</p></div>
</div>

<!--
Сетка карточек `.cards.cols-2` (`cols-3`, `cols-4`), `grow` растягивает до плашки или футера. `.card.num` с `data-num` — номер в углу.
-->

---
layout: default
tag: ВСТУПЛЕНИЕ
---

# Эпоха изобилия *заканчивается*

<div class="cards cols-2">
<BigNum value="$1 000" caption="столько стоил бы один день активной работы с фронтир-моделью по API-тарифу" />
<BigNum v-click tone="neutral" value="10 t/s" caption="одна сессия на M3 Max — серый вариант с сиреневым числом" />
</div>

<div class="cards cols-3">
<div v-click class="card">Серая карточка — нейтральный блок</div>
<div v-click class="card lilac">Сиреневая — главный вывод, тёмный текст</div>
<div v-click class="card purple">Фиолетовая — «другая сторона» или главное</div>
</div>

<p class="lead lilac">Плашка `.lead.lilac` — светлый вариант вывода.</p>

<!--
BigNum — карточка с числом: фиолетовая по умолчанию, `tone="neutral"` — серая, `size="xl"` — число на всю карточку.
-->

---
layout: two-cols
tag: '01 · ПОЧЕМУ К ЛОКАЛЬНЫМ МОДЕЛЯМ СТОИТ ВЕРНУТЬСЯ'
---

::title::
# Почему к локальным моделям *стоит вернуться*

::default::
<h2>Причины из июльского доклада</h2>

<ul>
<li v-click="1">Контролировать среду исполнения</li>
<li v-click="2">Работать со своим кодом</li>
<li v-click="3">Использовать доступное железо</li>
<li v-click="4">Меньше зависеть от доступности внешнего сервиса</li>
</ul>

::right::
<h2>Добавилось к концу лета</h2>

<p v-click="5">Часть моделей уже достаточно способна, чтобы искать для неё постоянное место в рабочем процессе.</p>

::bottom::
<p v-click="6" class="lead">Две колонки — серая карточка против фиолетовой; `left-tone` и `right-tone` меняют заливки.</p>

---
layout: default
tag: '03 · КАК ЗАПУСТИТЬ НА СВОЁМ MAC'
---

# Слои за *агентским терминалом*

<Stack reveal :layers="[['Среда', 'цикл и инструменты', 'lilac'], ['Протокол', 'сообщения и вызовы'], ['Движок', 'исполняет модель'], ['Архитектура и квант', 'характер вычислений и хранения'], ['Железо', 'память и пропускная способность']]" />

<Boxes :items="['Skills', 'MCP', 'Контексты', 'Инструменты']" :arrows="true" color="lilac" />

<p class="lead">Stack — строки «термин — пояснение» с линейками, `reveal` — по строке на клик. Boxes — ряд плашек: серые или цветные (`color`).</p>

---
layout: default
tag: '04 · ГРАФ ЗАДАЧ'
---

# Диаграмма: *узлы-заливки*

<svg width="908" height="120" viewBox="0 0 908 120" aria-hidden="true">
  <defs><marker id="arr-ex" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" class="m" /></marker></defs>
  <rect x="0" y="20" width="200" height="56" rx="10" class="n-lilac" />
  <text x="100" y="44" text-anchor="middle" class="t-ink t-big">Контракт</text>
  <text x="100" y="63" text-anchor="middle" class="t-ink-sec">в работе</text>
  <line x1="200" y1="48" x2="240" y2="48" class="e" marker-end="url(#arr-ex)" />
  <rect x="244" y="20" width="200" height="56" rx="10" class="n-lime" />
  <text x="344" y="44" text-anchor="middle" class="t-ink t-big">Данные и reducer</text>
  <text x="344" y="63" text-anchor="middle" class="t-ink-sec">готово · свои проверки</text>
  <line x1="444" y1="48" x2="484" y2="48" class="e" marker-end="url(#arr-ex)" />
  <rect x="488" y="20" width="200" height="56" rx="10" class="n" />
  <text x="588" y="44" text-anchor="middle" class="t-big">Интеграция</text>
  <text x="588" y="63" text-anchor="middle" class="t-sec">ждёт обе ветки</text>
  <rect x="712" y="20" width="196" height="56" rx="10" class="n-orange" />
  <text x="810" y="44" text-anchor="middle" class="t-ink t-big">Красная зона</text>
  <text x="810" y="63" text-anchor="middle" class="t-ink-sec">внимание · цена</text>
  <text x="0" y="110" class="t-dim">классы rect: n · n-lilac · n-lime · n-orange · n-purple · n-wait; текст: t-ink · t-sec · t-dim · t-big · t-lab · t-cap</text>
</svg>

<p class="lead">Inline SVG без обводок: заливка узла задаёт роль, подписи — классами. Атрибуты font-size на text не ставить.</p>

---
layout: code-side
tag: '04 · КАКИЕ ЗАДАЧИ ОТДАВАТЬ'
---

::title::
# Код и *пояснение справа*

::default::

```swift {2,3}
enum Action: Relux.Action {
    case obtainNotesSuccess(notes: [Model.Note])
    case deleteNoteSuccess(note: Model.Note)
    case deleteNoteFail(err: Err)
}
```

::side::
## Что смотреть

- **Закрытый enum** — компилятор заставит обработать каждое действие
- **Подсветка строк** — `{2,3}` после языка

Ошибки ловят тест и интеграция.

---
layout: demo
tag: '03 · ДЕМО'
num: Демо 1
---

# Hello World

<p class="sec">Pi → localhost → Qwen отвечает</p>

<!--
Бампер перед демо: метка `num`, заголовок и подзаголовок; квадраты по углам, без логотипа.
-->

---
layout: statement
tag: ЭПИЛОГ
after: Оправданий не делать этого больше нет.
---

Без рельсов потолок агентской системы низкий. *С рельсами предела сложности нет.*

---
layout: end
who: Иван Опарин
contacts: t.me/ivanopcode · github.com/ivanopcode
qrs: ['репозиторий', 'июльский доклад', 'канал']
---

# Спасибо

<p class="lead">Одна модель на своём Mac, один полный цикл, одна задача с критерием принятия.</p>

<p class="sec small">Три места под QR — dashed-плейсхолдеры до появления настоящих кодов.</p>
