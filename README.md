# 🚄 Trainline Travel Hub — Production-Grade Simulation Platform

**Version**: 2.0.0
**Status**: Production Ready
**Architecture**: Clean, Modular, Extensible

---

## 🎯 Overview

Enterprise travel simulation platform demonstrating unified multi-modal booking with:
- Dynamic pricing engine
- Fleet-wide revenue projections
- AI-powered journey optimization
- Executive dashboard with live metrics
- Multiple persona support (Family, Student, Business)

### Key Features

✅ **Zero UI Arithmetic** — All calculations centralized in engine layer
✅ **Persona Unification** — Single simulator, multiple personas
✅ **Modular Architecture** — Clean separation of concerns
✅ **API Integration Ready** — Service layer abstraction
✅ **Type-Safe** — Full TypeScript coverage
✅ **Visual Editor Compatible** — Cursor-friendly components

---

## 🏗️ Architecture

```
src/
├── data/           # Static datasets
├── config/         # Business constants & personas
├── domain/         # Domain models
├── lib/            # Pricing & revenue engines
├── hooks/          # State management
├── services/       # API abstraction
├── features/       # Modular UI features
│   └── simulator/  # Step-based journey builder
└── components/     # Shared components
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

---

## 🎭 Personas

The platform supports three distinct personas with smart defaults:

### 👨‍👩‍👧‍👦 Family
- 2 adults + 3 children
- Flexible rail class
- Balanced ancillary priority
- £420 avg journey value

### 🎓 Student
- 1 adult
- Standard rail class
- Budget-focused
- £185 avg journey value

### 💼 Business
- 1 adult
- First Class rail
- Premium extras
- £340 avg journey value

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Detailed architecture guide
- `/reference/travel-everyday-app` — Original implementation
- `src/services/vendorService.ts` — API integration guide

---

**Built with ❤️ by the Trainline Travel Hub team**
