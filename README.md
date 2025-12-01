# Real-Time Log Viewer Project

## Project Description

**Real-Time Log Viewer** is a web-based log tailing tool, similar to `tail -f`. It streams log messages in real time from a mock server to a browser-based client interface.

---

## Components
The project consists of two main components:
### 1. Server
A lightweight Node.js WebSocket server (built with the `ws` library) that continuously generates and broadcasts mock log events. Each log message is emitted at regular intervals and includes:

- Timestamp
- Level (`INFO`, `WARN`, `ERROR`)
- Message

### 2. Client
A React + Vite frontend application that connects to the WebSocket server and displays incoming logs in real time. Each log entry is color-coded based on severity and rendered in a scrolling log viewer.

---

## Features

- **Real-time log streaming** from the WebSocket server to the browser.
- **Color-coded log lines** based on severity (`INFO`, `WARN`, `ERROR`).
- **Intelligent auto-scrolling:**  
  Automatically scrolls only if the user is already at the bottom, preventing interruptions while reviewing older logs.
- **Playback controls:**  
  Includes **Pause/Resume** and **Clear** buttons to manage the log output.
- **Browser-based UI** for easy log visualization.
- **Dockerized setup** for simple and consistent deployment.
- **Configurable WebSocket URL** via environment variables for flexible integration.

---

## Prerequisites

* [Docker](https://www.docker.com/) and Docker Compose installed.

---

## Running Locally with Docker Compose

1. Clone the repository:

```bash
git clone https://github.com/letduong2021/real-time-log-viewer.git
cd real-time-log-viewer
```

2. Build and start the containers:

```bash
docker-compose up
```

3. Access the application in your browser:

* **Client (frontend):** [http://localhost:3000](http://localhost:3000)
* **Server (WebSocket):** Port `8080` for client connections

4. To stop the containers:

```bash
docker-compose down
```

---

## Project Structure

```
real-time-log-viewer/
├─ .github/                 # GitHub workflows
│  └─ workflows/            # CI/CD workflow files
│     └─ ci.yml
├─ client/                  # React frontend
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
│  ├─ .eslintrc.json
│  ├─ Dockerfile
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ README.md
└─ docker-compose.yml
```

---
