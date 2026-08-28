# Retail Fashion Mobile App â€” Complete Audit Prompt Pack

## Project Context

Use these prompts for auditing an Android/iOS React Native fashion retail application with this architecture:

```text
Android / iOS React Native App
            â†“
     Node.js + Fastify
       API Gateway
            â†“
 WordPress / WooCommerce
            â†“
Products â€¢ Campaigns â€¢ Stock â€¢ Customers â€¢ Orders
```

The goal is to make the system **secure, modular, reusable, maintainable, modern, scalable, and production-ready** without unnecessary complexity or feature bloat.

---

# 1. Master Audit Prompt

```text
Audit the entire Android/iOS React Native fashion retail app and Node.js + Fastify API gateway.

Architecture:

React Native App â†’ Fastify Gateway â†’ WordPress/WooCommerce

Inspect the actual codebase, APIs, configuration, and data flow before making conclusions.

Audit:

- Architecture and code quality
- React Native UI/UX
- Navigation and user flows
- Signup/signin/authentication
- Token/session security
- Fastify routes and API design
- Validation and error handling
- WordPress/WooCommerce integration
- Products, categories, variants and images
- Stock/inventory
- Campaigns, discounts and pricing
- Cart and checkout
- Customer data
- Orders and order status
- API performance, caching, timeouts and retries
- React Native performance and memory
- Loading, empty, offline and error states
- Accessibility
- Push notifications
- Deep links
- Logging, monitoring and crash reporting
- Unit, integration and E2E testing
- Android/iOS build configuration
- Environment variables and exposed secrets
- Scalability and reliability

For every finding provide:

Evidence â†’ Risk â†’ Impact â†’ Recommendation â†’ Implementation approach â†’ Validation method

Clearly distinguish:

FACT = verified from the code/configuration
ASSUMPTION = not verified
RECOMMENDATION = proposed improvement

Create:

| Area | Finding | Severity | Evidence | Recommendation | Effort | Priority |
|---|---|---|---|---|---|---|

Severity:
P0 = Critical
P1 = High
P2 = Medium
P3 = Low

Also provide:

1. Critical security issues
2. Critical business-logic issues
3. Performance bottlenecks
4. Architecture problems
5. UX problems
6. Missing functionality
7. Unnecessary functionality
8. Testing gaps
9. Production-readiness score /10
10. Top 20 fixes
11. Implementation roadmap

Do not invent issues or capabilities.
Do not rewrite working code unnecessarily.
Do not modify production configuration without approval.
Never expose real passwords, tokens, API keys, customer data, or secrets.
```

---

# 2. UI/UX Modern Design Audit

```text
Audit the entire Android/iOS React Native fashion retail app specifically for modern UI/UX design.

Inspect the actual existing screens and components before recommending changes.

Goal:

Make the app feel like a modern, premium fashion e-commerce application while keeping it simple, fast, intuitive, accessible, and consistent.

Audit:

- Visual hierarchy
- Typography
- Colors
- Spacing
- Buttons
- Icons
- Cards
- Product grids/lists
- Images
- Navigation
- Search
- Filters
- Product details
- Cart
- Checkout
- Profile
- Orders
- Campaigns
- Forms
- Modals
- Bottom sheets
- Loading states
- Empty states
- Error states
- Success states
- Animations and micro-interactions

Identify anything that is:

- Outdated
- Generic
- Inconsistent
- Crowded
- Confusing
- Unnecessary
- Poorly aligned
- Not appropriate for a premium fashion brand

Audit these journeys:

Home â†’ Browse â†’ Search â†’ Product â†’ Variant â†’ Cart â†’ Checkout â†’ Order

Also audit:

Profile â†’ Orders â†’ Order Details

Check Android and iOS behavior on different screen sizes.

Audit accessibility:

- Contrast
- Font readability
- Touch targets
- Screen readers
- Dynamic text
- Accessible labels
- Error states

Audit the design system:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Icons
- Buttons
- Inputs
- Cards
- Badges
- Modals
- Bottom sheets
- Navigation

Create:

| Screen | Current Issue | Recommended Design | UX Impact | Priority |
|---|---|---|---|---|

Also provide:

1. Current design assessment
2. Recommended modern design direction
3. Navigation recommendation
4. Design system recommendation
5. UX improvements
6. Visual improvements
7. UI elements to remove
8. Missing UI/UX elements
9. Top 20 improvements

Prioritize:

Usability â†’ Product discovery â†’ Conversion â†’ Brand experience â†’ Consistency â†’ Visual polish

Do not redesign everything unnecessarily.
Preserve good existing components.
Use:

Audit â†’ Prioritize â†’ Redesign â†’ Implement â†’ Test
```

---

# 3. Feature Gap & Feature-Bloat Audit

```text
Audit the entire React Native app and Fastify gateway to determine whether the product has the right features.

Do not only review code quality.
Review actual product functionality.

For every existing feature determine:

- What problem does it solve?
- Is it actually needed for a fashion retail customer?
- Is it being used?
- Is it duplicated?
- Is it unnecessarily complicated?
- Does it belong in the mobile app or backend?
- Does it create unnecessary maintenance or API cost?
- Should it be kept, simplified, changed, or removed?

Also identify important missing features.

Review:

- Home
- Categories
- Search
- Filters
- Product listing
- Product details
- Variants
- Stock
- Campaigns
- Discounts
- Coupons
- Cart
- Checkout
- Orders
- Order history
- Customer profile
- Addresses
- Wishlist
- Notifications
- Deep links
- Reviews/ratings
- Recommendations
- Analytics
- Customer support
- Offline behavior
- Error handling
- Settings

Classify every feature:

KEEP = Necessary and useful
IMPROVE = Useful but incomplete
SIMPLIFY = Useful but unnecessarily complex
REMOVE = Low/no value
DUPLICATE = Already available elsewhere
MOVE = Belongs in another layer
MISSING = Should be implemented
FUTURE = Useful later

Create:

| Feature | Exists? | Needed? | User Value | Business Value | Complexity | Recommendation | Priority |
|---|---|---|---|---|---|---|---|

For every proposed new feature:

User problem â†’ Business benefit â†’ Expected value â†’ Complexity â†’ Priority

Prioritize:

Sales + Customer Experience + Retention + Operational Efficiency

Do not recommend features merely because competitors have them.
```

---

# 4. Signup / Signin Audit

```text
Audit the complete Signup and Signin system.

Architecture:

React Native â†’ Fastify Gateway â†’ WordPress/WooCommerce

Inspect the actual code and API flow.

Audit:

- Signup
- Signin
- Logout
- Token generation
- Token expiration
- Refresh tokens
- Token rotation
- Password handling
- Password reset
- Email/phone verification
- Duplicate accounts
- Invalid credentials
- Account-not-found behavior
- Disabled/locked accounts
- Rate limiting
- Brute-force protection
- Input validation
- Error handling
- Loading states
- Offline/network failure
- Session persistence
- Secure token storage
- Token cleanup on logout
- Multiple-device sessions
- Unauthorized API requests
- Authorization
- WordPress/WooCommerce authentication
- Customer synchronization
- Customer ID mapping
- Race conditions
- Retry behavior
- Sensitive data exposure
- Sensitive data in logs
- HTTPS
- Exposed secrets
- Account deletion if supported

Trace:

Signup:
User â†’ App â†’ Fastify â†’ WordPress/WooCommerce â†’ Customer Created â†’ Session

Signin:
User â†’ App â†’ Fastify â†’ Authentication â†’ Token/Session â†’ Secure Storage â†’ API

Create:

| Area | Current Implementation | Issue | Risk | Recommendation | Priority |
|---|---|---|---|---|---|

Answer:

1. Is the architecture secure?
2. Are credentials/secrets exposed in the app?
3. Is token storage secure?
4. Can authentication or authorization be bypassed?
5. Can duplicate accounts be created?
6. Are expired tokens handled correctly?
7. Does logout properly clear/invalidate sessions?
8. Is brute-force abuse protected?
9. Is WordPress/WooCommerce integration correct?
10. What should be added, removed, or simplified?

Provide:

- Critical security issues
- Missing features
- Unnecessary/over-engineered features
- Recommended signup flow
- Recommended signin flow
- Top 10 fixes
- Production readiness score /10

Never reproduce real credentials, tokens, or secrets.
```

---

# 5. UI Rendering, Information, Icons & Pages Audit

```text
Audit the entire Android/iOS React Native app specifically for UI rendering, displayed information, icons, images, and pages.

Inspect actual code and compare UI rendering with available API data.

Audit every screen.

## Pages

Check:

- Splash
- Login
- Signup
- Home
- Categories
- Product listing
- Product details
- Search
- Search results
- Campaigns
- Cart
- Checkout
- Order confirmation
- Order history
- Order details
- Customer profile
- Address
- Settings
- Notifications
- Wishlist if implemented

For every page check:

- Is it needed?
- Does it render correctly?
- Is the correct data shown?
- Is any page missing?
- Is any page duplicated?
- Is any page unused?
- Does navigation work?
- Does back navigation work?
- Do deep links work?
- Are loading/empty/error/offline states implemented?

## Information Rendering

Trace:

API Data â†’ Fastify Response â†’ React Native State â†’ UI

Find information that is:

- Missing
- Incorrect
- Duplicated
- Hardcoded
- Outdated
- Misformatted
- Shown in the wrong place

For products check:

- Name
- Images
- Price
- Sale price
- Discount
- SKU
- Description
- Category
- Size
- Color
- Variants
- Stock
- Campaign
- Availability

## Icons

Check:

- Correct icon
- Consistent style
- Size
- Alignment
- Spacing
- Active/inactive states
- Disabled state
- Accessibility
- Navigation/action behavior

## Images

Check:

- Correct URLs
- Loading
- Caching
- Aspect ratio
- Resolution
- Cropping
- Placeholder
- Broken image handling
- Performance

## UI States

Every important screen should handle:

Loading â†’ Success â†’ Empty â†’ Error â†’ Offline â†’ Refreshing â†’ Partial/Expired data

## Navigation

Every visible button, icon, card, banner, product, and CTA should either perform the correct action or intentionally be non-interactive.

Find:

- Dead buttons
- Wrong routes
- Wrong IDs
- Broken back navigation
- Incorrect parameters

## Responsive Rendering

Test:

- Small phones
- Normal phones
- Large phones
- Tablets if supported

Check:

- Text overflow
- Image overflow
- Button sizing
- Icon alignment
- Product grids
- Forms
- Modals
- Long names
- Large prices
- Different image ratios
- Different text lengths

Create:

| Screen/Page | Element | Current Behavior | Expected Behavior | Issue | Severity | Recommendation |
|---|---|---|---|---|---|---|

Also provide:

1. Missing pages
2. Unnecessary pages
3. Missing information
4. Incorrect information
5. Missing/incorrect icons
6. Rendering problems
7. API/UI mismatches
8. Navigation problems
9. Top 20 fixes

Do not invent API fields or pages.
```

---

# 6. Customer Profile / My Account Audit

```text
Audit the complete Customer Profile / My Account feature.

Architecture:

React Native â†’ Fastify Gateway â†’ WordPress/WooCommerce

Trace:

Profile â†’ API â†’ Customer Data â†’ Update â†’ API â†’ WordPress/WooCommerce â†’ Updated Profile

Audit customer information:

- Name
- Email
- Phone
- Profile picture if supported
- Address
- Default address
- Saved addresses
- Other profile fields only if actually required

For every field check:

- Backend availability
- UI rendering
- Editability
- Validation
- Update behavior
- Refresh behavior
- WordPress/WooCommerce synchronization

Audit:

- View profile
- Edit profile
- Change password
- Forgot password
- Logout
- Delete account
- Verification
- Session management
- Notification preferences
- Marketing preferences
- Privacy settings
- App settings

Only recommend features that provide real value.

## Address Management

Audit:

- Add
- Edit
- Delete
- Set default
- Multiple addresses
- Name
- Phone
- Address
- City
- Area
- Postal code
- Country
- Delivery instructions if needed

Verify checkout uses the selected/default address correctly.

## Orders

Check:

- Order history
- Order details
- Status
- Recent orders
- Returns/cancellations if supported
- Customer support

## Security

Check:

- Own-data-only access
- IDOR/BOLA
- Authorization
- Token/session security
- Sensitive data exposure
- Password handling
- Secure storage
- Input validation
- Rate limiting
- Sensitive data in logs

## UI/UX

Check:

- Layout
- Navigation
- Icons
- Labels
- Edit controls
- Forms
- Validation messages
- Loading
- Empty
- Error
- Success feedback
- Offline behavior
- Android/iOS consistency
- Accessibility

Create:

| Feature/Field | Exists | Backend Support | UI Support | Works? | Issue | Recommendation | Priority |
|---|---|---|---|---|---|---|---|

Classify:

KEEP / IMPROVE / SIMPLIFY / REMOVE / MISSING / SECURITY

Finally provide:

1. Current profile features
2. Missing features
3. Unnecessary features
4. Broken features
5. Security issues
6. UX/UI issues
7. API/data issues
8. Recommended profile structure
9. Top 10 fixes
10. Readiness score /10

Never expose real customer data or credentials.
```

---

# 7. Admin + BI Audit

```text
Audit the current system and identify the Admin Panel and Business Intelligence (BI) features needed for a fashion retail business.

Architecture:

React Native â†’ Fastify Gateway â†’ WordPress/WooCommerce â†’ Admin/BI

Inspect existing code and APIs first.

## Admin

Audit management of:

Products:
- Products
- Categories
- Variants
- Sizes
- Colors
- Prices
- Sale prices
- Images
- Product status
- Featured products

Inventory:
- Stock
- Variant stock
- Low-stock alerts
- Out-of-stock products
- Stock adjustments
- Inventory history
- Stock movement
- Inventory valuation if data supports it

Campaigns:
- Create/edit campaigns
- Scheduling
- Start/end dates
- Discounts
- Coupons
- Targeting
- Campaign status
- Campaign performance

Orders:
- Order list
- Order details
- Status
- Cancellation
- Refund/return status if supported
- Payment status
- Customer information
- Order timeline

Customers:
- Customer list
- Profile
- Order history
- Segmentation
- Activity
- Customer value
- Account status

Content:
- Home banners
- Campaign banners
- Featured collections
- Promotional content
- App announcements

Notifications:
- Push notifications
- Campaign notifications
- Order notifications
- Targeted notifications
- Notification history

Admin:
- Users
- Roles
- Permissions
- Activity logs
- Audit logs

## Admin Dashboard

Check:

- Today's sales
- Orders
- Revenue
- Average order value
- Customers
- New customers
- Conversion rate
- Best-selling products
- Low-stock products
- Active campaigns
- Returns/cancellations
- Sales trends

Filters:

Today / Yesterday / 7 days / 30 days / This month / Previous month / Custom

## BI

Determine whether the system can answer:

Sales:
- What sold?
- How much revenue?
- Which products/categories perform best?
- Which campaigns generate revenue?
- AOV?
- Order frequency?

Products:
- Best sellers
- Slow movers
- Declining products
- High-view/low-sales products
- High-cart/low-purchase products
- Size/color performance
- Category performance

Inventory:
- Current stock
- Stock turnover
- Days of inventory
- Dead stock
- Fast movers
- Stockout opportunities

Customers:
- New vs returning
- Retention
- Repeat purchase rate
- Lifetime value
- AOV
- Purchase frequency
- Segments

Campaigns:
- Revenue
- Orders
- Conversion
- Discount cost
- Best/worst campaigns
- ROI where cost data exists

Funnel:

App Open â†’ Home â†’ Product View â†’ Add to Cart â†’ Checkout â†’ Purchase

Identify drop-offs.

## Analytics Events

Check whether the system tracks:

- App opened
- Product viewed
- Search
- Category viewed
- Campaign viewed
- Add to cart
- Remove from cart
- Checkout started
- Checkout abandoned
- Order completed
- Order cancelled
- Wishlist
- Notification opened

Do not collect unnecessary personal data.

## Roles

Evaluate:

Super Admin / Manager / Marketing / Inventory / Customer Support / Analyst

Ensure permissions are enforced by the backend, not just by hiding frontend buttons.

## Classification

KEEP / IMPROVE / SIMPLIFY / REMOVE / DUPLICATE / MISSING / FUTURE

Create:

| Feature | Exists | Needed | Business Value | Complexity | Recommendation | Priority |
|---|---|---|---|---|---|---|

Also provide:

1. Existing admin features
2. Missing admin features
3. Unnecessary admin features
4. Existing BI
5. Missing BI
6. Data that must be collected
7. Recommended admin dashboard
8. Recommended BI dashboard
9. Recommended roles
10. Top 20 features

Prioritize:

Revenue â†’ Customer Experience â†’ Inventory â†’ Operations â†’ Marketing â†’ Reporting

The system should answer:

What happened? â†’ Why did it happen? â†’ What should we do next?
```

---

# 8. Codebase Modularity, Reusability, Readability & Multi-Agent Context Audit

```text
Audit the entire React Native and Node.js/Fastify codebase for:

- Modularity
- Reusability
- Readability
- Maintainability
- Separation of concerns
- Scalability
- Developer experience
- Multi-agent context engineering

Inspect actual code before recommending changes.

## Modularity

Find:

- Large files
- God components
- God services
- Large routes
- Large hooks
- Utility dumping grounds
- Circular dependencies
- Tight coupling
- UI containing business logic
- API logic inside screens
- Repeated logic

Evaluate modules such as:

auth
products
categories
campaigns
cart
checkout
orders
customers
inventory
notifications

Do not create modules merely for the sake of abstraction.

## Reusability

Find duplicated:

- Components
- Hooks
- API calls
- Validation
- Formatting
- Error handling
- Loading states
- Business logic
- Types
- Constants
- Configuration

For each duplication decide whether to:

Extract / Keep local / Merge / Remove

Avoid over-generalized abstractions.

## Readability

Audit:

- Naming
- Function size
- Component size
- File size
- Variables
- Comments
- Types
- Error handling
- Conditional logic
- Magic values
- Boolean naming
- API naming
- Folder naming

Prefer simple, explicit code.

## Separation of Concerns

React Native should generally separate:

UI â†’ Hooks/View Model â†’ State â†’ API Client â†’ Domain Logic

Fastify should generally separate:

Routes â†’ Validation â†’ Handlers/Controllers â†’ Services â†’ Domain Logic â†’ WordPress/WooCommerce Client

Do not force a pattern where it makes the code harder to understand.

## API/Data Layer

Check:

- Centralized API access
- Duplicate endpoints
- Error handling
- Auth headers
- Response parsing
- Retry logic
- Loading logic
- Caching

## Type Safety

Audit:

- Request types
- Response types
- Domain models
- Optional/null fields
- any
- Type assertions
- Duplicate interfaces
- Inconsistent naming

Recommend a clean API contract strategy.

## Configuration

Audit:

- Environment variables
- API URLs
- Feature flags
- Timeouts
- Cache settings
- Analytics
- Development/staging/production separation

Find hardcoded configuration.

---

# Multi-Agent Context Engineering

Treat the repository as a codebase maintained by multiple AI agents and humans.

Determine whether an agent can quickly answer:

- What does this project do?
- Where is the relevant code?
- How does data flow?
- What are the architectural rules?
- What must not be changed?
- How should a feature be implemented?
- How should it be tested?

Check for useful context files:

README.md
ARCHITECTURE.md
CONTRIBUTING.md
AGENTS.md
CLAUDE.md
.cursor/rules/
docs/

Do not require all of them.

## AGENTS.md

Determine whether the project needs an AGENTS.md.

It should document:

- Project overview
- Architecture
- Important directories
- Development rules
- Naming conventions
- API conventions
- State conventions
- Testing conventions
- Architectural constraints
- Security rules
- Common development tasks

## Context Boundaries

For each feature determine the minimum relevant context.

Example:

Product feature:
Product UI + Product API + Types + State + Navigation + Tests

Auth:
Auth UI + Auth API + Token management + Fastify auth + Customer integration + Tests

Orders:
Cart + Checkout + Order API + Order service + WooCommerce + Types + Tests

The goal is to avoid requiring the whole repository as agent context.

## Context Map

Create:

| Feature | Mobile Files | Backend Files | API | Data Model | Tests | Docs |
|---|---|---|---|---|---|---|

## Multi-Agent Collision Risk

Find:

- Shared files
- Giant index files
- Global configuration
- Shared state
- Cross-module dependencies
- Circular dependencies

Recommend boundaries that reduce merge conflicts.

## Agent Task Decomposition

Test whether realistic tasks can be assigned independently:

Agent A â†’ Product UI
Agent B â†’ Product API
Agent C â†’ Authentication
Agent D â†’ Orders
Agent E â†’ Testing

Identify dependencies and shared-file conflicts.

## Score

| Area | Score /10 |
|---|---:|
| Modularity | |
| Reusability | |
| Readability | |
| Maintainability | |
| Type Safety | |
| API Separation | |
| Documentation | |
| Agent Discoverability | |
| Context Boundaries | |
| Multi-Agent Collaboration | |
| Testability | |

## Refactoring Matrix

| File/Module | Problem | Type | Risk | Refactor | Priority |
|---|---|---|---|---|---|

Classify:

KEEP / REFACTOR / EXTRACT / MERGE / MOVE / REMOVE / DOCUMENT

Final output:

1. Current architecture
2. Modularity problems
3. Reusability problems
4. Readability problems
5. Maintainability problems
6. Dependency problems
7. Type/contract problems
8. Documentation problems
9. Multi-agent context problems
10. Recommended structure
11. AGENTS.md recommendation
12. Feature context map
13. Agent task decomposition
14. Refactoring matrix
15. Top 20 improvements
16. Overall score /10

Do not refactor everything automatically.

Use:

Inspect â†’ Understand â†’ Measure â†’ Prioritize â†’ Refactor â†’ Test

Prefer:

Simple + Explicit + Modular + Reusable

over:

Highly abstract + Clever + Difficult to understand

For every refactor explain:

Why â†’ Benefit â†’ Risk â†’ Effort

The ultimate goal is for humans and AI agents to understand, modify, test, and extend individual features without loading the entire codebase into context.
```

---

# 9. Recommended Audit Order

Run the audits in this order rather than randomly:

```text
1. Master Architecture / Production Audit
        â†“
2. Signup / Signin / Security
        â†“
3. Product / Stock / Campaign / Order flows
        â†“
4. UI Rendering / Pages / Information
        â†“
5. Modern UI/UX
        â†“
6. Customer Profile
        â†“
7. Feature Gap / Feature Bloat
        â†“
8. Admin + BI
        â†“
9. Codebase Modularity / Reusability
        â†“
10. Multi-Agent Context Engineering
        â†“
11. Final Consolidated Roadmap
```

This order prevents UI polish or new features from being prioritized before core security, data, business logic, and architecture are understood.

---

# 10. Final Consolidation Prompt

After completing all audits, run this final prompt:

```text
Using all audit findings, create one consolidated production roadmap for this React Native fashion retail application and Fastify gateway.

Do not repeat findings.

Merge duplicates and identify dependencies.

Classify every recommendation:

P0 â€” Critical security/data/business issue
P1 â€” High-value reliability or UX issue
P2 â€” Important improvement
P3 â€” Nice-to-have/polish

Create:

| Priority | Area | Problem | Evidence | Solution | Dependencies | Effort | Business Impact | Risk | Phase |
|---|---|---|---|---|---|---|---|---|---|

Then produce:

## Phase 0 â€” Security & Data Integrity
Fix anything that can compromise accounts, customers, orders, pricing, stock, or credentials.

## Phase 1 â€” Core Reliability
Fix authentication, API failures, order integrity, stock consistency, timeouts, retries, and error handling.

## Phase 2 â€” Architecture
Improve modularity, API contracts, caching, data flow, and maintainability.

## Phase 3 â€” Mobile UX/UI
Modernize screens, navigation, rendering, product discovery, cart, checkout, and profile.

## Phase 4 â€” Admin & BI
Implement the highest-value operational dashboards, analytics, and controls.

## Phase 5 â€” Scale & Optimization
Improve performance, observability, caching, testing, and scalability.

## Phase 6 â€” Future Features
Only include features with clear business value.

Also provide:

- Top 10 immediate fixes
- Top 10 features worth implementing
- Top 10 things to remove/simplify
- Top technical-debt items
- Top security risks
- Top UX problems
- Top BI gaps
- Recommended architecture
- Recommended repository structure
- Recommended AI-agent context structure
- Final production readiness score /10
- Go / Conditional Go / No-Go recommendation

Important:

Do not optimize for the number of features.

Optimize for:

Security
â†’ Reliability
â†’ Customer experience
â†’ Conversion
â†’ Operational efficiency
â†’ Maintainability
â†’ Scalability

Do not recommend changes without evidence or a clear business/technical reason.
```

---

# Audit Principles

Use these principles across every audit:

1. **Inspect before recommending.**
2. **Evidence before opinion.**
3. **Fix critical problems before adding features.**
4. **Do not confuse feature richness with product quality.**
5. **Prefer simple architecture over unnecessary abstraction.**
6. **Keep business-critical validation on the backend.**
7. **Treat WordPress/WooCommerce as an external dependency and protect the mobile app from its internal complexity.**
8. **Keep mobile UI focused on customer experience.**
9. **Make every important API operation observable and testable.**
10. **Design the repository so both humans and AI agents can navigate it quickly.**
11. **Avoid collecting unnecessary customer data.**
12. **Never expose secrets or sensitive customer information.**
13. **Do not rewrite stable code without measurable benefit.**
14. **Every major change should have a validation/test plan.**
15. **Prioritize business impact and user value over trends.**

## Target Architecture

```text
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚ Android / iOS App     â”‚
                    â”‚ React Native          â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                               â”‚
                         HTTPS / REST
                               â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚ Fastify API Gateway   â”‚
                    â”‚                       â”‚
                    â”‚ Auth                  â”‚
                    â”‚ Validation            â”‚
                    â”‚ Authorization         â”‚
                    â”‚ Business Rules        â”‚
                    â”‚ Caching               â”‚
                    â”‚ Rate Limiting         â”‚
                    â”‚ Observability         â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                               â”‚
                 â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                 â”‚             â”‚             â”‚
          â”Œâ”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”
          â”‚ WordPress  â”‚ â”‚WooCommerce â”‚ â”‚ Analytics â”‚
          â”‚ Content    â”‚ â”‚ Products   â”‚ â”‚ / BI      â”‚
          â”‚ Campaigns  â”‚ â”‚ Orders     â”‚ â”‚           â”‚
          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ Customers  â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚ Stock      â”‚
                         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

The key principle is:

**React Native should provide the customer experience. Fastify should provide a clean, secure, controlled API boundary. WordPress/WooCommerce should remain the operational commerce/content source of truth where appropriate. Admin and BI should turn the underlying data into actionable business decisions.**