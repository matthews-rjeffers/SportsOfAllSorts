# Sports of All Sorts - Modern Website Redesign

A modern, responsive, and accessible website redesign for Sports of All Sorts, Northern Kentucky's premier sports facility.

## Overview

This project is a complete redesign of [sportsofallsortsky.com](https://www.sportsofallsortsky.com), focusing on improved user experience, modern design aesthetics, accessibility compliance, and performance optimization.

## Features

- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Modern UI**: Clean, contemporary design with smooth animations
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation, ARIA labels, and screen reader support
- **Performance**: Lightweight, optimized code with no framework dependencies
- **Contact Form**: Client-side validation with user-friendly error handling

## Project Structure

```
SportsOfAllSorts/
├── index.html          # Main HTML file with all page sections
├── css/
│   └── styles.css      # Complete stylesheet with CSS custom properties
├── js/
│   └── main.js         # JavaScript for interactivity and form handling
├── images/             # Directory for images (placeholder for now)
└── README.md           # This file
```

## Sections

1. **Hero** - Eye-catching introduction with key stats
2. **Services** - Overview of all offerings (6 service cards)
3. **Leagues** - Basketball, volleyball, soccer, and flag football
4. **Fitness Center** - Membership benefits and insurance acceptance
5. **Bowling** - 8-lane bowling center features
6. **Birthday Parties** - Party packages with pricing
7. **Training & Camps** - Skills programs and youth camps
8. **About** - Company history and facility info
9. **Hours** - Operating hours for main facility and fitness center
10. **Contact** - Contact form, phone, email, location, social links

## Quick Start

### Option 1: Open Directly
Simply open `index.html` in any modern web browser.

### Option 2: Local Development Server
For the best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` and select "Open with Live Server"

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## Improvements Made

### Design Improvements

| Original Issue | Improvement |
|----------------|-------------|
| Placeholder/broken images | Clean gradient backgrounds as placeholders, ready for real images |
| Cluttered navigation (7+ dropdown items) | Simplified navigation with max 5 items per dropdown |
| Inconsistent visual hierarchy | Consistent typography scale and spacing system |
| Outdated color scheme | Modern blue/orange palette with proper contrast ratios |
| Poor mobile experience | Fully responsive with mobile-first approach |

### Technical Improvements

| Original Issue | Improvement |
|----------------|-------------|
| Heavy JS dependencies (WordPress, plugins) | Vanilla JavaScript, no frameworks |
| Slow loading (multiple third-party scripts) | Single CSS and JS file, optimized |
| Poor accessibility | Full ARIA support, keyboard navigation, skip links |
| No semantic HTML | Clean semantic HTML5 structure |
| Inline styles and complex markup | Modular CSS with custom properties |

### UX Improvements

| Original Issue | Improvement |
|----------------|-------------|
| Confusing navigation structure | Clear, intuitive navigation |
| Redundant CTAs everywhere | Strategic, purposeful calls-to-action |
| Lorem ipsum placeholder text | Complete, meaningful content |
| Poor information hierarchy | Logical content organization |
| No form validation | Real-time validation with helpful error messages |

## Customization

### Colors
Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --color-primary: #1e40af;      /* Main brand color */
    --color-secondary: #f97316;    /* Accent color */
    /* ... more variables */
}
```

### Fonts
The site uses Google Fonts (Inter and Montserrat). To change:

1. Update the `<link>` in `index.html`
2. Update `--font-family-base` and `--font-family-heading` in CSS

### Adding Images
Replace the gradient placeholders with real images:

1. Add images to the `images/` folder
2. Update the CSS backgrounds or add `<img>` tags
3. Example for league cards:
   ```css
   .basketball-bg {
       background-image: url('../images/basketball.jpg');
   }
   ```

## Deployment Options

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch (main) and save
4. Site will be available at `https://username.github.io/SportsOfAllSorts`

### Netlify
1. Connect your GitHub repo
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel
1. Import your GitHub repo
2. Framework preset: "Other"
3. Deploy!

### Traditional Hosting
Upload all files to your web server's public directory via FTP/SFTP.

## Future Enhancements

Consider adding these features:

- [ ] **Online Registration System** - Integration with registration platform
- [ ] **League Schedules** - Dynamic schedule display from API
- [ ] **Event Calendar** - Upcoming events and games
- [ ] **Photo Gallery** - Lightbox gallery of facility and events
- [ ] **Testimonials** - Customer reviews carousel
- [ ] **Live Chat** - Customer support widget
- [ ] **Newsletter Signup** - Email list integration
- [ ] **Multi-page Structure** - Separate pages for each section
- [ ] **CMS Integration** - Headless CMS for content management
- [ ] **Dark Mode** - User preference toggle

## Performance Notes

- **No external dependencies** except Google Fonts
- **CSS**: ~1,800 lines, well-organized with custom properties
- **JavaScript**: ~400 lines, vanilla JS with no frameworks
- **Lighthouse Score**: Targeting 90+ across all metrics

## Accessibility Features

- Skip to main content link
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast (WCAG AA)
- Reduced motion support
- Form error announcements

## License

This project is for educational/portfolio purposes. The original Sports of All Sorts branding belongs to its respective owners.

---

Built with care for Sports of All Sorts, Florence, KY
