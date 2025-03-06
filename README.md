# AIvakil - Your AI Legal Assistant

![AIvakil Logo](public/aivakil-logo.png)

AIvakil is an intelligent legal assistant powered by AI, specifically trained on the Indian Constitution. It provides accurate and contextual answers to questions about constitutional matters, making legal knowledge more accessible to everyone.

## Features

- 🤖 **AI-Powered Responses**: Get accurate answers about the Indian Constitution using advanced AI technology
- 💡 **Smart Context Matching**: Questions are matched with the most relevant constitutional context
- 📝 **Question History**: Keep track of your recent queries and revisit previous answers
- 📋 **Copy Functionality**: Easily copy answers to clipboard
- 🎨 **Modern UI/UX**: Clean, responsive interface with a user-friendly design
- ⚡ **Fast Performance**: Built with Next.js for optimal performance

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Kaggle Model API
- **State Management**: React Hooks
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Kaggle API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aivakil.git
cd aivakil
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Kaggle credentials:
```env
KAGGLE_USERNAME=your_username
KAGGLE_KEY=your_api_key
```

4. Create a `kaggle.json` file in the appropriate location:
- Windows: `C:\\Users\\<Windows-username>\\.kaggle\\kaggle.json`
- Linux/Mac: `~/.kaggle/kaggle.json`

With the following content:
```json
{
  "username": "your-username",
  "key": "your-api-key"
}
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your question about the Indian Constitution in the text area
2. Click "Get Legal Insight" to receive an answer
3. View the matched question and answer
4. Copy the response using the copy button if needed
5. Access your recent questions from the history sidebar

## Project Structure

```
aivakil/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── query/
│   │   │       └── route.ts    # API endpoint for handling queries
│   │   ├── page.tsx            # Main application page
│   │   └── layout.tsx          # Root layout component
│   └── ...
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
