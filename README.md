# SchoolSearch

SchoolSearch is a full-stack web application that helps users find universities and scholarship opportunities worldwide based on their study interests, country of origin, and desired program type (Bachelors, Masters, PhD, Vocational). The project features a modern Next.js frontend, a FastAPI backend, and is fully containerized with Docker.

---

## Features

- 🔍 **Search** for schools by program, country, and degree type
- 🌍 **Country and program type selection** with a beautiful UI
- 🎓 **Detailed school cards** with info like tuition, language, scholarships, deadlines, and more
- ⚡ **FastAPI backend** with LLM-powered search and PostgreSQL support
- 🐳 **Dockerized** for easy local development and deployment

---

## Project Structure

```
schoolSearch/
  BE/           # FastAPI backend
    app/
      api/v1/   # API routes
      core/     # Config, LLM, etc.
      models/   # Database models
      schema/   # Pydantic schemas
      services/ # Business logic
    pyproject.toml
  fe/           # Next.js frontend
    src/
      app/      # Main app pages
      components/ui/ # UI components
      hooks/    # Custom React hooks
    package.json
  docker/       # Docker Compose and orchestration
  README.md
```

---

## Prerequisites

- Docker & Docker Compose
- (For local dev) Node.js 20+, Python 3.11+, PostgreSQL

---

## Quick Start (with Docker)

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd schoolSearch
   ```

2. **Set up environment variables:**
   - Create a `.env` file in the root with your OpenAI and Qdrant keys:
     ```
     OPENAI_API_KEY=your_openai_key
     QDRANT_URL=your_qdrant_url
     QDRANT_API_KEY=your_qdrant_api_key
     REDIS_URL=redis://localhost:6379/0
     ```

3. **Build and run all services:**
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```

4. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:1209/docs](http://localhost:1209/docs) (FastAPI docs)
   - Database: Postgres on port 5432

---

## Local Development

### Backend (FastAPI)
```bash
cd BE/
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --port 1209
```

### Frontend (Next.js)
```bash
cd fe/
npm install
npm run dev
```
- The frontend expects the backend at `http://localhost:1209/api/v1`

---

## API

- Main endpoint: `/api/v1/schools?query=...&origin=...&bach_or_mst=...`
- Returns a list of schools matching the search criteria.

---

## Customization

- **Add countries/program types:** Edit the arrays in `fe/src/app/page.tsx`
- **UI components:** Customize in `fe/src/components/ui/`
- **Backend logic:** See `BE/app/services/schl_services.py` and `BE/app/core/llm.py`

---

## Troubleshooting

- **500 errors:** Ensure your OpenAI, Qdrant, and Redis keys are set and valid.
- **LLM JSON errors:** The backend expects valid JSON from the LLM; see prompt in `BE/app/core/llm.py`.
- **Port issues:** Make sure ports in Docker, backend, and frontend configs match.
- **Redis errors:** Make sure Redis is running and `REDIS_URL` is set.

---

## Roadmap / Future Improvements

- **Redis integration:** For caching and faster repeated queries, improving performance and scalability.
- **Qdrant integration:** For advanced vector search and semantic retrieval, enabling smarter and more relevant school recommendations.

---

## License
