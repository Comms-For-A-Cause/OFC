# C4AC x OFC - Care Not Custody Campaign

A comprehensive web platform for the "Care Not Custody" advocacy campaign by One Future Collective, addressing human rights violations in Maharashtra's public mental healthcare institutions.

## Overview

This platform serves as a central hub for:
- Documenting and sharing experiences with mental health institutions
- Providing patients' rights education resources
- Building community-generated evidence for advocacy
- Real-time mapping of reported incidents across Maharashtra

## Features

### 🗺️ Living Map of Maharashtra
- Interactive map showing submitted narratives and patterns
- Real-time data visualization
- Regional insights and hotspot identification

### 📝 Story Submission
- Secure form for sharing personal experiences
- Anonymized data collection
- Privacy-first approach with user consent

### 📊 Key Insights
- Statistical analysis of reported cases
- Trend identification
- Evidence-based advocacy support

### 📋 Resources
- Comprehensive white paper on mental healthcare rights
- Patients' rights education materials
- Crisis support information and helplines

### 🚨 Crisis Support
- Floating crisis support button with immediate access to helplines
- Emergency services information (108 in Maharashtra)
- iCALL Psychosocial Helpline integration (+91 91529 87821)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Data Visualization**: Ushahidi platform integration
- **Build Tool**: Vite

## Key Components

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Performance**: Optimized assets and lazy loading
- **Security**: Secure data handling and privacy protection

## Campaign Sections

1. **The Problem**: Human rights violations in mental healthcare
2. **The Solution**: Care Not Custody initiative overview
3. **Take Action**: Ways to get involved and support the cause
4. **Living Map**: Interactive visualization of reported cases
5. **Share Your Story**: Secure submission form
6. **White Paper**: Comprehensive research and analysis
7. **Key Insights**: Statistical overview and trends

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd c4ac-ofc

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Ushahidi Configuration
VITE_USHAHIDI_BASE_URL=https://carenotcustody.ushahidi.io
VITE_USHAHIDI_FORM_ID=2
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ActionCards.tsx
│   ├── CampaignFooter.tsx
│   ├── Factoids.tsx
│   ├── Hero.tsx
│   ├── MapAndFactoids.tsx
│   ├── Navbar.tsx
│   ├── ProblemStatement.tsx
│   ├── SolutionSummary.tsx
│   ├── UshahidiEmbed.tsx
│   ├── WantToTakeAction.tsx
│   └── WhitePaper.tsx
├── config/             # Configuration files
│   └── ushahidi.ts
├── pages/              # Page components
│   └── Index.tsx
├── styles/             # Global styles
│   └── globals.css
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Component-based architecture
- Semantic HTML5 markup


## License

This project is part of the Care Not Custody campaign by One Future Collective made by C4AC labs.

---

**C4AC** - NARRATIVE POWER IS MOVEMENT POWER.