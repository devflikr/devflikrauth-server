import "./config";
import "./express";
import https from "https";

if (process.env.IS_HEALTH_CHECK_ENABLED) {
    setInterval(() => {
        console.log("⚔️  api @health", new Date().toLocaleString());
        https.get("https://devflikrauth.onrender.com/health");
    }, 540000);
}