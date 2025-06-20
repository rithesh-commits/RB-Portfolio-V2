# Design & Development Guidelines

This document provides a set of guidelines for the design system and development principles used in this portfolio project. Following these rules ensures consistency, maintains brand identity, and streamlines the development process.

## 1. Color Scheme

Consistency in color is crucial for a professional look and feel. The following color palette should be used for all new components and pages.

-   **Primary Brand Color:** `#0056D2` (A strong, professional blue)
    -   **Usage:** Main buttons, active links, icons, and important headings.
    -   **Tailwind:** `bg-[#0056D2]`, `text-[#0056D2]`, `border-[#0056D2]`

-   **Background Colors:**
    -   **Light Mode:** `bg-white` or `bg-gray-50`
    -   **Dark Mode:** `bg-black` or `bg-gray-800`

-   **Text Colors:**
    -   **Light Mode:** `text-gray-900` (headings), `text-gray-600` (body)
    -   **Dark Mode:** `text-white` (headings), `text-gray-300` (body)

-   **Accent Colors:**
    -   Use shades of the primary blue for hover effects, borders, and secondary elements (e.g., `bg-[#0056D2]/10` for light backgrounds).

## 2. Typography

We use specific fonts to maintain a consistent visual hierarchy. While these are set globally in `globals.css`, be mindful of applying the correct styles.

-   **Headings:** Use a distinct, bold font (as defined in the project's CSS). Apply classes like `text-4xl`, `font-bold`.
-   **Body Text:** Use a clean, readable font for paragraphs and general content.

## 3. Language & Translations

The entire website is bilingual (English and Telugu). All user-facing text **must** be added via the established translation system.

### How to Add New Text

1.  **Locate the Component:** Open the page or component where you need to add text (e.g., `app/notion-blogs/page.tsx`).
2.  **Find the `content` Object:** At the top of the file, you will find a `content` object.
3.  **Add Translation Keys:** Add a new key-value pair under both the `en` and `te` objects. The key should be descriptive (e.g., `newFeatureButton`).

    ```javascript
    const content = {
      en: {
        title: 'From My Notion',
        newFeatureButton: 'New Feature', // Add new English text here
      },
      te: {
        title: 'నా నోషన్ నుండి',
        newFeatureButton: 'కొత్త ఫీచర్', // Add new Telugu text here
      },
    }
    ```

4.  **Use the Text in JSX:** Use the `useLanguage` hook to get the `currentContent` and reference your new key.

    ```jsx
    const { language } = useLanguage();
    const currentContent = content[language];

    //... in your component's return statement
    <Button>{currentContent.newFeatureButton}</Button>
    ```

## 4. UX & Design Principles

These are the core principles that should guide all design and development work.

-   **Mobile-First Responsive Design:** Always design for mobile screens first, then use Tailwind's responsive prefixes (`md:`, `lg:`) to scale up for larger devices. The user experience must be excellent on all screen sizes.
-   **Clear Call-to-Action (CTA):** Every page should guide the user. Use visually distinct buttons (like the "Read More" button) for primary actions.
-   **Consistency is Key:** Components, spacing, and layouts should be consistent across the entire website. If a component for a certain UI pattern already exists, reuse it.
-   **Keep it Clickable:** For list items that lead to a detail page (like blog posts), make the entire element a clickable link, but also include an explicit button or link for maximum clarity.
-   **Provide Feedback:** Use hover effects, loading states (spinners or skeletons), and error messages to provide clear feedback to the user about their actions and the application's status.

## 5. Component Philosophy

-   **Build Reusable Components:** Whenever you create a new UI element that might be used elsewhere, build it as a reusable component.
-   **Single Responsibility:** Each component should have a single, clear purpose.
-   **Leverage `shadcn/ui`:** This project is built on `shadcn/ui`. Always use its components (`Button`, `Input`, `Card`, etc.) as a base to ensure visual consistency. Customize them using Tailwind CSS as needed. 