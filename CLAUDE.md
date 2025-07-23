# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project using the App Router with TypeScript, Tailwind CSS 4, and DaisyUI components. The project follows standard Next.js conventions with a minimal setup.

## Development Commands

- **Start development server**: `bun dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build`  
- **Start production server**: `npm run start`
- **Run linter**: `npm run lint`

Note: The README mentions using `bun dev` but package.json scripts use npm. Both should work.

## Architecture & Structure

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled  
- **Styling**: Tailwind CSS 4 + DaisyUI components
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Package Manager**: Uses Bun (based on bun.lock presence)

### Key Files & Directories
- `src/app/`: Main application code using App Router
  - `layout.tsx`: Root layout with font configuration
  - `page.tsx`: Home page component  
  - `globals.css`: Global styles and Tailwind directives
- `tsconfig.json`: TypeScript configuration with `@/*` path mapping to `src/*`
- `next.config.ts`: Next.js configuration (currently minimal)
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS 4

### Project Conventions
- Uses TypeScript with strict compiler settings
- Path alias `@/*` maps to `src/*` for imports
- Component files use `.tsx` extension
- CSS-in-JS not used - styling handled by Tailwind CSS and DaisyUI
- **Code Style**: 
  - Use double quotes ("") instead of single quotes ('')
  - Avoid superfluous comments - only comment to explain unorthodox approaches, not obvious code

### Styling Guidelines
- Always make sure to use daisyui colors