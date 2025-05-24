سرور سوکت جهانی
یک سرور ارتباطی بلادرنگ سبک ساخته‌شده با Node.js و Socket.IO، طراحی‌شده برای مدیریت اتصالات WebSocket برای ارسال پیام مبتنی بر اتاق‌ها. این سرور همچنین یک نقطه پایانی HTTP برای ارسال پیام به اتاق‌های خاص ارائه می‌دهد. سرور با استفاده از Docker کانتینری شده است تا استقرار آن آسان باشد.
ویژگی‌ها

ارتباط بلادرنگ: استفاده از اتصالات WebSocket از طریق Socket.IO برای ارسال پیام فوری.
پیام‌رسانی مبتنی بر اتاق: سازمان‌دهی کلاینت‌ها در اتاق‌ها برای ارتباط هدفمند.
نقطه پایانی HTTP: ارسال پیام به اتاق‌ها از طریق یک API RESTful.
پشتیبانی از CORS: تنظیمات Cross-Origin Resource Sharing برای اتصالات امن کلاینت.
پشتیبانی از Docker: استقرار آسان سرور با استفاده از Docker.

پیش‌نیازها

Node.js (نسخه ۱۴ یا بالاتر)
Docker (اختیاری، برای استقرار کانتینری)
npm (همراه با Node.js ارائه می‌شود)

نصب
کلون کردن مخزن
git clone https://github.com/soheylfarzane/socket-server.git
cd socket-server

نصب وابستگی‌ها
npm install

اجرای سرور
node index.js

سرور به‌صورت پیش‌فرض روی http://localhost:3000 اجرا می‌شود.
راه‌اندازی با Docker
ساخت تصویر Docker
docker build -t universal-socket-server .

اجرای کانتینر Docker
docker run -d -p 3000:3000 universal-socket-server

این دستور پورت 3000 روی هاست را به کانتینر نگاشت می‌کند.
استفاده
اتصال کلاینت
از کلاینت Socket.IO برای اتصال به سرور و تعامل با اتاق‌ها استفاده کنید.
import { io } from "socket.io-client";

const socket = io("ws://YOUR_SERVER_IP:3000", { transports: ['websocket'] });

// پیوستن به یک اتاق
socket.emit("joinRoom", { room: "myRoom" });

// گوش دادن به رویدادها
socket.on("receiveEvent", (data) => {
  console.log("پیام دریافتی:", data);
});

// ارسال یک رویداد
socket.emit("sendEvent", {
  room: "myRoom",
  action: "custom_action",
  payload: { foo: "bar" }
});

ارسال پیام از طریق HTTP
می‌توانید با استفاده از نقطه پایانی /push پیام‌ها را به یک اتاق ارسال کنید.
curl -X POST http://localhost:3000/push \
  -H "Content-Type: application/json" \
  -d '{"room":"myRoom","action":"new_message","payload":{"text":"سلام"}}'

نمونه Payload
{
  "room": "myRoom",
  "action": "new_message",
  "payload": { "text": "سلام" }
}

پیکربندی
پیکربندی سرور
سرور با تنظیمات CORS برای اجازه دادن به اتصالات از مبدأهای خاص پیکربندی شده است. در صورت نیاز، تنظیمات CORS را در فایل index.js به‌روزرسانی کنید:
const io = new Server(httpServer, {
  cors: {
    origin: "https://yourdomain.com",
    methods: ["GET", "POST"]
  }
});

مقدار "https://yourdomain.com" را با دامنه کلاینت خود جایگزین کنید یا برای توسعه از "*" استفاده کنید (برای محیط تولید توصیه نمی‌شود).
متغیرهای محیطی
برای تنظیم پورت سرور (اختیاری)، یک فایل .env ایجاد کنید:
PORT=3000

ساختار پروژه
.
├── index.js              # فایل اصلی سرور
├── package.json          # وابستگی‌ها و اسکریپت‌های پروژه
├── Dockerfile            # پیکربندی Docker
├── README.md             # مستندات پروژه

مشارکت
مشارکت‌ها استقبال می‌شوند! لطفاً این مراحل را دنبال کنید:

مخزن را فورک کنید.
یک شاخه جدید بسازید (git checkout -b feature/your-feature).
تغییرات خود را کامیت کنید (git commit -m 'Add your feature').
شاخه را به مخزن خود پوش کنید (git push origin feature/your-feature).
یک درخواست کشش (Pull Request) باز کنید.

مجوز
این پروژه تحت مجوز MIT منتشر شده است. برای جزئیات، فایل LICENSE را ببینید.
تماس
برای سؤالات یا پشتیبانی، لطفاً یک مسئله (issue) در مخزن GitHub باز کنید.
