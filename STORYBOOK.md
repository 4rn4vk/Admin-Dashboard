# Storybook Documentation

This project uses [Storybook](https://storybook.js.org/) for component development and documentation.

## 🚀 Getting Started

### Running Storybook

Start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006)

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

The static build will be created in the `storybook-static` directory.

## 📚 Component Stories

All component stories are located in the `src/components/` directory with the `.stories.tsx` extension.

### Available Components

#### 1. **Modal** (`Modal.stories.tsx`)

Interactive dialog component with accessibility features.

**Stories:**

- Basic - Simple modal with text content
- WithForm - Modal containing a form
- WithLongContent - Modal with scrollable content
- Confirmation - Confirmation dialog example

**Props:**

- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Callback when modal closes
- `title`: string - Modal title
- `children`: ReactNode - Modal content

**Features:**

- Keyboard navigation (ESC to close)
- Focus management
- Backdrop click to close
- ARIA roles and labels

---

#### 2. **AssessmentForm** (`AssessmentForm.stories.tsx`)

Form component for creating and editing assessments.

**Stories:**

- CreateMode - New assessment form
- EditMode - Edit existing assessment
- Submitting - Form in loading state
- WithValidationErrors - Validation demonstration
- StatusOptions - Different status values
- PriorityOptions - Different priority levels

**Props:**

- `assessment?`: Assessment | null - Optional assessment for edit mode
- `onSubmit`: (data: AssessmentFormData) => void - Form submission callback
- `onCancel`: () => void - Cancel callback
- `isSubmitting?`: boolean - Loading state

**Features:**

- Client-side validation
- Required field indicators
- Status selection: scheduled, in-progress, blocked, complete
- Priority levels: low, medium, high, critical
- Error messages

---

#### 3. **Layout** (`Layout.stories.tsx`)

Main application shell with responsive navigation.

**Stories:**

- Default - Standard navigation layout
- CustomHeader - Custom header text
- ExtendedNavigation - More navigation items
- MinimalNavigation - Simplified navigation
- MobileView - Mobile responsive demo

**Props:**

- `navLinks`: NavItem[] - Array of navigation links
- `headerTitle?`: string - Header title (default: "Vite + React + TS")
- `headerSubtitle?`: string - Header subtitle (default: "Admin Dashboard Starter")

**Features:**

- Responsive sidebar (collapsible on mobile)
- Active link highlighting
- Configurable navigation
- React Router integration

---

#### 4. **ToastContainer** (`ToastContainer.stories.tsx`)

Notification toast system with auto-dismiss.

**Stories:**

- Interactive - Full demo with all toast types
- SuccessToast - Success notification example
- ErrorToast - Error notification example
- InfoToast - Info notification example
- WarningToast - Warning notification example
- MultipleToasts - Stacked notifications
- LongMessage - Long text handling

**Usage:**

```tsx
import { useToast } from '../contexts/ToastContext';

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Operation completed!');
    toast.error('Something went wrong');
    toast.info('Here is some info');
    toast.warning('Please be careful');
  };
}
```

**Features:**

- Auto-dismiss after timeout
- Manual dismiss option
- Four types: success, error, info, warning
- Accessible with ARIA live regions
- Stacking support

---

## 🎨 Customization

### Adding a New Story

1. Create a new `.stories.tsx` file in the component's directory:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your default props
  }
};
```

2. The story will automatically appear in Storybook

### Story Organization

Stories are organized by category in the Storybook sidebar:

- **Components/** - Reusable UI components
- Future categories can include Pages, Forms, etc.

## 📖 Documentation

Each component story includes:

- **Description** - Component purpose and use cases
- **Props Table** - Auto-generated from TypeScript types
- **Usage Examples** - Multiple story variations
- **Interactive Controls** - Live prop editing in Storybook

## 🧪 Best Practices

1. **One component per story file** - Keep stories focused
2. **Multiple variations** - Show different states and use cases
3. **Props documentation** - Use JSDoc comments for prop descriptions
4. **Accessibility** - Demonstrate accessible usage patterns
5. **Real-world examples** - Show practical implementations

## 🔧 Configuration

Storybook configuration files are located in `.storybook/`:

- `main.ts` - Storybook main configuration
- `preview.ts` - Global decorators and parameters

## 🎯 Tips

- Use **Controls** addon to interactively modify props
- Use **Docs** tab for auto-generated documentation
- Use **Actions** addon to log event callbacks
- Press `A` to toggle the addons panel
- Press `D` to toggle dark mode
- Press `F` to toggle fullscreen
- Press `/` to search stories

## 📦 Deployment

Deploy your Storybook to static hosting:

1. Build: `npm run build-storybook`
2. Deploy the `storybook-static` folder to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static host

## 🔗 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/api/csf)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [TypeScript Support](https://storybook.js.org/docs/configure/typescript)
