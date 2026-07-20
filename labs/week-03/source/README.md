# ENGSE203 LAB 03 — Web_UI_Responsive

## ผู้จัดทำ

- ชื่อ-นามสกุล: สิรภพ กันทวี
- รหัสนักศึกษา: 68543210045-9
- ระบบปฏิบัติการที่ใช้: macOS / Windows
- GitHub Pages URL: https://uxsx.github.io/engse203-lab03-68543210045-9/

## วัตถุประสงค์ของงาน
สร้างหน้าเว็บ responsive สำหรับระบบจัดการงานขนาดย่อม ฝึก semantic HTML, CSS layout, mobile-first design, event และ form validation.
- 

## เครื่องมือที่ใช้
VS Code
Git Hub
- 

## วิธีติดตั้งและรัน

```bash
nvm use 22
npm install
npm run dev
```

## โครงสร้างไฟล์

```text
.
├── index.html
├── src/
│   ├── style.css
│   └── main.js
├── package.json
└── README.md
```

## หลักฐานผลลัพธ์

อธิบายผลลัพธ์ พร้อมแนบภาพหน้าจอหรือข้อความผลลัพธ์ตามที่ใบงานกำหนด
![โหมด Desktop พร้อมการแสดง Live Preview](/img/image.png)
![โหมด Mobile เรียงเป็น 1 คอลัมน์](/img/image-1.png)
![การแสดงข้อความ Error เมื่อกรอกไม่ครบ](/img/image-2.png)
![แสดงการ Preview](/img/image-3.png)
![การ Submit และแสดงข้อมูลที่เพิ่ม](/img/image-4.png)

## ปัญหาที่พบและวิธีแก้ไข

- ปัญหา:ชื่อแอตทริบิวต์ name ใน HTML ไม่ตรงกับตัวแปรที่พยายามดึงใน JavaScript
- วิธีแก้: ปรับแก้ไขชื่อ Key ในออบเจกต์ของ JavaScript ให้ตรงกับ name ใน HTML

## References & AI Assistance

- Source / Documentation:
- AI tool used: Google Gemini
- Used for: ช่วยตรวจสอบโครงสร้าง Semantic HTML และ Responsive CSS วิเคราะห์ Error ที่เกิดจากการอ้างอิงตัวแปรไม่ตรงกัน
- My adaptation:
