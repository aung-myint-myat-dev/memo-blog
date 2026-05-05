# 🚀 Memo Blog
A modern, full-stack blog application built with Laravel, React and Inertia.js. This project features a seamless Single Page Application (SPA) experience using server-side routing and controllers.

# 🛠 Key Features
## 🔐 Authentication
Auth: Complete registration and login system with "Remember Me" functionality.

Session Handling: Built-in session invalidation and token regeneration for secure logouts.

## 📝 Blog Management
Full CRUD: Create, read, update, and delete blog posts easily.

SEO Friendly: Automatically generates unique slugs (e.g., title-123) for blog URLs.

Cover Images: Integrated image upload system for blog covers with automatic cleanup of old files.

## 👤 Profile & Social System
User Profiles: Customizable profiles with image upload and removal features.

Follow System: Users can follow/unfollow each other to build a community.

Follower Tracking: Dedicated views to manage followers and following lists.

## 💬 Interactive Comments
Engagement: Users can add, edit, and delete comments on blog posts.

Security: Permissions are strictly enforced—users can only modify their own content.

# 🏗 Technical Architecture
Inertia.js: Bridging the gap between a Laravel backend and a React frontend without a complex API.

ImageManager Helper: A dedicated utility class to handle storage disks, image processing, and dynamic placeholder generation.

Authorization (Gates): Secure backend logic using Laravel Gates to protect user data.

Toast Notifications: Flash messaging system to provide immediate user feedback on every action.

# 🚦 Getting Started
1. Clone the Project
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/lareactia-blog.git
cd lareactia-blog
```

2. Install Dependencies
Install both PHP and JavaScript packages:

```
composer install
npm install
```

3. Environment Setup
Copy the example environment file and generate an application key:

```
cp .env.example .env
php artisan key:generate
```

4. Database Migration
Run the migrations to create the necessary tables:

```
php artisan migrate
```

5. Storage Link
Link the storage directory to make images accessible to the web:

```
php artisan storage:link
```

6. Launch the Application
Run the following commands in separate terminals:

```
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```
