# سرور سوکت جهانی 🚀

سلام رفقا! این یه سرور سوکت خفن با Node.js و Socket.IO هست که می‌تونید تو پروژه‌هاتون برای ارتباط بلادرنگ (real-time) استفاده کنید. مثلاً چت زنده، اعلانات آنی، یا هر چیزی که نیاز به سرعت و اتصال دائم داره! یه API ساده هم داره که می‌تونید باهاش پیام به اتاق‌های خاص بفرستید. تازه، با Docker هم کانتینری شده که راحت راه‌اندازیش کنید.

## این چیه و به چه دردی می‌خوره؟
این پروژه یه سرور Socket.IOه که با Node.js کار می‌کنه. می‌تونید باهاش:
- کلاینت‌ها رو تو اتاق‌های مختلف گروه‌بندی کنید.
- پیام‌ها رو به‌صورت بلادرنگ بین کلاینت‌ها جابه‌جا کنید.
- از طریق HTTP پیام به اتاق‌ها بفرستید.
- با Docker سریع سرورش رو بالا بیارید.

برای هر پروژه‌ای که نیاز به ارتباط زنده داره، مثل اپ چت، بازی آنلاین، یا اعلانات، این سرور حسابی به کارتون میاد!!

## نیازمندی‌ها
- [Node.js](https://nodejs.org/) (نسخه ۱۴ یا بالاتر)
- [Docker](https://www.docker.com/) (اگه بخواید کانتینری راه بندازید)
- [npm](https://www.npmjs.com/) (که با Node.js میاد)

## چطور راه‌اندازیش کنم؟
1. **مخزن رو کلون کن**:
   ```bash
   git clone https://github.com/soheylfarzane/socket-server.git
   cd socket-server
   ```

2. **وابستگی‌ها رو نصب کن**:
   ```bash
   npm install
   ```

3. **سرور رو اجرا کن**:
   ```bash
   node index.js
   ```
   حالا سرور روی `http://localhost:3000` بالا میاد.

### با Docker چی؟
اگه حال و حوصله نصب مستقیم نداری، با Docker می‌تونی سریع راه بندازی:
1. **تصویر رو بساز**:
   ```bash
   docker build -t universal-socket-server .
   ```

2. **کانتینر رو اجرا کن**:
   ```bash
   docker run -d -p 3000:3000 universal-socket-server
   ```
   این پورت 3000 هاست رو به کانتینر وصل می‌کنه.

## چطور ازش استفاده کنم؟
### اتصال کلاینت
با کلاینت Socket.IO می‌تونی به سرور وصل بشی و با اتاق‌ها کار کنی:

```javascript
import { io } from "socket.io-client";

const socket = io("ws://YOUR_SERVER_IP:3000", { transports: ['websocket'] });

// به یه اتاق ملحق شو
socket.emit("joinRoom", { room: "myRoom" });

// پیام‌های دریافتی رو بگیر
socket.on("receiveEvent", (data) => {
  console.log("پیام رسید:", data);
});

// یه پیام بفرست
socket.emit("sendEvent", {
  room: "myRoom",
  action: "custom_action",
  payload: { foo: "bar" }
});
```

### ارسال پیام با HTTP
می‌تونی با یه درخواست HTTP به نقطه پایانی `/push` پیام بفرستی:

```bash
curl -X POST http://localhost:3000/push \
  -H "Content-Type: application/json" \
  -d '{"room":"myRoom","action":"new_message","payload":{"text":"سلام رفیق!"}}'
```

### نمونه پیام
```json
{
  "room": "myRoom",
  "action": "new_message",
  "payload": { "text": "سلام رفیق!" }
}
```

## تنظیمات
### تنظیم CORS
اگه بخوای کلاینت از یه دامنه خاص وصل بشه، تو فایل `index.js` اینو تنظیم کن:

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "https://yourdomain.com",
    methods: ["GET", "POST"]
  }
});
```

`https://yourdomain.com` رو با دامنه خودت عوض کن. برای تست می‌تونی از `"*"` استفاده کنی (ولی تو محیط تولید نذار!).

### متغیر محیطی
اگه بخوای پورت عوض کنی، یه فایل `.env` بساز و اینو توش بنویس:

```env
PORT=3000
```

## ساختار پروژه
```
.
├── index.js              # فایل اصلی سرور
├── package.json          # وابستگی‌ها و اسکریپت‌ها
├── Dockerfile            # تنظیمات Docker
├── README.md             # همین فایل که داری می‌خونی!
```

## 📄 آپدیت جدید
این سرور تازه بازنویسی شده و حالا خیلی منعطف‌تره! اگه بخواید می‌تونید برای هر نوع پروژه بلادرنگ ازش استفاده کنید. فقط کافیه تنظیمات اتاق و پیام‌ها رو به دلخواه خودتون تغییر بدید.

## 🚀 درباره من
من سهیلم، عاشق کدنویسی‌ام و همیشه دوست دارم چیزای باحالی که ساختم رو با شما به اشتراک بذارم. این پروژه هم یکی از هموناست که امیدوارم به کارتون بیاد!

## مشارکت
دوست داری کمک کنی؟ بیا وسط! 😎
1. مخزن رو فورک کن.
2. یه شاخه جدید بساز (`git checkout -b feature/your-cool-feature`).
3. تغییراتت رو کامیت کن (`git commit -m 'یه چیز خفن اضافه کردم'`).
4. شاخه‌ت رو پوش کن (`git push origin feature/your-cool-feature`).
5. یه Pull Request باز کن.

## مجوز
این پروژه تحت مجوز MITه. جزئیاتش رو تو فایل [LICENSE](LICENSE) ببین.

## تماس
اگه سؤالی داشتی یا چیزی گیر کرد، یه مسئله (issue) تو [مخزن GitHub](https://github.com/soheylfarzane/socket-server) باز کن. همیشه اون‌جام!
