# Turso Integration Guide

## 1. Setup

### Architecture
We are using the `@libsql/client` SDK to connect directly to the Turso database from the React application.

### Environment variables
1.  Copy `.env.example` to `.env`.
    ```powershell
    cp .env.example .env
    ```
2.  Fill in your Turso credentials in `.env`:
    - `REACT_APP_TURSO_DATABASE_URL`: Your database URL (e.g. `libsql://my-db.turso.io`)
    - `REACT_APP_TURSO_AUTH_TOKEN`: Your authentication token (generated via `turso db tokens create`)

## 2. Usage

### Connecting
The client is initialized in `src/utils/turso.js`. You can import it anywhere in your app:

```javascript
import { turso } from '../utils/turso';
```

### Fetching Data
Use `turso.execute()` to run SQL queries.

```javascript
const result = await turso.execute("SELECT * FROM my_table");
console.log(result.rows);
```

### Example Component
Check `src/components/TursoExample.jsx` for a full React component example that fetches data on mount.

## 3. Troubleshooting
- **Connection Error**: Check your `.env` file credentials. Ensure the URL starts with `libsql://` or `https://` (if using HTTP).
- **Missing Table**: Ensure you have created the tables in your Turso database before querying them.
