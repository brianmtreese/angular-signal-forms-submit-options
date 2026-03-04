# Angular Signal Forms: Submit Options

This project demonstrates the `ignoreValidators` submission option in Angular Signal Forms (Angular 21.2+), which controls how form submission behaves when async validators are still pending.

## Overview

By default, Angular Signal Forms allow submission even while async validators are running, which can cause validation errors to appear after the fact. The `ignoreValidators` option lets you control this behavior precisely.

## The Three Modes

- **`'pending'`:** *(default)* Submits the form even if async validators are still running. Validation errors may appear after submission.
- **`'none'`:** Blocks submission entirely until all validators (sync and async) have completed and the form is valid.
- **`'all'`:** Submits regardless of validation state, ignoring both pending and invalid states.

## Bonus: `onInvalid` Callback

The `onInvalid` option lets you hook into failed submission attempts, useful for automatically focusing the first invalid field to improve user experience.

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

This project uses **Angular 21+** and the `@angular/forms/signals` API.
