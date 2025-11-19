# Task Management Application

## Overview

This is a **Task Management Application** built with a **Laravel** backend and a **Nuxt.js** frontend. The backend handles the API and business logic, while the frontend provides a modern, responsive user interface.

---

## Project Structure

### Backend
The backend is located in the `backend/` directory and is built using Laravel. It includes:
- **`app/`**: Core application logic, including controllers, models, and repositories.
- **`config/`**: Configuration files for the application.
- **`routes/`**: API and web routes.
- **`tests/`**: Unit and feature tests.
- **`public/`**: Publicly accessible files, such as assets.

### Frontend
The frontend is located in the `frontend/` directory and is built using Nuxt.js. It includes:
- **`app/`**: Application-specific components and pages.
- **`public/`**: Static assets.
- **`nuxt.config.ts`**: Configuration file for Nuxt.js.

---

## Prerequisites

- **Docker** (for Laravel Sail)
- **Composer** (v2)
- **PHP** (v8.2)
- **Node.js** (v23+)

---

## Installation

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
4. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
5. Start the Laravel Sail environment:
   ```bash
   ./vendor/bin/sail up -d
   ```
6. Generate the application key:
   ```bash
   ./vendor/bin/sail artisan key:generate
   ```
7. Set up the database in the `.env` file and run migrations:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```
8. Run database seeder
   ```bash
   ./vendor/bin/sail artisan db:seed
   ```

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

---

## Development

### Backend
Start the Laravel Sail environment:
```bash
./vendor/bin/sail up -d
```

### Frontend
Start the Nuxt.js development server:
```bash
pnpm run dev
```

---

## Testing

### Backend
Run the PHPUnit tests:
```bash
./vendor/bin/sail artisan config:cache
```

```
./vendor/bin/sail pest
```

---

## Deployment

1. Build the frontend for production:
   ```bash
   pnpm run build
   ```
2. Deploy the backend and frontend to your server or containerized environment.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## Contact

For questions or support, please contact [christianmartincabucos@gmail.com](mailto:christianmartincabucos@gmail.com).
