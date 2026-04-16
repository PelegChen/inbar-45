# Birthday Greetings 🎂

A template site for creating and sharing beautiful birthday greeting pages.

## Overview

This project provides a collection of ready-made birthday greeting pages that you can use as a starting point for sending personalized birthday wishes. It includes 8 different greeting styles, a shared context for customizing the recipient's name and message, and a navigation bar to browse between greetings.

## Features

- 8 unique birthday greeting page designs
- Shared greeting context (recipient name, message, etc.) across all pages
- Built with [React](https://react.dev/) and [Vite](https://vite.dev/) for fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Client-side routing via [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Shared UI components (e.g. Navbar)
├── context/        # GreetingProvider – shared greeting state
├── pages/          # Individual greeting pages (Greeting1 – Greeting8)
├── App.jsx         # Root component with routing
└── main.jsx        # Application entry point
```

## Customization

Update the greeting details (recipient name, message, etc.) through the `GreetingProvider` context found in `src/context/`. Each page in `src/pages/` can be further customized to match your preferred style.

## License

This project is open source and available under the [MIT License](LICENSE).
