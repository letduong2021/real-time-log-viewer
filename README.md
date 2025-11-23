# Real-Time Log Viewer

## Project Description

**Real-Time Log Viewer** is a **web-based log tailing tool**, inspired by the `tail -f` command. It streams log messages in real time from a mock server to a browser-based client interface.

The project consists of two main components:

1. **Server:** A Node.js WebSocket server that generates and broadcasts log messages continuously.
2. **Client:** A React + Vite frontend that connects to the server via WebSocket and displays incoming logs live, providing a real-time log viewing experience.

This tool is ideal for simulating real-time log monitoring in a web environment, without relying on a terminal.

---

## Features

* Real-time streaming of logs from server to client.
* Browser-based UI for live log visualization.
* Dockerized setup for quick deployment.
* Configurable WebSocket URL via environment variables.

---

## Prerequisites

* [Docker](https://www.docker.com/) and Docker Compose installed.

---

## Running Locally with Docker Compose

1. Clone the repository:

```bash
git clone <repository-url>
cd real-time-log-viewer
```

2. Build and start the containers:

```bash
docker compose up --build
```

3. Access the application in your browser:

* **Client (frontend):** [http://localhost:3000](http://localhost:3000)
* **Server (WebSocket):** Port `8080` for client connections

4. To stop the containers:

```bash
docker compose down
```

---

## Project Structure

```
real-time-log-viewer/
├─ .github/                 # GitHub workflows
│  └─ workflows/            # CI/CD workflow files
│     └─ ci.yml
├─ .git/                    # Git hooks
│  └─ hooks/                # pre-commit hooks
├─ client/                  # React frontend
│  ├─ node_modules/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ styles.css
│  ├─ .eslintrc.json
│  ├─ Dockerfile
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  └─ vite.config.js
├─ server/                  # Node.js WebSocket server
│  ├─ node_modules/
│  ├─ .eslintrc.json
│  ├─ Dockerfile
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ README.md
└─ docker-compose.yml
```

---

## Environment Variables

* `VITE_WS_URL` — WebSocket URL for the client to connect to the server (default: `ws://server:8080`).

  * Configured in `docker-compose.yml` under the client service.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to branch (`git push origin feature-name`).
5. Open a pull request.

---
