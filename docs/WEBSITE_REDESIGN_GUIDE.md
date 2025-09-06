# CJ Clarke for Sheridan City Council - Website Redesign Guide

## Overview
This document outlines a comprehensive website redesign for the CJ Clarke campaign, inspired by the structure and effectiveness of Michelle Wu's campaign website while maintaining the patriotic Red, White, and Blue color scheme and incorporating the existing content from the current site.

## Design Philosophy
- **Community-First**: Emphasize local impact and resident needs
- **Results-Oriented**: Highlight specific accomplishments and practical solutions
- **Accessible**: Clean, modern design that builds trust
- **Actionable**: Clear calls-to-action for engagement
- **Patriotic**: Red, White, and Blue color scheme reflecting American values

## Color Scheme
- **Primary Red**: #DC2626 (for CTAs, highlights, and key elements)
- **Primary Blue**: #1E40AF (for headers, navigation, and trust elements)
- **White**: #FFFFFF (for backgrounds and contrast)
- **Gray Scale**: #F8FAFC, #E2E8F0, #64748B, #1E293B (for text and subtle elements)

## Website Structure & Content Sections

### 1. Main Navigation
- **Home** - Introduction and key messaging
- **Meet CJ** - Personal story and background
- **Issues** - Detailed policy positions
- **News** - Campaign updates and announcements
- **Get Involved** - Volunteer opportunities and engagement
- **Donate** - Campaign fundraising

### 2. Homepage Layout

#### Hero Section
```
Title: "A Healthier, Safer Sheridan"
Subtitle: "Local small‑business owner, youth mentor, and neighbor — ready to deliver practical results on council."
Hero Image: CJ speaking with Sheridan neighbors at a community event
Primary CTA: "Donate" (Red button)
Secondary CTA: "Volunteer" (Blue button)
```

#### Key Features Section
```
"Why CJ Clarke?"
- Community Leader (Blue icon) - Over 20 years mentoring youth and building community through martial arts
- Small Business Owner (Green icon) - Understands the challenges local entrepreneurs face
- Results-Focused (Red icon) - Committed to practical solutions that make a real difference
```

#### Top Issues Preview
```
"Key Priorities"
- Public Safety & Safe Streets
- Youth Programs & Parks  
- Small Business & Local Economy
- Accountability & Budget Transparency
[View All Issues button]
```

### 3. Meet CJ Page

#### Personal Story Section
```
"Meet Chris (CJ) Clarke"
- Small‑business owner (Chi Life Movement)
- World‑renowned martial‑arts instructor
- Youth mentor and community builder
- 20+ years of community service
```

#### Why He's Running
```
"Running for City Council to strengthen public safety, expand youth opportunities, 
support small businesses, and keep budgets disciplined and transparent."
```

#### Community Impact
```
"A Mentor and Community Builder"
- Creates welcoming, family‑oriented spaces
- Teaches practical skills and mental focus
- Believes city government should approach public service with preparation, 
  accountability, and teamwork
```

### 4. Issues & Priorities Page

#### Issue Cards Layout
Each issue should have:
- **Hero Image** - Relevant local scene
- **Title** - Clear, action-oriented
- **Summary** - One-line description
- **Key Points** - 3-4 bullet points with specific actions
- **Related Issues** - Cross-links to connected topics

#### Issue 1: Public Safety & Safe Streets
```
Priority: 1
Summary: "Practical, community‑oriented safety: better lighting, traffic calming near schools, and coordination with regional partners."

Key Actions:
- Targeted Traffic Calming: Work with neighborhoods to identify dangerous corridors near schools and parks
- Safer Crossings & Lighting: Improve crosswalk visibility with daylighting, lighting, and curb extensions
- Coordination with Regional Partners: Collaborate with county and state partners on high‑injury corridors
```

#### Issue 2: Youth Programs & Parks
```
Priority: 2
Summary: "Expand after‑school programs and scholarships by partnering with schools, nonprofits, and local businesses."

Key Actions:
- After‑School & Weekend Options: Partner with schools, nonprofits, and local businesses to expand offerings
- Parks & Recreation: Maintain and enhance parks as community hubs with fitness, arts, and cultural activities
```

#### Issue 3: Small Business & Local Economy
```
Priority: 3
Summary: "Cut red tape, revitalize commercial corridors, and support entrepreneurs."

Key Actions:
- Streamlined Permits & Licensing: Make it easier for small businesses to start and grow
- Revitalize Commercial Corridors: Focus on clean, well‑lit, walkable streets that attract customers
```

#### Issue 4: Accountability & Budget Transparency
```
Priority: 4
Summary: "Focus on essentials, measure results, and share progress with residents."

Key Actions:
- Focus on Essentials: Prioritize public safety, infrastructure, and parks
- Clear Communication: Share easy‑to‑read summaries of projects and budgets
```

### 5. News & Updates Page

#### News Card Layout
Each news item should have:
- **Date** - Prominent display
- **Title** - Clear, engaging headline
- **Summary** - Brief description
- **Read More** - Link to full article

#### Current News Items
```
1. "Kickoff House Chat Announced" (August 10, 2025)
   - Join CJ and neighbors to talk priorities for a healthier, safer Sheridan
   - Thursday, August 21, 6:30–8:00 PM

2. "Volunteer Weekend Launch" (August 15, 2025)
   - Help us knock doors, make calls, and spread the word
   - Saturday canvass, Sunday phone bank
```

### 6. Get Involved Page

#### Volunteer Opportunities Section
```
"Join Our Team"

Volunteer Opportunities:
- Door-to-door canvassing
- Phone banking
- Event support
- Social media outreach

Other Ways to Help:
- Host a house chat
- Display a yard sign
- Share on social media
- Tell your neighbors
```

#### Volunteer Form
```
"Get Started Today"
- Name and email fields
- Interest areas checkboxes
- Availability preferences
- "Count Me In!" button (Red)
```

### 7. Donate Page

#### Donation Options
```
"Support CJ's Campaign"

Quick Donation Amounts:
- $25 - Covers literature for one precinct
- $50 - Supports a community event
- $100 - Funds voter outreach efforts
- $250 - Major campaign support

Custom Amount Field
"Donate Securely" Button (Red)
```

## Content Strategy

### Messaging Framework
1. **Achievement-Focused**: Highlight specific accomplishments with data
2. **Community-Centered**: Emphasize local impact and resident needs
3. **Policy-Detailed**: Comprehensive plans with specific goals and timelines
4. **Action-Oriented**: Clear calls-to-action for engagement

### Key Messages
- **"A Healthier, Safer Sheridan"** - Main campaign theme
- **"Practical Results"** - Emphasize CJ's results-oriented approach
- **"Community-First Leadership"** - Highlight local focus
- **"Small Business Champion"** - Appeal to local entrepreneurs
- **"Youth Mentor"** - Connect with families and educators

### Visual Elements
- **Hero Images**: Local Sheridan scenes, CJ in community settings
- **Icons**: Patriotic and community-focused (shield, building, people, target)
- **Color Accents**: Strategic use of red, white, and blue throughout
- **Typography**: Clean, readable fonts that convey trust and professionalism

## Technical Implementation

### Page Structure
```
Homepage (/)
├── Hero Section
├── Why CJ Section
├── Key Priorities Preview
└── Call-to-Action

Meet CJ (/meet)
├── Personal Story
├── Why Running
├── Community Impact
└── Get Involved CTA

Issues (/issues)
├── Issues Overview
├── Issue Cards Grid
└── Related Issues Links

News (/news)
├── News Overview
├── News Cards Grid
└── Archive Link

Get Involved (/get-involved)
├── Volunteer Opportunities
├── Other Ways to Help
├── Volunteer Form
└── Contact Information

Donate (/donate)
├── Donation Options
├── Impact Examples
├── Donation Form
└── Legal Disclaimers
```

### Component Architecture
- **Hero Component**: Reusable hero section with image, title, summary, and CTAs
- **Issue Card Component**: Consistent issue display with image, title, summary, and key points
- **News Card Component**: News item display with date, title, summary, and read more
- **CTA Button Component**: Consistent call-to-action styling
- **Form Components**: Volunteer and donation forms with validation

### Responsive Design
- **Mobile-First**: Optimize for mobile devices first
- **Tablet Optimization**: Ensure good experience on tablets
- **Desktop Enhancement**: Add advanced features for desktop users
- **Accessibility**: WCAG 2.1 AA compliance

## Content Guidelines

### Writing Style
- **Conversational**: Write as if speaking to a neighbor
- **Specific**: Use concrete examples and data
- **Action-Oriented**: Focus on what CJ will do, not just what he believes
- **Local**: Reference Sheridan-specific locations and issues
- **Positive**: Emphasize solutions and opportunities

### Image Guidelines
- **High Quality**: Professional photos that convey trust
- **Local Focus**: Sheridan landmarks, neighborhoods, and community events
- **Diverse Representation**: Show the full Sheridan community
- **Action Shots**: CJ engaging with residents, not just posed photos
- **Optimized**: Proper sizing and compression for web performance

### SEO Optimization
- **Local Keywords**: "Sheridan City Council", "Sheridan elections", "local government"
- **Issue Keywords**: "public safety", "youth programs", "small business support"
- **Meta Descriptions**: Compelling descriptions under 160 characters
- **Schema Markup**: Local business and political candidate markup
- **Internal Linking**: Connect related pages and content

## Success Metrics

### Engagement Goals
- **Volunteer Sign-ups**: Track form submissions and follow-up
- **Donation Conversion**: Monitor donation page visits to donations
- **Newsletter Sign-ups**: Track email list growth
- **Social Shares**: Monitor social media engagement
- **Time on Site**: Measure content engagement

### Content Performance
- **Page Views**: Track most popular content
- **Bounce Rate**: Monitor page engagement
- **Conversion Rates**: Measure CTA effectiveness
- **Mobile Usage**: Ensure mobile optimization
- **Search Rankings**: Monitor local search visibility

## Implementation Timeline

### Phase 1: Content Migration (Week 1)
- [ ] Migrate existing content to new structure
- [ ] Update all page content with new messaging
- [ ] Optimize images and media
- [ ] Implement basic responsive design

### Phase 2: Enhanced Features (Week 2)
- [ ] Add volunteer and donation forms
- [ ] Implement news management system
- [ ] Add social media integration
- [ ] Optimize for mobile devices

### Phase 3: Testing & Launch (Week 3)
- [ ] User testing and feedback
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Launch and monitoring

## Maintenance Guidelines

### Regular Updates
- **Weekly**: News and campaign updates
- **Monthly**: Issue position refinements
- **Quarterly**: Design and content review
- **As Needed**: Event announcements and urgent updates

### Content Management
- **Version Control**: Track all content changes
- **Backup Strategy**: Regular backups of all content
- **Review Process**: Content review before publication
- **Legal Compliance**: Ensure campaign finance compliance

This redesign guide provides a comprehensive framework for creating an effective campaign website that combines the proven structure of successful political websites with CJ Clarke's unique local focus and patriotic branding. The Red, White, and Blue color scheme will reinforce the campaign's American values while the community-focused content will resonate with Sheridan residents.


