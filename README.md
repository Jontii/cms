# Mynt CMS

A visual CMS with multi-locale SEO support, built with Next.js, TypeScript, and React.

## Features

- **Visual Editor**: Drag-and-drop block builder for non-developers
- **Multi-locale Support**: Automatically creates pages for all configured locales
- **SEO Optimized**: Generates translated JSON-LD schemas for each locale
- **Block System**: Extensible block library with basic and SEO-focused blocks

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Panel

Navigate to `/admin` to access the CMS admin panel.

## Usage

### Creating a Page

1. Go to `/admin`
2. Click "Create New Page"
3. Enter a slug (e.g., "company-card")
4. The page will be automatically created for all configured locales (en, sv, no)

### Editing Content

1. Click on a page in the admin panel
2. Select a locale from the dropdown
3. Drag blocks from the sidebar into the canvas
4. Edit block properties in the editor panel
5. Changes are auto-saved

### Block Types

#### Basic Blocks
- **Text**: Rich text content
- **Image**: Image with alt text
- **Heading**: H1-H4 headings
- **Button**: Call-to-action buttons

#### SEO Blocks
- **Company Card**: Organization schema with address and contact info
- **Product Card**: Product schema with pricing and availability
- **Article**: Article schema with author and dates
- **FAQ**: FAQPage schema with questions and answers

## Project Structure

```
myntcms/
├── app/
│   ├── admin/              # Admin panel routes
│   ├── [locale]/           # Public site with locale routing
│   └── api/                # API routes
├── components/
│   ├── editor/             # Editor components
│   ├── blocks/             # Block components
│   └── public/             # Public-facing renders
├── lib/
│   ├── storage/            # JSON file storage
│   ├── schemas/            # JSON-LD schema generators
│   └── editor/             # Editor utilities
└── types/                  # TypeScript definitions
```

## Data Storage

Currently uses JSON files in the `data/` directory. Can be migrated to a database later.

## Locales

Default locales: English (en), Swedish (sv), Norwegian (no)

Configure in `types/locale.ts` or via the API.

## SEO

JSON-LD schemas are automatically generated for SEO blocks and injected into the page `<head>` for each locale.

## License

MIT
