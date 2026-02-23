# Handling Number Fields in Angular Signal Forms

This project demonstrates the evolution of handling number input fields in Angular's signals-based forms API, culminating in the solution introduced in Angular 21.2.0-rc.0 which adds support for `null` as a valid initial value for number fields.

## Overview

Handling number fields in Angular signal forms has been a pain point because HTML `<input type="number">` elements always produce string values, even when the field is empty. This demo walks through the options that have been available and why each falls short, before showing the clean solution now available.

This demo includes a signup form with an age field (`number | null`) to illustrate these challenges and their resolution.

## The Problem

When binding a `<input type="number">` to a signal form field typed as `number`, Angular signal forms previously had no great way to represent an empty field. Options explored included:

- **`age: number` with `0` as default** — misleading initial value; `0` is a valid age
- **`age: number` with `NaN` as default** — technically works but semantically awkward
- **`age: number | string`** — allows an empty string `''` as the initial value, but pollutes the type with `string`
- **`age: number | null`** — the cleanest option, but previously caused a TypeScript error because `null` was not accepted as an initial value for number fields

## The Solution (Angular 21.2.0-rc.0)

Angular 21.2.0-rc.0 adds support for initializing number form fields with `null`. This allows a clean, semantically correct type of `number | null` with `null` as the initial value, representing "no value entered yet" without compromising type safety.

```typescript
interface SignupModel {
  age: number | null;
}

protected readonly model = signal<SignupModel>({
  age: null,
});
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

Navigate to `http://localhost:4200` in your browser.

## Angular Version

This project uses **Angular 21.2.0-rc.0** which introduces `null` support for number fields in the signals-based forms API (`@angular/forms/signals`).
