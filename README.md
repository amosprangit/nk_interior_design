# Interior Studio (MERN)

React (Vite) + Express + MongoDB (Mongoose).

## Run locally

Requirements: Node.js 18+ (MongoDB is optional, see below).

```bash
npm run install:all     # installs root, server and client dependencies
npm run seed            # optional: loads sample projects into MongoDB
npm run dev             # starts API (5000) and website (5173)
```

Open http://localhost:5173

If MongoDB isn't running, the API automatically serves the built-in sample data (server/data/projects.js),
so the site works straight away. `GET http://localhost:5000/api/health` tells you which mode is active.

## Flow
1. Loader animation with logo (client/src/components/Loader.jsx)
2. Landing: Home / About / India / Global over a full-screen photo
3. Section page: Residential / Commercial over a photo
4. Projects page: carousel (images + videos) for each project, from the API

## API
| Method | Endpoint | Notes |
|---|---|---|
| GET | /api/projects | `?category=residential\|commercial&region=india\|global` |
| GET | /api/projects/residential | optional `?region=` |
| GET | /api/projects/commercial | optional `?region=` |
| GET | /api/projects/:slugOrId | one project |
| POST / PUT / DELETE | /api/projects | header `x-admin-key` = ADMIN_KEY in server/.env (MongoDB required) |

Project shape:
```json
{ "title": "", "slug": "", "category": "residential", "region": "india", "location": "", "year": 2025, "area": "",
  "description": "", "cover": "",
  "media": [ { "type": "image", "url": "" }, { "type": "video", "url": "", "poster": "" } ] }
```

## Customise
- Brand name, background photos and tabs: client/src/config.js
- Logo in the loader: the SVG in client/src/components/Loader.jsx
- Your own projects: edit server/data/projects.js then `npm run seed`, or POST to the API
- Sample images load from Unsplash and videos from public sample URLs; replace them with your own media.
- Production: `npm run build`, then serve client/dist and run `npm start --prefix server`
  (set VITE_API_URL in client/.env if the API is on another domain).
