# AI Agent Editing Guide
## ACS Next.js Frontend Development Standards

### Overview
This guide provides comprehensive instructions for AI agents on how to make edits to the ACS Next.js application in accordance with the established frontend stack, architecture patterns, and documentation standards.

---

## 🎯 Core Development Principles

### 1. Centralization First
**ALWAYS centralize functionality at the earliest possible point in the data flow:**

- **Data Processing**: All raw API responses must be processed through centralized functions in `lib/utils/api.ts`
- **Common Logic**: Shared business logic goes in `lib/utils/` with specific domain files
- **API Operations**: Use the centralized `apiClient` from `lib/api/client.ts`
- **State Management**: Centralized hooks in `hooks/` directory
- **Type Definitions**: Centralized types in `types/` directory

VERY IMPORTANT: BEFORE ADDING ANY FUNCTIONALITY, ALWAYS CHECK FOR EXISTING FUNCTIONALITY THAT CAN BE REUSED AND IMPROVED FOR EFFICIENCY, ROBUSTNESS AND PERFORMACE

WE WANT TO MAKE SURE OUR FUNCTINALITY IS SIMPLE, EXTRENMELY ROBUST, AND FUTUREPROOF

### 2. Modular Component Architecture
**Every component should be modular and reusable:**

- **Single Responsibility**: Each component has one clear purpose
- **Composition Over Inheritance**: Use component composition patterns
- **Props Interface**: Always define explicit TypeScript interfaces
- **Barrel Exports**: Use index files for clean imports
- **Feature Organization**: Group related components in feature directories

### 3. Graceful Error Handling
**Implement comprehensive error handling at every level:**

- **Error Boundaries**: Wrap all major components with ErrorBoundary
- **Loading States**: Always provide loading indicators
- **Fallback UI**: Graceful degradation for all error scenarios
- **User Feedback**: Clear error messages with recovery options
- **Logging**: Proper error logging for debugging

### 4. ACS Theme Compliance
**Follow the established ACS design system:**

- **Color Palette**: Use ACS theme colors from CSS variables
- **Typography**: Follow established font hierarchy
- **Spacing**: Use consistent spacing patterns
- **Animations**: Leverage predefined animations
- **Responsive Design**: Mobile-first approach

---

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.0 with App Router
- **Language**: TypeScript 5.x (strict mode enabled)
- **Styling**: Tailwind CSS 4.x with custom animations
- **UI Components**: 
  - Radix UI (tabs, dialogs, etc.)
  - Lucide React (icons)
  - Material-UI (charts, complex components)
  - Custom components with class-variance-authority
- **State Management**: React Context + Custom Hooks
- **Authentication**: NextAuth.js 4.24.11
- **Animations**: Framer Motion + AOS
- **Charts**: Recharts
- **Build Tool**: Turbopack (development)

### Project Structure
```
acs-next-js-dev/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route groups for authentication
│   ├── (dashboard)/       # Route groups for dashboard
│   ├── (marketing)/       # Route groups for marketing
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── common/           # Shared components
│   ├── features/         # Feature-specific components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── __tests__/            # Test files
```

---

## 📝 Editing Standards

### 1. File Naming Conventions

#### Components
- **PascalCase** for component files: `DashboardCard.tsx`
- **kebab-case** for page files: `dashboard-card.tsx`
- **camelCase** for utility files: `formatDate.ts`

#### Directories
- **kebab-case** for directories: `dashboard-components/`
- **PascalCase** for component directories: `Dashboard/`

### 2. Component Structure

#### Standard Component Template
```typescript
// components/features/dashboard/DashboardCard.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import type { DashboardCardProps } from '@/types/dashboard';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: number;
  className?: string;
}

export function DashboardCard({ 
  title, 
  value, 
  trend, 
  className 
}: DashboardCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-6",
      className
    )}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={cn(
          "mt-2 text-sm",
          trend > 0 ? "text-green-600" : "text-red-600"
        )}>
          {trend > 0 ? "+" : ""}{trend}%
        </p>
      )}
    </div>
  );
}
```

#### Page Component Template
```typescript
// app/dashboard/page.tsx
import React, { Suspense } from 'react';
import { PageLayout } from '@/components/common/Layout/PageLayout';
import { ErrorBoundary } from '@/components/common/Feedback/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/Feedback/LoadingSpinner';
import { DashboardContent } from '@/components/features/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard" showNavbar={false}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner size="lg" text="Loading dashboard..." />}>
          <DashboardContent />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  );
}
```

### 3. TypeScript Standards

#### Type Definitions
```typescript
// types/dashboard.ts
export interface DashboardMetrics {
  totalLeads: number;
  conversionRate: number;
  revenue: number;
  activeConversations: number;
}

export interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: number;
  className?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status: number;
}
```

#### Import/Export Patterns
```typescript
// Always use named exports for components
export { DashboardCard } from './DashboardCard';
export { DashboardMetrics } from './DashboardMetrics';

// Use default exports only for pages
export default function DashboardPage() { ... }

// Use barrel exports for clean imports
// components/features/dashboard/index.ts
export * from './DashboardCard';
export * from './DashboardMetrics';
export * from './DashboardLayout';
```

### 4. Styling Standards

#### Tailwind CSS Usage
```typescript
// ✅ Preferred: Use cn utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow prop override
)}>

// ❌ Avoid: Inline conditional classes
<div className={`base-classes ${condition ? 'conditional' : ''}`}>

// ✅ Use semantic class names
<div className="bg-white rounded-lg shadow-sm p-6">
<div className="text-sm font-medium text-gray-500">

// ❌ Avoid: Arbitrary values unless necessary
<div className="w-[123px] h-[456px]">
```

#### Custom Animations
```typescript
// Use predefined animations from tailwind.config.ts
<div className="animate-fade-in">
<div className="animate-float">
<div className="animate-gradient-x">
```

### 5. Error Handling Standards

#### Error Boundaries
```typescript
// Always wrap major components with ErrorBoundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <ComponentThatMightError />
</ErrorBoundary>
```

#### API Error Handling
```typescript
// Use centralized error handling
import { handleApiError } from '@/lib/api/errorHandling';

try {
  const response = await apiClient.request(endpoint);
  if (!response.success) {
    throw handleApiError(response);
  }
} catch (error) {
  const appError = handleApiError(error);
  // Handle error appropriately
}
```

### 6. Loading States

#### Loading Patterns
```typescript
// Use LoadingSpinner component for consistent loading states
import { LoadingSpinner } from '@/components/common/Feedback/LoadingSpinner';

if (loading) {
  return <LoadingSpinner size="lg" text="Loading data..." />;
}

// Use Suspense for code-split components
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

---

## 🔧 API Integration Standards

### 1. API Client Usage
```typescript
// Always use the centralized API client
import { apiClient } from '@/lib/api/client';

// Database operations
const response = await apiClient.dbSelect({
  table_name: 'users',
  index_name: 'email-index',
  key_name: 'email',
  key_value: userEmail
});

// LCP operations
const threads = await apiClient.getThreads({ status: 'active' });
```

### 2. Custom Hooks for API Operations
```typescript
// Use custom hooks for API state management
import { useApi } from '@/hooks/useApi';
import { useDbOperations } from '@/hooks/useDbOperations';

function DashboardComponent() {
  const { data, loading, error, refetch } = useApi('/api/dashboard/metrics');
  const { select, update, delete: remove } = useDbOperations();
  
  // Component logic
}
```

---

## 🎨 Component Development Standards

### 1. Component Hierarchy
```
Page Component (app/*/page.tsx)
├── Layout Component (PageLayout, DashboardLayout)
├── Error Boundary
├── Suspense Boundary
└── Feature Components
    ├── UI Components (Button, Card, etc.)
    ├── Feature Components (DashboardCard, etc.)
    └── Custom Hooks (useApi, useDbOperations, etc.)
```

### 2. Props Interface Standards
```typescript
// Always define explicit props interfaces
interface ComponentProps {
  // Required props first
  title: string;
  data: DataType[];
  
  // Optional props with defaults
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onAction?: (data: DataType) => void;
  
  // Styling overrides
  className?: string;
  
  // Children
  children?: React.ReactNode;
}
```

### 3. Component Composition
```typescript
// Use composition over inheritance
function DashboardLayout({ children, header, sidebar }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {header}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## 🧪 Testing Standards

### 1. Test File Structure
```typescript
// __tests__/components/features/dashboard/DashboardCard.test.tsx
import { render, screen } from '@testing-library/react';
import { DashboardCard } from '@/components/features/dashboard/DashboardCard';

describe('DashboardCard', () => {
  it('renders with title and value', () => {
    render(<DashboardCard title="Test" value="100" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  
  it('shows trend indicator when provided', () => {
    render(<DashboardCard title="Test" value="100" trend={5} />);
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });
});
```

### 2. Utility Function Testing
```typescript
// __tests__/utils/common.test.ts
import { formatCurrency, formatDate } from '@/lib/utils/formatting';

describe('formatting utils', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
  
  it('formats date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('January 1, 2024');
  });
});
```

---

## 📁 File Organization Standards

### 1. Import Order
```typescript
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

// 3. Internal utilities and types
import { cn } from '@/lib/utils';
import type { DashboardProps } from '@/types/dashboard';

// 4. Components (relative imports last)
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/Feedback/LoadingSpinner';
import { DashboardCard } from './DashboardCard';
```

### 2. Export Patterns
```typescript
// components/features/dashboard/index.ts
export { DashboardCard } from './DashboardCard';
export { DashboardMetrics } from './DashboardMetrics';
export { DashboardLayout } from './DashboardLayout';

// types/index.ts
export * from './api';
export * from './auth';
export * from './common';
export * from './dashboard';
```

---

## 🚀 Performance Standards

### 1. Code Splitting
```typescript
// Use dynamic imports for large components
import dynamic from 'next/dynamic';

const DashboardCharts = dynamic(() => import('./DashboardCharts'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### 2. Memoization
```typescript
// Use React.memo for expensive components
export const DashboardCard = React.memo(function DashboardCard({ 
  title, 
  value, 
  trend 
}: DashboardCardProps) {
  // Component logic
});

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return data.map(item => ({
    ...item,
    processed: expensiveCalculation(item)
  }));
}, [data]);
```

### 3. Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/path/to/image.png"
  alt="Description"
  width={400}
  height={300}
  priority={true} // For above-the-fold images
/>
```

---

## 🔒 Security Standards

### 1. Input Validation
```typescript
// Always validate user inputs
import { validateField } from '@/lib/utils/validation';

const emailError = validateField(email, {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
});
```

### 2. Authentication Checks
```typescript
// Use AuthGuard for protected routes
import { AuthGuard } from '@/components/features/auth/AuthGuard';

<AuthGuard>
  <ProtectedComponent />
</AuthGuard>
```

---

## 📊 State Management Standards

### 1. Context Usage
```typescript
// Use context for global state
import { useAppState } from '@/hooks/useAppState';

function Component() {
  const { user, theme, apiClient } = useAppState();
  // Component logic
}
```

### 2. Local State
```typescript
// Use useState for component-local state
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState<DataType[]>([]);
```

### 3. Form State
```typescript
// Use controlled components for forms
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

---

## 🎯 Common Patterns

### 1. Conditional Rendering
```typescript
// Use logical AND for simple conditions
{isLoading && <LoadingSpinner />}

// Use ternary for complex conditions
{error ? (
  <ErrorMessage error={error} />
) : (
  <SuccessMessage data={data} />
)}

// Use early returns for complex logic
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;

return <DataDisplay data={data} />;
```

### 2. Event Handling
```typescript
// Use proper event types
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Handle click
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};
```

### 3. Async Operations
```typescript
// Use try-catch for async operations
const handleAsyncOperation = async () => {
  try {
    setLoading(true);
    const result = await apiClient.request('/endpoint');
    setData(result.data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## 🔄 Migration Guidelines

### 1. When Adding New Features
1. **Create types first** in `types/` directory
2. **Add API endpoints** in `app/api/` directory
3. **Create components** in appropriate `components/` subdirectory
4. **Add tests** in `__tests__/` directory
5. **Update documentation** if needed

### 2. When Refactoring Existing Code
1. **Maintain backward compatibility** during transition
2. **Use feature flags** for gradual rollout
3. **Update all related tests**
4. **Ensure type safety** throughout the process

### 3. When Fixing Bugs
1. **Reproduce the issue** with a test case
2. **Fix the root cause** not just symptoms
3. **Add regression tests**
4. **Update documentation** if API changes

---

## 📋 Checklist for AI Agents

Before submitting any code changes, ensure:

### ✅ Code Quality
- [ ] TypeScript strict mode compliance
- [ ] Proper error handling with ErrorBoundary
- [ ] Loading states implemented
- [ ] Accessibility features (ARIA labels, keyboard navigation)
- [ ] Responsive design considerations

### ✅ Architecture Compliance
- [ ] Follows established component hierarchy
- [ ] Uses centralized API client
- [ ] Implements proper state management
- [ ] Follows file naming conventions
- [ ] Uses appropriate import/export patterns

### ✅ Performance
- [ ] Code splitting for large components
- [ ] Memoization where appropriate
- [ ] Optimized images and assets
- [ ] Efficient re-renders

### ✅ Testing
- [ ] Unit tests for utility functions
- [ ] Component tests for new components
- [ ] Integration tests for API interactions
- [ ] Error scenarios covered

### ✅ Documentation
- [ ] JSDoc comments for complex functions
- [ ] README updates if needed
- [ ] Type definitions complete
- [ ] Examples provided for new components

---

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Do This
```typescript
// Don't use any types
const data: any = response.data;

// Don't ignore errors
try {
  await apiCall();
} catch (error) {
  // Empty catch block
}

// Don't use inline styles
<div style={{ color: 'red', fontSize: '16px' }}>

// Don't forget loading states
const [data, setData] = useState(null);
// Missing loading state

// Don't use non-semantic HTML
<div onClick={handleClick}>Click me</div>
```

### ✅ Do This Instead
```typescript
// Use proper types
const data: ApiResponse<DataType> = response.data;

// Handle errors properly
try {
  await apiCall();
} catch (error) {
  setError(error.message);
}

// Use Tailwind classes
<div className="text-red-500 text-base">

// Include loading states
const [data, setData] = useState<DataType | null>(null);
const [loading, setLoading] = useState(false);

// Use semantic HTML
<button onClick={handleClick} className="btn">Click me</button>
```

---

# Dashboard Data Flow Pattern

## Overview

This document outlines the standardized data flow pattern implemented across the ACS Next.js dashboard to ensure consistency and maintainability.

## Data Flow Architecture

```
Data Source → Process Data → Conversation (containing Thread and Message) ← Used by Components
```

### 1. Data Sources
- **API Endpoints**: `/api/lcp/get_all_threads`, `/api/usage/stats`
- **Database Operations**: Direct database queries for user-specific data
- **External Services**: Third-party integrations

### 2. Centralized Processing
All raw data is processed through the `processThreadsResponse` function in `lib/utils/api.ts`, which ensures:
- Consistent `Conversation` object structure
- Proper date handling and timezone conversion
- Type safety and validation
- Error handling and fallbacks

### 3. Conversation Structure
The canonical data structure that all components use:

```typescript
interface Conversation {
  thread: Thread;      // Thread metadata and status
  messages: Message[];  // Array of messages in the conversation
}
```

## Implementation Details

### Centralized Processing Function

```typescript
// lib/utils/api.ts
export function processThreadsResponse(responseData: any[]): Conversation[] {
  // Ensures all data follows the Conversation structure
  // Handles date parsing, type validation, and error cases
  // Returns properly typed Conversation objects
}
```

### Data Flow in Components

#### 1. Dashboard Page
```typescript
// app/dashboard/page.tsx
function DashboardContent() {
  const { data, loading, error } = useDashboardData(); // Uses centralized processing
  return <DashboardLayout data={data} />; // Passes processed Conversation objects
}
```

#### 2. Dashboard Layout
```typescript
// components/features/dashboard/DashboardLayout.tsx
export function DashboardLayout({ data }: { data: DashboardData }) {
  return (
    <div>
      <DashboardMetrics data={data.metrics} />
      <RecentConversations conversations={data.conversations} /> {/* Processed Conversation[] */}
      <DashboardCharts data={data.analytics} />
    </div>
  );
}
```

#### 3. Individual Components
```typescript
// components/features/dashboard/RecentConversations.tsx
export function RecentConversations({ conversations }: { conversations: Conversation[] }) {
  // All conversations are guaranteed to be properly processed
  return conversations.map(conversation => (
    <ConversationCard key={conversation.thread.conversation_id} conversation={conversation} />
  ));
}
```

## Benefits of This Pattern

### 1. Consistency
- All components receive data in the same format
- No need for individual data processing in components
- Consistent error handling and validation

### 2. Maintainability
- Single source of truth for data processing logic
- Easy to update data transformation rules
- Centralized type definitions

### 3. Performance
- Data is processed once at the source
- Components receive ready-to-use data
- Reduced redundant processing

### 4. Type Safety
- Strong TypeScript typing throughout the flow
- Compile-time validation of data structure
- IntelliSense support for all data properties

## Migration Guide

### Before (Inconsistent Processing)
```typescript
// ❌ Each component processed data differently
function OldComponent() {
  const { data } = useApi('/api/threads');
  const processedData = data.map(item => ({
    // Manual processing logic
    id: item.thread?.conversation_id || item.id,
    messages: item.messages?.map(msg => ({
      // Inconsistent message processing
      timestamp: new Date(msg.timestamp),
      // ... more manual processing
    }))
  }));
}
```

### After (Centralized Processing)
```typescript
// ✅ All components use processed Conversation objects
function NewComponent() {
  const { data } = useDashboardData(); // Already processed
  return data.conversations.map(conversation => (
    <ConversationCard 
      key={conversation.thread.conversation_id}
      conversation={conversation} // Guaranteed to be properly processed
    />
  ));
}
```

## Best Practices

### 1. Always Use Processed Data
```typescript
// ✅ Good: Use processed Conversation objects
const conversations = processThreadsResponse(rawData);
conversations.forEach(conv => {
  // conv.thread and conv.messages are guaranteed to be properly formatted
  console.log(conv.thread.conversation_id);
  console.log(conv.messages[0]?.localDate); // Always a valid Date object
});

// ❌ Bad: Process data in components
const rawData = await fetch('/api/threads');
rawData.forEach(item => {
  // Manual processing leads to inconsistencies
  const date = new Date(item.timestamp); // May fail
});
```

### 2. Leverage Type Safety
```typescript
// ✅ Good: Use proper types
function Component({ conversations }: { conversations: Conversation[] }) {
  return conversations.map(conv => (
    <div key={conversation.thread.conversation_id}>
      {conversation.thread.lead_name}
    </div>
  ));
}

// ❌ Bad: Use any types
function Component({ data }: { data: any[] }) {
  return data.map(item => (
    <div key={item.id}>
      {item.name} // May not exist
    </div>
  ));
}
```

### 3. Handle Edge Cases Centrally
```typescript
// ✅ Good: Handle edge cases in processing function
export function processThreadsResponse(data: any[]): Conversation[] {
  if (!Array.isArray(data)) return [];
  
  return data
    .filter(item => item && typeof item === 'object')
    .map(item => {
      // Centralized error handling and validation
      if (!item.thread) return null;
      // ... processing logic
    })
    .filter((conv): conv is Conversation => conv !== null);
}
```

## File Structure

```
lib/
├── utils/
│   └── api.ts                    # Centralized processing functions
├── api/
│   └── client.ts                 # API client with centralized methods
hooks/
├── useDashboardData.ts           # Main dashboard data hook
├── useConversations.ts           # Conversations context hook
types/
├── conversation.ts               # Canonical Conversation types
├── dashboard.ts                  # Dashboard-specific types
components/
├── features/
│   └── dashboard/                # Components using processed data
```

## Testing

### Unit Tests for Processing
```typescript
// __tests__/lib/utils/api.test.ts
describe('processThreadsResponse', () => {
  it('should process raw data into Conversation objects', () => {
    const rawData = [/* test data */];
    const result = processThreadsResponse(rawData);
    
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty('thread');
    expect(result[0]).toHaveProperty('messages');
    expect(result[0].thread).toHaveProperty('conversation_id');
  });
});
```

### Integration Tests for Components
```typescript
// __tests__/components/features/dashboard/RecentConversations.test.tsx
describe('RecentConversations', () => {
  it('should render conversations using processed data', () => {
    const conversations = [/* processed Conversation objects */];
    render(<RecentConversations conversations={conversations} />);
    
    expect(screen.getByText(conversations[0].thread.lead_name)).toBeInTheDocument();
  });
});
```

## Conclusion

This centralized data flow pattern ensures that all dashboard components work with consistently processed data, reducing bugs, improving maintainability, and providing a better developer experience. All new components should follow this pattern and use the processed `Conversation` objects rather than implementing their own data processing logic.


This guide ensures that all AI agents working on the ACS Next.js application follow consistent standards, maintain code quality, and contribute to the overall architecture goals outlined in the refactoring plan. Always prioritize maintainability, type safety, and user experience when making changes.
