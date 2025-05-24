const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json()); // ✅ برای دریافت JSON در POST

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("✅ کاربر جدید وصل شد");

    socket.on("joinRoom", (data) => {
        socket.join(data.room);
        console.log(`📦 کاربر رفت داخل روم ${data.room}`);
    });

    socket.on("sendEvent", (data) => {
        console.log("📤 ارسال پیام از سوکت:", data);
        io.to(data.room).emit("receiveEvent", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ کاربر قطع شد");
    });
});

// ✅ مسیر HTTP برای دریافت پیام از PHP
app.post("/push", (req, res) => {
    const { room, action, payload } = req.body;

    if (!room || !action || !payload) {
        return res.status(400).json({ error: "اطلاعات ناقص است" });
    }

    const message = { room, action, payload };

    console.log("📥 دریافت پیام از PHP:", message);
    io.to(room).emit("receiveEvent", message);

    res.json({ success: true, message: "ارسال شد" });
});

httpServer.listen(3000, () => {
    console.log("🚀 سرور سوکت روی پورت 3000 اجرا شد");
});
