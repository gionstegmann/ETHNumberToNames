# ETH Zurich Course Number to Name Extension

This Chrome extension automatically replaces ETH Zürich course numbers with their full or short names on web pages, based on user preferences.

## Features

- Replace course codes with full names or abbreviations.
- Option to enclose course names in square brackets.
- User settings are saved and applied across sessions.

## Installation

Currently, this extension isn't on the Chrome store and needs to be loaded unpacked manually:

1. Download this repository and unzip it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the extension directory.

## Usage

After installation, navigate to a webpage with course codes. The extension will automatically replace them according to your saved preferences. 
To change settings, click on the extension icon and adjust your preferences.

## Contributing

For now, only a small amount of courses will translate. To add more, add them in the [content.js](content.js) file into the courseMappings database.
Consider submitting a pull request with your added courses to make your mappings available to everyone.

Other contributions are of course welcome too.

## License

[MIT](LICENSE)
