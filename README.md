# Food Management App

A functional and user-friendly web application built with Next.js and TypeScript for managing food items. This application allows users to search, add, edit, and remove food items efficiently.

## Features

- 🔍 Search for food items quickly and accurately
- ➕ Add new food items with validation
- ✏️ Edit existing food items
- 🗑️ Delete food items
- 📱 Fully responsive design
- ⚡ Optimized performance with loading states
- 🎨 Smooth animations and transitions
- ✅ Comprehensive form validation
- 🧪 Test coverage for critical scenarios

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **API**: MockAPI (https://6852821e0594059b23cdd834.mockapi.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd food-management-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
food-management-app/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/                # Utility functions
│   └── api.ts         # API client
├── types/              # TypeScript type definitions
│   └── index.ts
├── styles/             # Global styles
├── __tests__/          # Test files
```

## API Endpoints

The application uses MockAPI for data management:

- `GET /food` - Get all food items
- `GET /food/:id` - Get a single food item
- `POST /food` - Create a new food item
- `PUT /food/:id` - Update a food item
- `DELETE /food/:id` - Delete a food item

## Naming Conventions

- CSS classes must start with `.food-` prefix
- Test IDs must start with `food-` prefix
- Components use PascalCase
- Files use kebab-case or PascalCase for components

## Testing

The project includes test coverage for:

- Component rendering
- User interactions
- API mocking and error handling

Run tests with:

```bash
npm run test
```

## Deployment

The application can be deployed to:

- Vercel (preferred)
- Netlify
- GitHub Pages

Make sure to:

- Deploy from the `main` branch
- Ensure HTTPS is enabled
- Verify all environment variables are set

## License

This project is created for assessment purposes.
# Updated
