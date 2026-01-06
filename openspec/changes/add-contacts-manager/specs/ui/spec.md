# UI Specification

## ADDED Requirements

### Requirement: Contacts List Display
The system SHALL display all contacts in a list view showing name, phone, email, and action buttons.

#### Scenario: View contacts list
- **WHEN** user opens the application
- **THEN** all contacts SHALL be displayed in a list
- **AND** newest contacts SHALL appear first

#### Scenario: Empty state
- **WHEN** no contacts exist
- **THEN** a message "No contacts yet" SHALL be displayed

### Requirement: Search Functionality
The system SHALL provide a search bar that filters contacts in real-time via API calls.

#### Scenario: Real-time search
- **WHEN** user types in search bar
- **THEN** API request SHALL be made to GET /api/contacts?q=term after 300ms debounce
- **AND** matching contacts by name, phone, or email SHALL be shown in the list

#### Scenario: Clear search
- **WHEN** user clears search bar
- **THEN** API request SHALL be made to GET /api/contacts (without query)
- **AND** all contacts SHALL be displayed

#### Scenario: No search results
- **WHEN** search query returns no matching contacts
- **THEN** message "No contacts found" SHALL be displayed

### Requirement: Create Contact
The system SHALL allow creating contacts via a modal form.

#### Scenario: Open create modal
- **WHEN** user clicks "Add Contact" button
- **THEN** a modal with empty form SHALL appear
- **AND** form SHALL display fields: name (required), phone (required), email (optional)

#### Scenario: Submit valid contact
- **WHEN** user fills name and phone and submits
- **THEN** API request SHALL be made to POST /api/contacts
- **AND** after successful response, contact SHALL be created
- **AND** modal SHALL close
- **AND** contacts list SHALL be refreshed from API to show new contact

#### Scenario: Validation feedback
- **WHEN** user submits with empty required fields
- **THEN** error message SHALL be shown
- **AND** modal SHALL stay open

#### Scenario: Server validation error
- **WHEN** form submitted and server returns 400 validation error
- **THEN** server error message SHALL be displayed in modal
- **AND** modal SHALL stay open

### Requirement: Edit Contact
The system SHALL allow editing contacts via a modal form.

#### Scenario: Open edit modal
- **WHEN** user clicks Edit button on a contact
- **THEN** a modal with pre-filled form SHALL appear

#### Scenario: Save changes
- **WHEN** user modifies fields and submits
- **THEN** API request SHALL be made to PUT /api/contacts/:id
- **AND** after successful response, contact SHALL be updated
- **AND** modal SHALL close
- **AND** contacts list SHALL be refreshed from API to reflect changes

### Requirement: Delete Contact
The system SHALL allow deleting contacts with confirmation.

#### Scenario: Delete with confirmation
- **WHEN** user clicks Delete button on a contact
- **THEN** a confirmation dialog SHALL appear

#### Scenario: Confirm deletion
- **WHEN** user confirms deletion
- **THEN** API request SHALL be made to DELETE /api/contacts/:id
- **AND** after successful response, contact SHALL be removed from list

#### Scenario: Cancel deletion
- **WHEN** user cancels deletion
- **THEN** contact SHALL remain in list

### Requirement: Form Validation
The system SHALL validate required fields before submission.

#### Scenario: Client-side validation
- **WHEN** user submits form with empty name or phone
- **THEN** error messages SHALL be displayed inline
- **AND** form SHALL not submit

### Requirement: Loading States
The system SHALL show loading indicators during API operations.

#### Scenario: Loading contacts
- **WHEN** contacts are being fetched
- **THEN** a loading indicator SHALL be shown

#### Scenario: Saving contact
- **WHEN** contact is being saved
- **THEN** submit button SHALL be disabled

### Requirement: Error Handling
The system SHALL handle API errors gracefully.

#### Scenario: Network error
- **WHEN** API request fails due to network error
- **THEN** error message SHALL be displayed to user

#### Scenario: Server error
- **WHEN** API returns 500 error
- **THEN** generic error message SHALL be displayed

#### Scenario: Contact not found on edit
- **WHEN** PUT request fails with 404 (contact not found)
- **THEN** error message SHALL be displayed
- **AND** modal SHALL close

### Requirement: Modern Visual Design
The system SHALL provide a modern, clean, and visually appealing user interface.

#### Scenario: Color Scheme
- **WHEN** user views the application
- **THEN** the interface SHALL use a modern color palette with:
  - Primary action color: Blue (#3B82F6 or similar)
  - Neutral backgrounds: Light gray (#F9FAFB) for page, white (#FFFFFF) for cards
  - Text hierarchy: Dark gray (#111827) for headings, medium gray (#6B7280) for secondary text
  - Error states: Red (#EF4444) for errors and destructive actions
  - Success states: Green (#10B981) for success messages

#### Scenario: Typography
- **WHEN** user views content
- **THEN** text SHALL use:
  - Clear font hierarchy with appropriate sizes (24-32px for headings, 16px for body)
  - Sufficient line height for readability (1.5-1.75)
  - Proper font weights (bold for headings, regular for body)

#### Scenario: Spacing and Layout
- **WHEN** user views the interface
- **THEN** elements SHALL have:
  - Consistent spacing using 4px or 8px grid system
  - Maximum content width of 1024px centered on large screens
  - Adequate padding (16-24px) around content areas
  - Proper margins between sections (32-48px)

#### Scenario: Interactive Elements
- **WHEN** user hovers over buttons or interactive elements
- **THEN** elements SHALL show:
  - Smooth color transitions (200-300ms)
  - Subtle scale or shadow changes on hover
  - Clear visual feedback for clickable elements

#### Scenario: Card Design
- **WHEN** user views contact list items
- **THEN** each contact SHALL be displayed in a card with:
  - White background with subtle shadow (shadow-sm or shadow-md)
  - Rounded corners (8-12px border radius)
  - Hover effect (slight shadow increase or background color change)
  - Clear separation between items

#### Scenario: Modal Design
- **WHEN** user opens a modal
- **THEN** the modal SHALL have:
  - Backdrop overlay with blur effect (backdrop-blur-sm)
  - Centered positioning with smooth fade-in animation
  - Rounded corners (12-16px)
  - Maximum width of 512px on desktop
  - Proper z-index to appear above all content

#### Scenario: Form Inputs
- **WHEN** user interacts with form fields
- **THEN** inputs SHALL have:
  - Clear borders with rounded corners (6-8px)
  - Focus states with ring/outline (2px blue ring)
  - Error states with red border and error message styling
  - Proper label positioning and spacing

#### Scenario: Responsive Design
- **WHEN** user views on mobile device (< 768px)
- **THEN** the interface SHALL:
  - Stack elements vertically
  - Use full width with padding (16px margins)
  - Adjust font sizes appropriately
  - Ensure buttons are easily tappable (min 44px height)

#### Scenario: Loading States
- **WHEN** data is loading
- **THEN** loading indicators SHALL:
  - Use smooth spinning animation
  - Be centered and clearly visible
  - Match the primary color scheme
  - Include descriptive text ("Loading contacts...")

#### Scenario: Empty States
- **WHEN** no data is available
- **THEN** empty states SHALL:
  - Use muted gray text color
  - Be centered with adequate spacing
  - Include helpful messaging
  - Optionally include icons or illustrations

