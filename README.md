# 🏢 WorkLife — Employee Web Portal

A React + TypeScript intranet/employee-portal web app. Provides employees with a central place to view company info, manage their profile, submit requests, track leaves, see their team/org hierarchy, and read announcements — with built-in **multi-language support** (Greek/English) and **accessibility settings** (adjustable font size).

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router DOM** — client-side routing
- **Tailwind CSS v4** — utility-first styling
- **Remix Icon** (`@remixicon/react`) + **Lucide React** — icon sets
- **survey-core** — form/survey engine (for applications/requests)
- **React Context API** — language/localization state (`LanguageContext`)
- **ESLint** — linting

## Features

- 🏠 **Home** — welcome dashboard
- 👤 **Profile** — employee profile page
- 🏢 **Company** — catalog and org **hierarchy** view
- 🌴 **Leaves** — leave management
- 📝 **Applications** — employee requests/applications
- 👥 **Team** — "My Team" view
- 📢 **Announcements** — company announcements
- 🌐 **Translations** — language switcher (Greek / English)
- 📖 **Guide** — usage guide
- 🔤 **Font size** — accessibility setting, persisted via `localStorage`
- ℹ️ **Information** — general info page
- 📅 Greek name-days data (`namedays.ts`) — likely used for a "today's name day" widget

## Project Structure

```
src/
├── pages/              # Route-level pages (Home, Profile, Leaves, Team, etc.)
├── components/
│   ├── Sidebar.tsx      # Main navigation sidebar
│   ├── QuickLinks.tsx   # Quick-access links widget
│   └── SearchBar.tsx    # Search bar
├── context/
│   └── LanguageContext  # Language/i18n provider (el/en)
├── i18n/
│   └── translations.ts  # All UI strings, per language
├── data/
│   └── namedays.ts       # Greek name-day calendar data
├── App.tsx              # Routes + layout shell
└── main.tsx             # Entry point
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/dimitrizzz/worklife_wepApp.git
cd worklife_wepApp
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes Overview

| Route               | Page          | Description                    |
|----------------------|---------------|----------------------------------|
| `/`                  | Home          | Welcome dashboard                |
| `/profile`           | Profile       | Employee profile                 |
| `/company/catalog`   | Catalog       | Company catalog                  |
| `/company/hierarchy` | Hierarchy     | Org chart                        |
| `/leaves`            | Leaves        | Leave management                 |
| `/applications`      | Applications  | Requests/applications             |
| `/team`               | Team          | My team                          |
| `/announcements`     | Announcements | Company announcements            |
| `/translations`      | Translations  | Language switcher                |
| `/guide`              | Guide         | Usage guide                      |
| `/font-size`          | Font Size     | Accessibility: text size         |
| `/information`        | Information   | General info                     |

## License

Private project — internal use.
