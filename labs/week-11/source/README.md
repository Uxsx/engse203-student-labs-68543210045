# Campus Service — Full-Stack (Week 11)

ระบบจัดการคำร้องบริการภายในมหาวิทยาลัย พัฒนาด้วย React, Express และ SQLite
สัปดาห์นี้นำระบบจาก Week 10 มาปรับให้กำหนดค่าผ่าน environment variables,
ตรวจสถานะ API/ฐานข้อมูล, จัดการ error และเสิร์ฟ frontend กับ API ผ่านพอร์ตเดียวใน production

## สถาปัตยกรรม 3 ชั้น

```text
ผู้ใช้ → React (frontend/) → Express API (api/src/) → SQLite (api/data/)
```

| ชั้น | หน้าที่ | ที่อยู่ในโปรเจกต์ |
|---|---|---|
| Frontend | แสดงรายการ ค้นหา และจัดการคำร้อง | `frontend/src/` |
| API | ตรวจคำขอ เรียก service และส่ง JSON | `api/src/` |
| Database | เก็บคำร้องและผู้ใช้ในตารางสัมพันธ์ | `api/data/campus.db` และ `schema.sql` |

การแยกชั้นทำให้เปลี่ยนหน้าจอหรือวิธีจัดเก็บข้อมูลได้โดยไม่ผูกทุกส่วนเข้าด้วยกัน
SQLite เหมาะกับข้อมูลที่มีโครงสร้างและความสัมพันธ์ และเริ่มใช้งานได้โดยไม่ต้องดูแล
เซิร์ฟเวอร์ฐานข้อมูลแยก

## ข้อกำหนด

- Node.js `>=22.13.0`
- npm

## เริ่มใช้งานแบบ development

รันจาก `labs/week-11/source/`:

```bash
cd api
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

เปิด terminal อีกหน้าต่าง:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

เปิด frontend ตาม URL ที่ Vite แสดง (ปกติคือ `http://localhost:5173`)
และ API อยู่ที่ `http://localhost:3001`. ตรวจสถานะ API ได้ที่
`http://localhost:3001/api/health`.

## Environment variables

| Variable | ค่าเริ่มต้น | ใช้โดย |
|---|---|---|
| `NODE_ENV` | `development` | แยกพฤติกรรม development/production |
| `PORT` | `3001` | พอร์ตของ Express API |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ที่เรียก API ได้ใน development |
| `DB_FILE` | `api/data/campus.db` | path ของไฟล์ SQLite |
| `STATIC_DIR` | `frontend/dist` | โฟลเดอร์ frontend ที่ Express เสิร์ฟใน production |
| `VITE_API_BASE_URL` | ว่างใน production | URL ของ API; ว่างเพื่อเรียก same-origin |

คัดลอก `.env.example` เป็น `.env` ก่อนรัน API และอย่า commit `.env` หรือค่าลับ
ไฟล์ `.env.production` ของ frontend ตั้ง `VITE_API_BASE_URL` ว่างเพื่อให้เว็บ
เรียก `/api` บน origin เดียวกัน

## Build และรันแบบ production

จาก root ของ source:

```bash
npm run build
NODE_ENV=production npm start
```

เปิด `http://localhost:3001` เพื่อใช้เว็บและ API จากพอร์ตเดียวกัน
เส้นทาง `/api/health` รายงานสถานะบริการและฐานข้อมูล ส่วน path ของหน้าเว็บ
ให้ React Router จัดการ

## ตรวจสอบ

```bash
node --disable-warning=ExperimentalWarning check-week11.mjs --inclass
node --disable-warning=ExperimentalWarning check-week11.mjs
npm test --prefix api
```

## การตัดสินใจออกแบบ

- รวมค่า runtime ไว้ใน `api/src/config.js` เพื่อให้แต่ละ environment เปลี่ยนค่าได้
  โดยไม่แก้ source code
- health check ตรวจฐานข้อมูลจริงและตอบ `503` เมื่อฐานข้อมูลไม่พร้อม
- ใน production ใช้ Express เสิร์ฟไฟล์ build และส่ง `index.html` กลับสำหรับ route
  ของ frontend; route API ที่ไม่รู้จักยังตอบ `404`
- ใช้ SQLite เพราะข้อมูลคำร้องและผู้ใช้มีโครงสร้างและความสัมพันธ์ชัดเจน
  และโปรเจกต์ตัวอย่างนี้รันได้โดยไม่ต้องมีบริการฐานข้อมูลแยก

## สิ่งที่ต้องเพิ่มก่อนส่งงาน

- `DATABASE_CHOICES.md`: คำตอบของผู้ส่งต่อคำถามเรื่อง SQLite, MongoDB และ async
- `DEMO.md`: ลิงก์วิดีโอจริงและหลักฐานการสาธิต
- ภาพหน้าจอตามที่คู่มือ Take-Home กำหนด
