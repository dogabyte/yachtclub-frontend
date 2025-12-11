# Yacht Club Argentino - Frontend

A modern, responsive web application for yacht club management built with Angular and Tailwind CSS. Features role-based dashboards for partners, employees, and administrators with a professional, premium design.

## 🚀 Features

- **Role-Based Dashboards**
  - **Partner Portal**: View personal boats, moorings, and club information
  - **Employee Portal**: Access assigned zones and boat listings (read-only)
  - **Admin Portal**: Complete management interface for all entities

- **Modern UI/UX**
  - Premium design with Tailwind CSS
  - Role-specific color themes
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Card-based interface design

- **Core Functionality**
  - Secure JWT-based authentication
  - Boat registration and management
  - Mooring assignment tracking
  - Zone administration
  - Real-time data synchronization with backend

## 🛠️ Tech Stack

- **Framework**: Angular 21.0.3
- **Styling**: Tailwind CSS 3.4.18
- **Language**: TypeScript 5.9.2
- **HTTP Client**: Angular HttpClient with RxJS 7.8.0
- **Build Tool**: Angular CLI 21.0.2
- **Testing**: Jasmine & Karma

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 21+
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dogabyte/yachtclub-frontend.git
cd yachtclub-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend URL

Update the API endpoint in `src/app/services/*.service.ts`:

```typescript
private apiUrl = 'http://localhost:8080/api';
```

### 4. Run Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

## 🏗️ Project Structure

```
src/app/
├── core/               # Core functionality
│   ├── guards/        # Route guards for authentication
│   └── interceptors/  # HTTP interceptors
├── models/            # TypeScript interfaces/models
│   ├── boat.model.ts
│   ├── mooring.model.ts
│   ├── partner.model.ts
│   ├── employee.model.ts
│   ├── zone.model.ts
│   └── user.model.ts
├── pages/             # Feature modules
│   ├── login/        # Authentication page
│   ├── partner/      # Partner dashboard
│   ├── employee/     # Employee dashboard
│   └── admin/        # Admin dashboard
├── services/          # API services
│   ├── auth.service.ts
│   ├── boat.service.ts
│   ├── mooring.service.ts
│   ├── partner.service.ts
│   ├── employee.service.ts
│   └── zone.service.ts
└── app.routes.ts      # Application routing
```

## 🎨 Design System

### Color Themes by Role

- **Partner**: Blue theme (`#3b82f6`)
- **Employee**: Green theme (`#10b981`)
- **Admin**: Purple theme (`#8b5cf6`)

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Responsive breakpoints
- Utility classes for animations
- Dark mode support (optional)

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT token
3. Token stored in localStorage
4. AuthGuard protects routes
5. HTTP interceptor adds token to requests
6. Automatic redirect on token expiration

## 📱 Available Routes

- `/login` - Authentication page
- `/partner` - Partner dashboard (requires PARTNER role)
- `/employee` - Employee dashboard (requires EMPLOYEE role)
- `/admin` - Admin dashboard (requires ADMIN role)

## 🧪 Testing

### Run Unit Tests

```bash
npm test
# or
ng test
```

### Run End-to-End Tests

```bash
ng e2e
```

Note: E2E framework needs to be configured separately.

## 📦 Building for Production

### Create Production Build

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Production Optimization

The production build includes:
- Ahead-of-Time (AOT) compilation
- Tree shaking
- Minification
- Bundle optimization
- Source maps (optional)

## 🚀 Deployment

### Deploy to Static Hosting

The `dist/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

Example for Netlify:

```bash
npm run build
netlify deploy --prod --dir=dist/yachtclub-frontend-angular/browser
```

## 🔧 Development

### Code Scaffolding

Generate new components:

```bash
ng generate component pages/my-component
```

Generate services:

```bash
ng generate service services/my-service
```

### Code Style

The project uses Prettier for code formatting:

```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

Format code:

```bash
npx prettier --write "src/**/*.{ts,html,css}"
```

## 🌐 Backend Integration

This frontend requires the Yacht Club Backend API to be running. See the [backend repository](https://github.com/dogabyte/yachtclub-backend) for setup instructions.

### API Endpoints Used

- `POST /api/auth/login` - Authentication
- `GET /api/boats` - List boats
- `POST /api/boats` - Create boat
- `GET /api/moorings` - List moorings
- `GET /api/zones` - List zones
- `GET /api/partners` - List partners
- `GET /api/employees` - List employees

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure the backend has the frontend URL in its CORS configuration:

```java
config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
```

### Port Already in Use

Change the default port:

```bash
ng serve --port 4201
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Gabriel** - *Initial work* - [dogabyte](https://github.com/dogabyte)

## 🙏 Acknowledgments

- Built as a final project for Programming II course
- Angular team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- RxJS for reactive programming support

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Angular CLI Reference](https://angular.dev/tools/cli)
