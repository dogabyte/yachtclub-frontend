# Project Requirements - Yacht Club Management System

## 📋 Problem Statement

### Context

The Yacht Club Argentino requires a comprehensive digital management system to handle its marina operations, member services, and administrative tasks. The club manages multiple zones within the marina, each containing moorings (docking spaces) that can be purchased by club members for their boats.

### Objectives

Develop a full-stack web application that enables:

1. **Member Management**: Track club partners (socios) and their boat ownership
2. **Marina Operations**: Manage zones, moorings, and boat assignments
3. **Staff Coordination**: Assign employees to specific zones for maintenance and oversight
4. **Access Control**: Implement role-based permissions for different user types

## 👥 User Roles & Permissions

### 1. Partner
**Access Level**: Read-only for personal data

**Capabilities**:
- View personal boat(s) information
- Check mooring assignments
- View zone details where boats are located
- Access personal account information

**Restrictions**:
- Cannot modify any data
- Cannot view other members' information

### 2. Employee         
**Access Level**: Read-only for assigned zones

**Capabilities**:
- View all boats in assigned zones
- Access mooring information in assigned zones
- Consult zone details
- View boat and owner information for maintenance purposes

**Restrictions**:
- Cannot create, update, or delete any records
- Cannot access zones not assigned to them
- Cannot view administrative data

### 3. Administrator
**Access Level**: Full CRUD operations

**Capabilities**:
- Complete management of all entities:
  - Partners (create, read, update, delete)
  - Employees (create, read, update, delete)
  - Boats (create, read, update, delete)
  - Moorings (create, read, update, delete)
  - Zones (create, read, update, delete)
  - Employee-Zone assignments
- System configuration
- User account management
- Generate reports and analytics

## 🗄️ Data Model Requirements

### Core Entities

#### Partner  
- Personal information (name, contact details)
- Membership status
- Associated boats (one-to-many relationship)
- Purchased moorings

#### Employee     
- Personal information
- Employment details
- Zone assignments (many-to-many relationship)

#### Administrator
- Personal information
- Administrative privileges
- System access credentials

#### Boat 
- Registration details
- Boat specifications (name, type, length, etc.)
- Owner (belongs to one partner)
- Assigned mooring (one-to-one relationship)
- Assignment date

#### Mooring  
- Unique identifier
- Location within zone
- Zone assignment (belongs to one zone)
- Owner (partner who purchased it)
- Purchase date
- Current boat assignment (if any)

#### Zone 
- Zone identifier
- Location description
- Capacity (number of moorings)
- Assigned employees (many-to-many relationship)

#### Employee-Zone Assignment   
- Links employees to zones
- Assignment date
- Status (active/inactive)

### Key Relationships

```
Partner (1) ──────── (N) Boat
Boat (1) ──────── (1) Mooring
Mooring (N) ──────── (1) Zone
Employee (N) ──────── (N) Zone (via EmployeeZone)
Partner (1) ──────── (N) Mooring (purchased moorings)
```

## 🔧 Functional Requirements

### Authentication & Authorization
- Secure login system with encrypted passwords
- JWT-based session management
- Role-based access control (RBAC)
- Automatic session timeout
- Password recovery mechanism

### Partner Features
- Dashboard showing personal boats
- View mooring assignments
- Check zone information
- Access contact information

### Employee Features
- View assigned zones
- List all boats in assigned zones
- Access mooring details
- Consultation mode only (no modifications)

### Administrator Features
- **Partner Management**:
  - Register new partners
  - Update partner information
  - Deactivate/reactivate memberships
  - View partner history

- **Boat Management**:
  - Register new boats
  - Assign boats to moorings
  - Update boat information
  - Track assignment history

- **Mooring Management**:
  - Create moorings within zones
  - Assign moorings to partners (sales)
  - Track mooring availability
  - Manage mooring-boat assignments

- **Zone Management**:
  - Create and configure zones
  - Set zone capacity
  - View zone occupancy

- **Employee Management**:
  - Register employees
  - Assign employees to zones
  - Manage zone assignments
  - Track employee responsibilities

## 🎯 Non-Functional Requirements

### Performance
- Page load time < 2 seconds
- API response time < 500ms
- Support for 100+ concurrent users

### Security
- HTTPS encryption for all communications
- SQL injection prevention
- XSS protection
- CSRF token validation
- Secure password storage (BCrypt)

### Usability
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation
- Clear error messages
- Consistent UI/UX across roles

### Scalability
- Modular architecture for easy expansion
- Database optimization for growing data
- Stateless backend for horizontal scaling

### Maintainability
- Clean code principles
- Comprehensive documentation
- Automated testing
- Version control (Git)

## 🏗️ Technical Requirements

### Backend
- RESTful API architecture
- Spring Boot framework
- PostgreSQL database
- JPA/Hibernate ORM
- MapStruct for DTO mapping
- Spring Security for authentication
- JWT for token management
- OpenAPI/Swagger documentation

### Frontend
- Single Page Application (SPA)
- Angular framework
- TypeScript
- Tailwind CSS for styling
- Reactive programming (RxJS)
- HTTP interceptors for auth
- Route guards for access control

### Development Practices
- MVC architectural pattern
- Strategy Pattern for authentication (UserAuthenticationStrategy)
- Repository pattern for data access
- Service layer for business logic
- DTO pattern for data transfer
- Dependency injection
- Exception handling
- Input validation

## ✅ Acceptance Criteria

### Must Have
- [x] User authentication with role-based access
- [x] Partner can view personal boats and moorings
- [x] Employee can view boats in assigned zones (read-only)
- [x] Administrator has full CRUD on all entities
- [x] Boat-to-mooring assignment tracking
- [x] Mooring-to-zone organization
- [x] Employee-to-zone assignments
- [x] Secure password storage
- [x] API documentation

### Should Have
- [ ] Search and filter functionality
- [ ] Data export capabilities
- [ ] Audit logs for admin actions
- [ ] Email notifications
- [ ] Advanced reporting

### Nice to Have
- [ ] Mobile application
- [ ] Real-time updates (WebSockets)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Analytics dashboard

## 📊 Success Metrics

- System successfully manages all yacht club entities
- Role-based access properly restricts user actions
- Zero security vulnerabilities in authentication
- 100% data integrity in relationships
- Positive user feedback from all role types

## 🎓 Academic Context

This project serves as the final assignment for the Programming II course, demonstrating:
- Object-oriented programming principles
- Design patterns implementation
- Full-stack development skills
- Database design and normalization
- API development and integration
- Security best practices
- Professional software development workflow
