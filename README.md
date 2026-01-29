# JS Homepage - Interactive Coding Platform

![JS Homepage](https://img.shields.io/badge/JS_Homepage-Interactive%20Coding%20Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.1-646cff?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Master JavaScript and React with our interactive coding platform**

[Live Demo](https://aryanbatras.github.io/js-homepage/) • [Report Bug](https://github.com/aryanbatras/js-homepage/issues) • [Request Feature](https://github.com/aryanbatras/js-homepage/issues)

## 📖 About

JS Homepage is a comprehensive **interactive coding platform** designed to help developers master JavaScript and React through hands-on practice. With **60+ coding challenges** across 20+ categories, AI-powered assistance, and real-time code editing, it's the perfect environment for both beginners and experienced developers.

### 🎯 Key Features

- **🚀 Interactive Code Editor** - Monaco Editor with syntax highlighting and IntelliSense
- **🤖 AI Assistant** - Get real-time help and code suggestions
- **📚 Extensive Problem Library** - 60+ challenges covering JavaScript, React, algorithms, and more
- **🔗 GitHub Integration** - Sync your progress and solutions with GitHub
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🎨 3D Visualizations** - Interactive Three.js components for enhanced learning
- **⏱️ Built-in Timer** - Track your coding sessions and improve productivity
- **🔍 Smart Search** - Find problems quickly with intelligent search functionality
- **📊 Progress Tracking** - Monitor your learning journey and achievements

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React 19.2.3 + Vite 6.2.1
- **Language**: JavaScript (with TypeScript support planned)
- **Styling**: SASS/SCSS
- **Code Editor**: Monaco Editor
- **3D Graphics**: Three.js + React Three Fiber + React Three Rapier
- **Authentication**: GitHub OAuth
- **Backend**: Firebase
- **AI Service**: Custom Cloudflare Workers integration
- **State Management**: React Context + Hooks
- **Build Tool**: Vite with PWA support

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Main dashboard components
│   ├── navbar/         # Navigation components
│   └── footer/         # Footer components
├── pages/              # Page components
│   ├── dashboard/      # Main dashboard page
│   ├── homepage/       # Landing page
│   └── ...             # Other pages
├── hooks/              # Custom React hooks
├── services/           # External service integrations
├── store/              # Problem data and categories
├── utils/              # Utility functions
├── contexts/           # React contexts
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryanbatras/js-homepage.git
   cd js-homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```env
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4000`

## 📚 Available Categories

### Console Programming
- **JavaScript Fundamentals** - Core concepts and syntax
- **React & React Hooks** - Modern React development
- **Algorithms & Data Structures** - Problem-solving techniques
- **LeetCode Challenges** - Interview preparation
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Server-side JavaScript
- **System Design** - Architecture patterns
- **Testing** - Unit and integration testing
- **Security** - Web security best practices
- **Database** - Data persistence and querying

### Visual Programming
- **HTML/CSS** - Web styling and layout
- **DOM Manipulation** - Interactive web pages
- **CSS Animations** - Motion and transitions
- **Canvas Graphics** - 2D graphics programming
- **SVG Graphics** - Vector graphics
- **Web Components** - Custom elements

## 🎯 How to Use

1. **Sign in with GitHub** - Secure authentication with your GitHub account
2. **Choose a category** - Browse through our extensive problem library
3. **Select a challenge** - Pick a problem that matches your skill level
4. **Code in the editor** - Write and test your solution in real-time
5. **Get AI assistance** - Stuck? Ask our AI assistant for help
6. **Track your progress** - Monitor your learning journey and achievements
7. **Sync with GitHub** - Save your progress and solutions to your repository

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] **TypeScript Migration** - Full TypeScript support
- [ ] **Progress Dashboard** - Advanced analytics and insights
- [ ] **Collaborative Coding** - Real-time pair programming
- [ ] **Mobile App** - Native mobile applications
- [ ] **Advanced AI Features** - Enhanced code analysis and suggestions
- [ ] **Community Features** - User profiles and leaderboards
- [ ] **Video Tutorials** - Integrated learning resources

## 🐛 Troubleshooting

### Common Issues

1. **GitHub Authentication Issues**
   - Ensure your GitHub OAuth app is properly configured
   - Check that the redirect URI matches your deployment URL

2. **Firebase Connection Issues**
   - Verify your Firebase configuration
   - Check Firebase security rules

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Ensure you're using Node.js 18+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** - For the powerful code editing experience
- **Three.js** - For amazing 3D visualizations
- **React** - For the component-based UI framework
- **Vite** - For the lightning-fast build tool
- **Firebase** - For backend services
- **GitHub** - For authentication and version control

## 📞 Contact

- **Author**: Aryan Batra
- **Twitter**: [@aryanbatra03](https://twitter.com/aryanbatra03)
- **GitHub**: [@aryanbatras](https://github.com/aryanbatras)
- **Website**: [aryanbatras.github.io/js-homepage](https://aryanbatras.github.io/js-homepage/)

---

**⭐ Star this repository if it helped you!**

Made with ❤️ by [Aryan Batra](https://github.com/aryanbatras)
