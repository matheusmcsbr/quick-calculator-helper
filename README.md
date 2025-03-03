
# Elegant Calculator Chrome Extension

A beautifully designed calculator Chrome extension that combines minimalist aesthetics with essential functionality. Built with attention to detail and performance, this calculator provides a seamless experience with a copy-to-clipboard feature.

## Features

- Clean, minimal design inspired by modern design principles
- Basic arithmetic operations: addition, subtraction, multiplication, division
- Percentage and sign toggle functionality
- Copy results to clipboard with one click
- Smooth animations and transitions
- Optimized for fast loading and performance

## Development Setup

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn-ui

### Local Development

```bash
# Install dependencies
npm i

# Start the development server
npm run dev
```

### Building the Chrome Extension

To build the extension for Chrome:

```bash
# Build the project
npm run build

# The extension will be in the dist folder
```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right corner
3. Click "Load unpacked" and select the `dist` directory from your project
4. The extension should now appear in your extensions list and in the toolbar

## Publishing to the Chrome Web Store

To publish to the Chrome Web Store:

1. Create a developer account at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Zip the contents of the `dist` directory
3. Create a new item in the developer dashboard
4. Fill out required information and upload the zip file
5. Submit for review

## License

MIT

