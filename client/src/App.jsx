import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function WebSocketLogger() {
    const [logs, setLogs] = useState([]);
    const [paused, setPaused] = useState(false);
    const [status, setStatus] = useState("Connecting...");

    const logContainerRef = useRef(null);
    const webSocketsRef = useRef(null);

    useEffect(() => {
        const webSocketsHost = import.meta.env.VITE_WS_HOST || "localhost";
        const webSocketsUrl = `ws://${webSocketsHost}:8080`;
        webSocketsRef.current = new WebSocket(webSocketsUrl);

        webSocketsRef.current.onopen = () => {
            console.log("WebSocket Connected");
            setStatus("Running");
        };

        webSocketsRef.current.onmessage = (event) => {
            if (paused) return;

            try {
                const log = JSON.parse(event.data);
                setLogs((prev) => [...prev, log]);
            } catch (e) {
                console.error("Invalid JSON received:", event.data);
            }
        };

        webSocketsRef.current.onerror = (err) => {
            console.error("WebSocket error:", err);
            setStatus("Error");
        };

        webSocketsRef.current.onclose = () => {
            setStatus("WebSocket disconnected");
        };

        return () => {
            webSocketsRef.current?.close();
        };
    }, [paused]);

    // Auto-scroll when new logs arrive when user is near bottom
    useEffect(() => {
        if (!paused && logContainerRef.current) {
            const container = logContainerRef.current;
            const isNearBottom =
                container.scrollHeight - container.scrollTop - container.clientHeight < 100;

            if (isNearBottom) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [logs, paused]);

    const clearLogs = () => setLogs([]);

    const formatTime = (timestamp) => {
        return timestamp.split("T")[1]?.split(".")[0] || "??:??:??";
    };

    return (
        <div className="log-viewer">
            <h1>Twin Peaks Log Viewer</h1>

            <div className="status-bar">
                Status:{" "}
                <strong>
                    {status === "WebSocket disconnected" || status === "WebSocket error"
                        ? status
                        : paused
                            ? "Paused"
                            : "Running"}
                </strong>
            </div>

            <div ref={logContainerRef} className="log-container">
                <div className="log-header">
                    <span className="col-time">Time</span>
                    <span className="col-level">Level</span>
                    <span className="col-message">Message</span>
                </div>

                {logs.map((log) => (
                    <div
                        key={log.timestamp}
                        className={`log-row level-${log.level.toUpperCase()}`}
                    >
                        <span className="col-time">{formatTime(log.timestamp)}</span>
                        <span className={`col-level`}>
                            {log.level.toUpperCase()}
                        </span>
                        <span className="col-message">{log.message}</span>
                    </div>
                ))}
            </div>

            <div className="controls">
                <button onClick={() => setPaused(true)} disabled={paused}>
                    Pause
                </button>
                <button onClick={() => setPaused(false)} disabled={!paused}>
                    Resume
                </button>
                <button onClick={clearLogs}>Clear</button>
            </div>
        </div>
    );
}