# FlexPrice Intern Assignment Submission

Welcome to my submission for the FlexPrice Intern Assignment. I've built a scalable, robust, and well-tested component library that closely mirrors the FlexPrice UI and design system, keeping in mind the advanced challenges outlined in the rubric.

## 🚀 Overview of My Approach

My overarching philosophy for this assignment was **Quality and Scalability**. Instead of rushing to build every possible page, I focused on building a solid foundation of 15+ well-crafted components that strictly follow modern React architectures, `shadcn/ui` patterns, and accessibility standards. 

I prioritized robust Storybook documentation, comprehensive unit testing, and solving the advanced state management challenges to prove architectural judgment and readiness for a production environment.

### 1. Component Coverage & Fidelity (25%)
To ensure 100% fidelity to the FlexPrice aesthetic, I built upon the existing `tailwind.config.js` design tokens and `components.json`.
- **Atoms**: Refined and built core primitives (`Button`, `Chip`, `Input`, `Select`, `Spinner`, `Tooltip`, `DateRangePicker`). These serve as the fundamental building blocks for the entire app.
- **Molecules**: Built composite, domain-specific components like `MetricCard`, `Table` (with virtualization!), `SearchBar`, `UsageBar`, `InvoiceStatusBadge`, and `SidebarNav`.
- **Organisms**: Assembled higher-level layouts like `EmptyPage` and the `PlanPriceTable` (`PricingTierTable`) to demonstrate how atoms and molecules fit together to build complex data views.
- **Design Decisions**: Kept component APIs clean and extensible, avoiding "prop-drilling" by utilizing intelligent React composition.

### 2. Advanced Challenges: Virtualization & State (20%)
I tackled the advanced architectural challenges to demonstrate an understanding of performance and state management at scale:
- **Filter Persistence (`useFilterStore.ts`)**: I built a highly robust, typed persistent filter store using `zustand` and `zustand/middleware`. It persists complex filtering states to `sessionStorage` (so filters survive refreshes) and seamlessly syncs a "fingerprint" count to the URL via `useSearchParams()`. This prevents URL bloat while still keeping state somewhat trackable.
- **Table Virtualization (`Table.tsx`)**: Implemented robust row virtualization utilizing `@tanstack/react-virtual`. This ensures the `FlexpriceTable` can render thousands of data points with near-zero performance degradation by only rendering the rows currently visible in the DOM.
- **Query Configuration (`queryConfig.ts`)**: Created standardized configurations and abstractions for handling data fetching queries, ensuring consistent stale times, caching behavior, and error handling across the app.

### 3. Storybook Documentation (20%)
A component library is only as good as its documentation. Every component I touched or created has a corresponding `.stories.tsx` file.
- Heavily utilized Storybook decorators and mock data to showcase components in realistic environments.
- Provided rich, interactive controls (`args`) so that reviewers can test different variants (e.g., button sizes, chip states, loading spinners, table empty states) without needing to spin up the actual app.

### 4. Code Quality & Architecture (20%)
- **Strict TypeScript**: Enforced strict TS interfaces for all component props, utility functions, and Zustand store states to eliminate runtime `undefined` errors.
- **Standardized Conventions**: Maintained consistent naming conventions (PascalCase for components, camelCase for utilities, semantic `shadcn`-style variants like `destructive` or `outline`).
- **No Backend Required**: All components were engineered to be fully pure or decoupled from backend logic, utilizing mock data heavily as instructed.

### 5. Testing (10%)
I ensured high reliability for core utilities and components using **Vitest**:
- Wrote thorough unit tests for core formatting utilities (`format_date.test.ts`, `format_number.test.ts`, `format_cadence_chip.test.ts`) and query configurations to guarantee data displays correctly.
- Implemented core component interaction tests for `Button` and `Chip` to verify edge cases, accessibility attributes, and click handlers.

---

## 🛠️ How to Review

You can easily review my work locally without needing to connect to a backend. 

### 1. View Components in Storybook
The easiest way to see the components in action is through Storybook:
```bash
npm install
npm run storybook
```
This will open up a local server (`http://localhost:6006`) where you can test all the interactive components, their variants, and review the documentation.

### 2. Run the Test Suite
To verify the Vitest unit tests:
```bash
npm run test
```

---

Thank you for reviewing my submission! I am excited about the opportunity and look forward to discussing my architectural decisions and code with the FlexPrice team.

*(Note: The original repository README can be found in `README_ORIGINAL.md`)*
