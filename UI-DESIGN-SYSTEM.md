# HMS Module 3 — UI/UX Design System
### Departments & Services + Settings
> **For internal team use only.** All other modules must follow this guide to maintain a consistent look and feel across the HMS frontend.

---

## 1. Overview

This document captures every visual decision made in Module 3 — colours, typography, spacing, component shapes, layout coordinates, and interaction patterns. Copy these values exactly. Do not introduce new colours, font sizes, or radius values that aren't listed here.

---

## 2. Colour Palette

### 2.1 Primary Brand — Blue

This is the main action colour. Used on buttons, active nav items, focus rings, and links.

| Token | Hex | Usage |
|---|---|---|
| `primary-50` | `#eff6ff` | Hover backgrounds, icon container bg |
| `primary-100` | `#dbeafe` | Light tint, info banners |
| `primary-200` | `#bfdbfe` | Borders on hover states |
| `primary-300` | `#93c5fd` | — (reserved) |
| `primary-400` | `#60a5fa` | — (reserved) |
| `primary-500` | `#3b82f6` | Focus rings, chart fill accent |
| **`primary-600`** | **`#2563eb`** | ✅ **Main CTA buttons, active nav, logo bg** |
| `primary-700` | `#1d4ed8` | Button hover state |
| `primary-800` | `#1e40af` | — (reserved) |
| `primary-900` | `#1e3a8a` | Button shadow colour |

> **Rule:** For any "primary action" always use `primary-600`. Hover = `primary-700`. Never use `primary-500` for buttons.

---

### 2.2 Sidebar

| Token | Hex | Usage |
|---|---|---|
| `sidebar` | `#0f172a` | Sidebar background (Slate 900) |
| White/10 | `rgba(255,255,255,0.10)` | Nav item hover bg |
| White/60 | `rgba(255,255,255,0.60)` | Inactive nav icon + text |
| White/40 | `rgba(255,255,255,0.40)` | Module label, secondary text |
| White/50 | `rgba(255,255,255,0.50)` | Logo subtitle |

---

### 2.3 Neutral / Surface Colours

These come from Tailwind's default gray scale. Use these for all UI surfaces.

| Token | Hex | Usage |
|---|---|---|
| `gray-50` | `#f9fafb` | **Page background** |
| `gray-100` | `#f3f4f6` | Card borders, table row bg, icon containers |
| `gray-200` | `#e5e7eb` | Input borders, dividers |
| `gray-300` | `#d1d5db` | Scrollbar thumb, placeholder icons |
| `gray-400` | `#9ca3af` | Placeholder text, secondary icons |
| `gray-500` | `#6b7280` | Table headers, secondary body text |
| `gray-700` | `#374151` | Primary body text, button labels |
| `gray-800` | `#1f2937` | Headings, table cell primary content |
| `gray-900` | `#111827` | Page titles, modal titles, nav tooltips bg |

---

### 2.4 Semantic / Status Colours

| Colour | Background | Text | Border | Usage |
|---|---|---|---|---|
| **Emerald (Active)** | `emerald-50` `#ecfdf5` | `emerald-700` `#047857` | `emerald-200` `#a7f3d0` | Active status badges |
| **Red (Danger)** | `red-50` `#fef2f2` | `red-600` `#dc2626` | `red-200` `#fecaca` | Delete buttons, error states |
| **Amber (Warning)** | `amber-50` `#fffbeb` | `amber-600` `#d97706` | `amber-200` `#fde68a` | Warning banners, escalation alert |
| **Blue (Info)** | `blue-50` `#eff6ff` | `blue-700` `#1d4ed8` | `blue-200` `#bfdbfe` | Info badges, Consultation type |
| **Purple (Diagnostic)** | `purple-50` `#faf5ff` | `purple-700` `#7e22ce` | `purple-200` `#e9d5ff` | Diagnostic service type badge |
| **Orange (Procedure)** | `orange-50` `#fff7ed` | `orange-700` `#c2410c` | `orange-200` `#fed7aa` | Procedure service type badge |

---

### 2.5 Chart Colours

Used in Recharts (bar chart + pie chart). Keep this order exactly.

```
1. #3b82f6  — Blue        (primary-500)
2. #8b5cf6  — Purple
3. #f59e0b  — Amber
4. #ef4444  — Red
5. #10b981  — Emerald
6. #06b6d4  — Cyan
```

Dashboard welcome banner uses a CSS gradient:
```css
background: linear-gradient(to right, #1d4ed8, #2563eb, #3b82f6);
/* Tailwind: from-primary-700 via-primary-600 to-primary-500 */
```

---

## 3. Typography

### 3.1 Font Family

```css
font-family: 'Inter', system-ui, sans-serif;
```

Load from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

> **Rule:** Only Inter. Never use system fonts alone, never use Roboto, Poppins, or any other face.

---

### 3.2 Type Scale

| Role | Size | Weight | Tailwind class | Example usage |
|---|---|---|---|---|
| Page title | 20px / 1.25rem | 700 Bold | `text-xl font-bold text-gray-900` | "Departments" heading |
| Section heading | 14px / 0.875rem | 600 SemiBold | `text-sm font-semibold text-gray-900` | Card headings, modal titles |
| Body / table cell | 14px / 0.875rem | 400 Regular | `text-sm text-gray-700` | Table cells, form values |
| Label | 14px / 0.875rem | 500 Medium | `text-sm font-medium text-gray-700` | Form field labels |
| Secondary / meta | 12px / 0.75rem | 400 Regular | `text-xs text-gray-500` | Subtitles, timestamps, descriptions |
| Badge / chip text | 12px / 0.75rem | 500 Medium | `text-xs font-medium` | Status badges |
| Table header | 12px / 0.75rem | 600 SemiBold | `text-xs font-semibold text-gray-500 uppercase tracking-wider` | Column headers |
| Stat card value | 24px / 1.5rem | 700 Bold | `text-2xl font-bold text-gray-900 leading-none` | "10", "14" on stat cards |
| Monospace | inherit | 400 | `font-mono` | Codes like `CARD`, `ECG-01` |
| Micro / hint | 10px / 0.625rem | varies | `text-[10px]` | Logo subtitle, role text |

> **Antialiasing:** Always include `antialiased` on `<body>`. Tailwind class: `font-sans antialiased`.

---

## 4. Spacing System

All spacing follows Tailwind's 4px base unit.

| Value | px | Used for |
|---|---|---|
| `gap-1` / `space-y-1` | 4px | Inline icon-text gaps |
| `gap-2` | 8px | Small component internals |
| `gap-3` | 12px | Standard component gaps |
| `gap-4` | 16px | Grid columns, form fields |
| `gap-5` | 20px | Card internal padding sections |
| `gap-6` | 24px | Section separation |
| `p-4` | 16px | Default card padding (mobile) |
| `p-5` | 20px | Standard card padding |
| `p-6` | 24px | Settings tab content padding |
| `px-6 py-4` | 24px / 16px | Modal header |
| `px-6 py-5` | 24px / 20px | Modal body |
| `px-4 py-3` | 16px / 12px | Table header cells |
| `px-4 py-3.5` | 16px / 14px | Table data cells |

**Page outer padding:**
- Desktop: `p-6` (24px all sides)
- Mobile: `p-4` (16px all sides)

**Grid gaps between cards:** always `gap-4` (16px).

---

## 5. Border Radius

Consistent rounded corners are a core part of this design. Never use sharp corners.

| Radius | Tailwind | px | Usage |
|---|---|---|---|
| `rounded-lg` | `rounded-lg` | 8px | Small buttons (hamburger), dropdown items |
| `rounded-xl` | `rounded-xl` | 12px | Buttons, inputs, selects, tooltips, small icon containers |
| **`rounded-2xl`** | `rounded-2xl` | **16px** | **Cards (`.card`), modals, aside panels** |
| `rounded-full` | `rounded-full` | 9999px | Badges, toggles, pills, scrollbar thumb, notification dot |

> **The `.card` class always uses `rounded-2xl`.** This is the single most important shape rule.

---

## 6. Shadows & Elevation

| Level | Tailwind | Usage |
|---|---|---|
| Subtle surface | `shadow-sm` | Cards (`.card`), primary buttons |
| Header | `shadow-sm` | Top navigation bar |
| Dropdown / modal | `shadow-xl` | Modals, dropdowns, tooltips |
| Deep | `shadow-2xl` | Modal overlay dialogs, save bar |
| Coloured | `shadow-lg shadow-primary-900/30` | Active nav item in sidebar |

---

## 7. Layout & Grid Coordinates

### 7.1 Overall Shell

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (w-64 / 256px)  │  Main content area        │
│  bg: #0f172a             │  flex-col                 │
│                          │  ┌────────────────────┐   │
│                          │  │ Top header (h-14)  │   │
│                          │  │ bg: white           │   │
│                          │  └────────────────────┘   │
│                          │  ┌────────────────────┐   │
│                          │  │ <main>             │   │
│                          │  │ p-4 lg:p-6         │   │
│                          │  │ overflow-y-auto    │   │
│                          │  └────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

| Region | Width | Height | Background |
|---|---|---|---|
| Sidebar (expanded) | 256px (`w-64`) | 100vh | `#0f172a` |
| Sidebar (collapsed) | 72px (`w-[72px]`) | 100vh | `#0f172a` |
| Top header | 100% of main | 56px (`h-14`) | `#ffffff` |
| Page content `<main>` | 100% | remaining | `#f9fafb` |

---

### 7.2 Sidebar Anatomy

```
┌─────────────────────┐  ← border-b: rgba(255,255,255,0.10)
│  [Logo icon 36×36]  │  ← rounded-xl, bg: primary-600
│  Advifiction HMS    │  ← text-sm font-bold
│  Hospital Mgmt      │  ← text-[10px] text-white/50
├─────────────────────┤  ← px-4 pt-5 pb-2
│  MODULE 3           │  ← text-[10px] uppercase tracking-widest white/40
├─────────────────────┤
│  Nav items          │  ← px-2 py-2, gap: space-y-0.5
│  Each item:         │  ← px-3 py-2.5 rounded-xl
│  • Active: bg primary-600, text white
│  • Inactive: text white/60, hover bg white/10
├─────────────────────┤  ← border-t: rgba(255,255,255,0.10)
│  Help & Support     │  ← p-2
│  Collapse ←         │
└─────────────────────┘
```

---

### 7.3 Top Header Anatomy

```
[ ≡ mobile ] [ Page Title text-base font-semibold ] .............. [ 🔍 ] [ 🔔• ] [ AD ▾ ]
    ↑                    ↑                                                           ↑
  lg:hidden         flex-1 min-w-0                               User avatar: w-7 h-7 rounded-lg bg-primary-600
```

- Height: `h-14` (56px)
- Left/right padding: `px-4 lg:px-6`
- Border bottom: `border-gray-100` (1px)
- Gap between items: `gap-2`

---

### 7.4 Dashboard Layout Grid

```
Row 1: Welcome banner       → col-span-full, gradient blue
Row 2: Stat cards           → grid-cols-2 lg:grid-cols-4, gap-4
Row 3: Charts               → grid-cols-1 lg:grid-cols-3, gap-4
        └─ Bar chart        → lg:col-span-2
        └─ Pie chart        → col-span-1
Row 4: Middle row           → grid-cols-1 lg:grid-cols-2, gap-4
        └─ Top Services     → col-span-1
        └─ Consult Types    → col-span-1
Row 5: Bottom row           → grid-cols-1 lg:grid-cols-3, gap-4
        └─ Dept table       → lg:col-span-2
        └─ Hours + Esc      → col-span-1, flex flex-col gap-4
Row 6: Quick links          → grid-cols-2 sm:grid-cols-4, gap-3
```

---

### 7.5 List Page Layout (Departments / Services)

```
[Page title + description]          [+ Add Button]
[Summary pills row]
[Filter bar card: searchbar + selects]
[Table card]
  thead: bg-gray-50, border-b gray-100
  tbody: divide-y divide-gray-50, hover:bg-gray-50/70
  tfoot row: px-4 py-3 "Showing X of Y"
```

---

### 7.6 Card Components

`.card` class definition:
```css
background: #ffffff;
border-radius: 16px;       /* rounded-2xl */
border: 1px solid #f3f4f6; /* border-gray-100 */
box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); /* shadow-sm */
```

**Standard card padding:** `p-5` (20px)  
**Settings page card:** `p-6` (24px)

---

## 8. Component Specifications

### 8.1 Buttons

| Variant | Background | Text | Border | Radius | Padding | Hover |
|---|---|---|---|---|---|---|
| Primary | `#2563eb` | white | none | `rounded-xl` | `px-4 py-2` | `#1d4ed8` |
| Secondary | white | `gray-700` | `gray-200` | `rounded-xl` | `px-4 py-2` | `gray-50` |
| Danger | `#dc2626` | white | none | `rounded-xl` | `px-4 py-2` | `#b91c1c` |

All buttons: `text-sm font-medium`, `gap-2` between icon and label, `active:scale-95 transition-all duration-150`

---

### 8.2 Inputs & Selects

```css
padding: 10px 14px;          /* px-3.5 py-2.5 */
font-size: 14px;             /* text-sm */
border: 1px solid #e5e7eb;   /* border-gray-200 */
border-radius: 12px;         /* rounded-xl */
background: #ffffff;
placeholder color: #9ca3af;  /* gray-400 */

:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6; /* ring-2 ring-primary-500 */
  border-color: transparent;
}
```

---

### 8.3 Badges / Status Pills

All badges: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium`

| Badge | BG | Text | Border |
|---|---|---|---|
| Active | `#ecfdf5` | `#047857` | `#a7f3d0` |
| Inactive | `#f3f4f6` | `#6b7280` | `#e5e7eb` |
| Blue (Info) | `#eff6ff` | `#1d4ed8` | `#bfdbfe` |
| Purple | `#faf5ff` | `#7e22ce` | `#e9d5ff` |
| Orange | `#fff7ed` | `#c2410c` | `#fed7aa` |

---

### 8.4 Toggle Switch

```
Width:  36px  (w-9)
Height: 20px  (h-5)
Thumb:  14px × 14px  (h-3.5 w-3.5)
Border-radius: 9999px (rounded-full)

OFF state: bg #e5e7eb (gray-200), thumb translateX(3px)
ON  state: bg #2563eb (primary-600), thumb translateX(18px)
Transition: duration-200
```

---

### 8.5 Modal

```
Backdrop: bg-gray-900/50 + backdrop-blur-sm
Container:
  bg: white
  border-radius: rounded-2xl (16px)
  max-height: 90vh
  overflow: hidden (flex flex-col)

Header: px-6 py-4, border-b gray-100
  Title: text-base font-semibold text-gray-900
  Close: p-1.5 rounded-lg text-gray-400

Body: px-6 py-5, overflow-y-auto flex-1

Sizes:
  sm → max-w-md  (448px)
  md → max-w-lg  (512px)
  lg → max-w-2xl (672px)
  xl → max-w-3xl (768px)
```

---

### 8.6 Stat Cards

```
Container: .card p-5, flex items-start gap-4
Icon box:  w-12 h-12 (48×48), rounded-2xl
Value:     text-2xl font-bold text-gray-900 leading-none
Title:     text-xs font-medium text-gray-500
Trend:     text-xs, emerald-600 (up) / red-500 (down)
```

Icon box colours per module:
- Departments → `bg-blue-50` / `text-blue-600`
- Services → `bg-purple-50` / `text-purple-600`
- Consult Types → `bg-amber-50` / `text-amber-600`
- Languages / Settings → `bg-emerald-50` / `text-emerald-600`

---

### 8.7 Table

```
thead: bg-gray-50, border-b border-gray-100
  th:  px-4 py-3, text-xs font-semibold text-gray-500 uppercase tracking-wider

tbody: divide-y divide-gray-50
  tr hover: bg-gray-50/70 transition-colors
  td: px-4 py-3.5, text-sm text-gray-700

tfoot row: px-4 py-3, border-t border-gray-100
  "Showing X of Y": text-xs text-gray-500
```

---

## 9. Icon Library

**Only use [Lucide React](https://lucide.dev/).** No other icon libraries.

Standard icon sizes:

| Context | Size |
|---|---|
| Sidebar nav items | `size={18}` |
| Button icons | `size={16}` |
| Table action icons | `size={15}` |
| Input prefix icons | `size={15}` |
| Stat card icons | `size={22}` |
| Header icons (bell, search) | `size={18}` |
| Badge icons | `size={10}` or `size={11}` |

---

## 10. Scroll & Overflow

Custom scrollbar (defined globally):
```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 9999px; }
::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
```

Tables with horizontal overflow: always wrap in `<div class="overflow-x-auto">`.  
Sidebar nav: `overflow-y-auto` to handle many items.

---

## 11. Animation & Transitions

| Interaction | Transition |
|---|---|
| Buttons (press) | `active:scale-95 transition-all duration-150` |
| Nav item hover | `transition-all duration-150` |
| Sidebar collapse | `transition-all duration-300 ease-in-out` |
| Toggle switch | `transition-colors duration-200` / thumb `transition-transform duration-200` |
| Dropdowns | `opacity-0 group-hover:opacity-100` |
| Save bar (fade) | `transition-all duration-300` |
| Toast | fade in/out via `setTimeout` 3000ms |

---

## 12. Responsive Breakpoints

Tailwind defaults. The layout has three states:

| Breakpoint | `sm` ≥ 640px | `lg` ≥ 1024px |
|---|---|---|
| Sidebar | Hidden (drawer) | Fixed, always visible |
| Stat cards | 2 columns | 4 columns |
| Charts row | stacked | 3-column grid |
| Table columns | some hidden | all visible |
| Header padding | `px-4` | `px-6` |
| Page padding | `p-4` | `p-6` |

Hide columns progressively:
- `hidden sm:table-cell` → show at 640px+
- `hidden md:table-cell` → show at 768px+
- `hidden lg:table-cell` → show at 1024px+

---

## 13. Settings Page — Tab Pattern

```
Tab bar: .card p-1, flex gap-1, overflow-x-auto
Each tab: px-4 py-2.5 rounded-xl text-sm font-medium
  Active:   bg-primary-600 text-white shadow-sm
  Inactive: text-gray-600 hover:bg-gray-100

Content card: .card p-6
```

Save bar (unsaved changes):
```
Position: fixed bottom-0, full width, z-30, pb-4
Container: max-w-5xl mx-auto, bg-gray-900 text-white, rounded-2xl, px-5 py-3.5
```

Toast notification:
```
Position: fixed bottom-8 right-4, z-50
Style: bg-gray-900 text-white, px-4 py-3, rounded-xl, shadow-2xl
Duration: 3000ms auto-dismiss
```

---

## 14. Do's and Don'ts

### ✅ Do
- Use `rounded-2xl` for all cards and modals
- Use Inter font everywhere
- Use `primary-600` for all primary actions
- Use `#0f172a` (slate-900) for the sidebar
- Use `#f9fafb` (gray-50) as the page background
- Use `#ffffff` with `border-gray-100` for cards
- Add `shadow-sm` to cards and `shadow-xl` to dropdowns/modals
- Keep table row hover as `hover:bg-gray-50/70`
- Use `text-xs font-semibold text-gray-500 uppercase tracking-wider` for table headers

### ❌ Don't
- Don't use sharp corners (`rounded-none` or `rounded-sm`) on cards or modals
- Don't introduce new font families
- Don't use `gray-900` as a page background
- Don't mix multiple primary colours — blue is the only brand colour
- Don't use `shadow-lg` on cards (it's too heavy)
- Don't add colour to table row backgrounds unless hovering
- Don't use font sizes outside the type scale above
- Don't create new badge colour variants — use only the 5 defined ones

---

## 15. File Structure Reference

```
src/
├── index.css            ← All global tokens, component classes
├── main.jsx
├── App.jsx
├── layouts/
│   └── MainLayout.jsx   ← Sidebar + header shell
├── pages/
│   ├── Dashboard.jsx
│   ├── Departments.jsx
│   ├── Services.jsx
│   ├── ConsultationTypes.jsx
│   └── Settings.jsx
├── components/
│   └── ui/
│       ├── Modal.jsx
│       ├── Toggle.jsx
│       ├── ConfirmDialog.jsx
│       ├── SearchBar.jsx
│       ├── EmptyState.jsx
│       └── StatCard.jsx
└── data/
    └── mockData.js
```

> All reusable UI components live in `src/components/ui/`. When building your module, import from here — do not create duplicate toggles, modals, or badges.

---


