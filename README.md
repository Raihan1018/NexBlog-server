# Blog Server

Small Express + MongoDB API for a simple blog app.

Key files:

- [server.js](server.js) — main server implementation (see [`connectDB`](server.js), [`blogsCollection`](server.js)).
- [.env](.env) — environment variables (MongoDB connection + NEXTAUTH_URL).
- [package.json](package.json) — scripts and dependencies.

Requirements

- Node.js 16+ and npm
- A MongoDB URI (set in `.env`)

Install & run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Add environment vars to `.env` (example present in `.env`).
3. Start server:
   ```sh
   npm start
   ```
   Default port is $PORT or 5050.

Behavior & notes

- Connects to MongoDB using the URI from `.env` and uses the `blogsDB` database and `blogs` collection (see [`connectDB`](server.js)).
- CORS is restricted to `http://localhost:3000` by default (set in [server.js](server.js)).
- JSON body parsing enabled.

API Endpoints (base: http://localhost:5050)

- GET /api/blogs  
  Returns all blogs sorted by date desc.

- GET /api/blogs/:id  
  Get a single blog by MongoDB ObjectId.

- POST /api/blogs  
  Create a blog. Required fields: `name`, `email`, `title`, `description`. Example payload:

  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "title": "My Post",
    "description": "Content of the post"
  }
  ```

- PUT /api/blogs/:id  
  Update fields on a blog. Only provided fields are updated.

- DELETE /api/blogs/:id  
  Remove a blog by id.

Examples

- Create:

  ```sh
  curl -X POST http://localhost:5050/api/blogs \
    -H "Content-Type: application/json" \
    -d '{"name":"Jane","email":"jane@example.com","title":"Post","description":"Content"}'
  ```

- Fetch all:
  ```sh
  curl http://localhost:5050/api/blogs
  ```

Troubleshooting

- Check that `MONGODB_URI` in [.env](.env) is valid.
- Confirm MongoDB is reachable (server logs via [`connectDB`](server.js)).

License

- MIT
