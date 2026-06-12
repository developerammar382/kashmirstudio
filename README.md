# Kashmir Studio

<div align="center">

![Kashmir Studio](https://img.shields.io/badge/Kashmir-Studio-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3.2-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css)

**15 years of cinematic wedding films and editorial photography across Rawalpindi, Islamabad, and Gujar Khan.**

[Website](https://kashmirstudio.com) · [Contact](mailto:kashmirstudio35@gmail.com) · [Portfolio](#)

</div>

---

## 📖 Overview

Kashmir Studio is a modern, full-stack wedding photography and videography platform built with cutting-edge web technologies. The project features a stunning frontend with 3D elements, smooth animations, and a professional backend API for managing bookings and content.

**Built by Ammar for Kashmir Studio client.**

### ✨ Key Features

- **Cinematic Portfolio Showcase** - Beautiful gallery with GSAP animations and smooth scrolling
- **3D Interactive Elements** - React Three Fiber integration for immersive experiences
- **Modern UI Components** - Built with Radix UI and shadcn/ui for accessibility and aesthetics
- **Responsive Design** - Fully responsive across all devices
- **Fast Performance** - Optimized with Vite and modern build tools
- **Type-Safe Development** - Full TypeScript coverage with Zod validation

---

## 🏗️ Project Structure

This is a **single-package frontend project** with a clean structure:

```
kashmirstudio/
├── src/                      # Source code
├── public/                   # Static assets
├── package.json              # Package configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 24 or higher
- **pnpm** 10.33.0 or higher ([Install pnpm](https://pnpm.io/installation))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kashmirstudio

# Install dependencies
pnpm install
```

### Running the Project

#### Development Server

```bash
pnpm run dev
```

The website will be available at `http://localhost:8080` (or as configured by PORT environment variable).

#### Build for Production

```bash
pnpm run build
```

#### Preview Production Build

```bash
pnpm run serve
```

---

## 🔧 Available Scripts

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run serve

# Type checking
pnpm run typecheck
```

---

## 🛠️ Tech Stack

### Frontend Stack

- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.3.2
- **Styling**: TailwindCSS 4.1.14
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: GSAP 3.15.0, Framer Motion 12.23.24
- **3D Graphics**: React Three Fiber, Three.js
- **Smooth Scrolling**: Lenis
- **Form Handling**: React Hook Form, Zod
- **Routing**: Wouter
- **State Management**: TanStack Query

### Development Tools

- **Package Manager**: pnpm (workspace)
- **Type Checking**: TypeScript 5.9.3
- **Code Quality**: Prettier
- **Git Hooks**: (configured as needed)

---

## 📦 Environment Variables

### Environment Variablehe proje oo

Create a `.env` file in `artifacts/kashmir-studio/`:

```env
PORT=8080
BASE_PATH=/
```

---

## 🎨 Customization

### Theme Configuration

The project uses TailwindCSS with custom theme configurations. Modify the theme in:

- `artifacts/kashmir-studio/tailwind.config.js`
- CSS custom properties in `artifacts/kashmir-studio/src/index.css`

### Component Styling

UI components are built using Radix UI primitives and styled with TailwindCSS. Customize components in:

- `src/components/ui/`

---

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use Prettier for code formatting
- Write meaningful commit messages

### Adding New Components

1. Create component in appropriate directory
2. Export from index file if needed
3. Add TypeScript types
4. Write component documentation
5. Test thoroughly

---

## 🔒 Security

- Supply-chain attack protection via minimum release age (1440 minutes)
- Regular dependency updates
- Environment variable management
- CORS configuration for API

---

## 📄 Licenseoen soucavalbeunde te MITLicn

This project is private and proprietary. All rights reserved.

---

## 📞 Contact

**Kashmir Studio**
- Email: kashmirstudio35@gmail.com
- Phone: +92-333-9566039
- Location: Gujar Khan, Rawalpindi, Pakistan

---

## 🙏 Acknowledgments

- Built with modern web technologies
- UI components inspired by shadcn/ui
- 3D elements powered by Three.js ecosystem

---

**Note**: This project uses **pnpm** as the package manager. Do not attempt to use npm or yarn.

---

## 📦 Package Manager

### Why pnpm?

This project uses **pnpm** for efficient dependency management:

1. **Disk Efficiency** - Uses hard links to save disk space
2. **Strict Dependency Management** - Prevents phantom dependencies
3. **Faster Installations** - Parallel package installation
4. **Better Performance** - Optimized for modern JavaScript projects

### Can I switch to npm?

**❌ Not recommended** - Switching to npm would require:

1. **Remove workspace enforcement** - Delete the `preinstall` script in `package.json`
2. **Regenerate lock files** - Delete `pnpm-lock.yaml` and generate `package-lock.json`
3. **Update CI/CD scripts** - Change all pnpm commands to npm equivalents
4. **Test thoroughly** - Ensure everything works after migration

**Estimated effort**: 1-2 hours of work with potential for breaking changes.

**Recommendation**: Stick with pnpm. It's faster, more efficient, and purpose-built for modern JavaScript projects.

### Installing pnpm

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using standalone script
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

---

## 🐛 Troubleshooting

### Common Issues

**"Use pnpm instead" error**
- The project enforces pnpm usage via preinstall script
- Make sure you're using `pnpm` instead of `npm` or `yarn`

**Port already in use**
- Change the PORT environment variable
- Or stop the process using the port

**TypeScript errors**
- Run `pnpm run typecheck` to see all type errors
- Ensure all dependencies are installed with `pnpm install`

**Build failures**
- Clear cache: `rm -rf node_modules .vite dist`
- Reinstall dependencies: `pnpm install`
- Check Node.js version: `node --version` (should be 24+)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Three.js Documentation](https://threejs.org)
- [GSAP Documentation](https://gsap.com)
- [pnpm Documentation](https://pnpm.io)

---

<div align="center">

**Built with ❤️ by Ammar for Kashmir Studio**

© 2026 Kashmir Studio. All rights reserved.

</div>
