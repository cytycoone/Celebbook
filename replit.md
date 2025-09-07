# Celebrity Booking Platform

## Overview

This is a comprehensive celebrity booking platform built with Next.js that enables users to book meet-and-greets, purchase VIP fan cards, and make donations through their favorite celebrities. The platform includes both a public-facing website for customers and a complete admin dashboard for managing celebrities, bookings, and platform operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router for modern React development
- **Styling**: Tailwind CSS with custom animations and gradients for a premium user experience
- **UI Components**: Custom React components with Framer Motion for smooth animations
- **Icons**: React Icons library for consistent iconography
- **Authentication**: NextAuth.js for secure session management
- **TypeScript**: Full TypeScript implementation for type safety

### Backend Architecture
- **API Routes**: Next.js API routes using the App Router pattern
- **Database**: MongoDB with Mongoose ODM for flexible document storage
- **Authentication**: Credential-based authentication with bcrypt for password hashing
- **Session Management**: NextAuth.js with JWT tokens for admin sessions
- **Email Service**: Resend integration for transactional emails with React Email templates
- **File Uploads**: Server-side file handling for celebrity images and assets

### Data Models
- **Celebrity Model**: Stores celebrity information including social media links, pricing tiers, and featured status
- **Booking Model**: Manages customer bookings with status tracking and payment information
- **User Model**: Admin user management with role-based access
- **Application Model**: Handles service applications with validation and status tracking

### Service Architecture
- **Meet & Greet Service**: Personal one-on-one celebrity meetings with photo opportunities
- **VIP Fan Cards**: Tiered membership system (Bronze, Silver, Gold, Platinum, Event-based) with different pricing
- **Donation Service**: Charitable giving through celebrity partnerships
- **Admin Dashboard**: Complete management interface for celebrities, bookings, and platform settings

### Security Features
- **Role-based Access Control**: Admin-only access to management features
- **Input Validation**: Comprehensive validation for all user inputs and API endpoints
- **Password Security**: Bcrypt hashing with salt for secure password storage
- **Session Protection**: Secure session management with automatic expiration
- **CORS Configuration**: Proper cross-origin resource sharing setup for Replit deployment

## External Dependencies

### Core Framework Dependencies
- **Next.js 15**: React framework with App Router
- **React 18**: Core React library with latest features
- **TypeScript**: Static type checking and development tooling

### Database & Authentication
- **MongoDB**: Primary database for all application data
- **Mongoose 8.13**: MongoDB object modeling and validation
- **NextAuth.js 4.24**: Authentication and session management
- **bcryptjs**: Password hashing and security

### UI & Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Framer Motion 10.16**: Animation library for smooth interactions
- **React Icons 5.5**: Comprehensive icon library

### Email Services
- **Resend 4.3**: Transactional email service
- **React Email 0.0.36**: Email template system with React components

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **PostCSS**: CSS processing with Autoprefixer
- **ts-node**: TypeScript execution for scripts

### Deployment Configuration
- **Replit Compatibility**: Configured for Replit hosting environment
- **Image Optimization**: Next.js Image component with external domain support
- **CORS Headers**: Proper header configuration for cross-origin requests

### File Management
- **Public Assets**: Static file serving for images and uploads
- **Dynamic Uploads**: Server-side file handling for admin uploads
- **External Image Sources**: Support for multiple CDN providers including Unsplash, Cloudinary, and Imgur