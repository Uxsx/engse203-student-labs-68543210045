# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: สิรภพ กันทวี
- รหัสนักศึกษา: 68543210045-9
- Section: 1

## URLs

- Repository: https://github.com/Uxsx/engse203-student-labs-68543210045
- Pull Request: 
- GitHub Pages: https://uxsx.github.io/engse203-student-labs-68543210045/labs/week-04/

## Component Tree

```text
App (State Owner: requests, statusFilter)
├── AppHeader
├── SummaryPanel
├── RequestForm (State Owner: formData, errors)
├── FilterBar
└── RequestList
    └── RequestCard
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

State Owner: App เป็น Component หลักที่ถือครอง State (Source of Truth) คือ requests (เก็บข้อมูลคำร้องทั้งหมด) และ statusFilter (เก็บค่าการกรองสถานะ) ส่วน RequestForm จะเป็นเจ้าของ Local State สำหรับจัดการฟอร์ม (formData และ errors)

Props (ไหลลง): ข้อมูลจะไหลจากบนลงล่าง โดย App จะคำนวณข้อมูลแล้วส่งลงไปให้ Component ลูกผ่าน Props เช่น ส่ง summary ให้ SummaryPanel, ส่งข้อมูลคำร้องที่ผ่านการกรองแล้วให้ RequestList, และส่ง statusFilter ให้ FilterBar

Callback (ไหลกลับ): เมื่อผู้ใช้โต้ตอบกับ Component ลูก (เช่น กดเพิ่มคำร้องหรือลบคำร้อง) Component ลูกจะเรียกใช้ฟังก์ชัน Callback ที่ได้รับมาจาก Props เพื่อส่งข้อมูลกลับขึ้นไปให้ App อัปเดต State เช่น RequestForm เรียก onAddRequest(newData) และ RequestCard เรียก onDeleteRequest(id)

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงรายการคำร้องเริ่มต้น 3 รายการ และ Summary ถูกต้อง | Pass | ![alt text](/labs/week-04/evidence/image.png) |
| TC-02 Controlled input | พิมพ์ข้อความได้ตามปกติ ค่าในช่อง Input เปลี่ยนแปลงตามที่พิมพ์ | Pass | ![alt text](/labs/week-04/evidence/image-1.png) |
| TC-03 Invalid | ขึ้นข้อความ Error สีแดงใต้ช่องที่ไม่ได้กรอก และกรอบเปลี่ยนเป็นสีแดง | Pass | ![alt text](/labs/week-04/evidence/image-2.png) |
| TC-04 Valid add | มีการ์ดคำร้องใหม่เพิ่มขึ้นมาด้านบนสุด ฟอร์มถูกล้างข้อมูล และ Summary อัปเดต | Pass | ![alt text](/labs/week-04/evidence/image-3.png) |
| TC-05 Filter | รายการคำร้องแสดงเฉพาะสถานะที่เลือกเท่านั้น | Pass | ![alt text](/labs/week-04/evidence/image-4.png) |
| TC-06 All | รายการคำร้องกลับมาแสดงครบทุกรายการ | Pass | ![alt text](/labs/week-04/evidence/image-5.png) |
| TC-07 Empty | แสดงข้อความ "ไม่พบรายการคำร้องที่ค้นหา" | Pass | ![alt text](/labs/week-04/evidence/image-5.png) |
| TC-08 Delete | การ์ดที่กดลบหายไปจากหน้าจอทันที และตัวเลข Summary ลดลง | Pass | ![alt text](/labs/week-04/evidence/image-6.png) |
| TC-09 Mobile | เลย์เอาต์เปลี่ยนจาก 2 คอลัมน์เป็น 1 คอลัมน์ หน้าจอไม่ล้น | Pass | ![alt text](/labs/week-04/evidence/image-7.png) |
| TC-10 Keyboard | มีกรอบสีน้ำเงิน (Focus-visible) ปรากฏรอบปุ่มและฟอร์มที่กำลังกด Tab | Pass | ![alt text](/labs/week-04/evidence/image-8.png) |
| TC-11 Build | พิมพ์คำสั่งรันผ่าน สร้างโฟลเดอร์ `dist` สำเร็จโดยไม่มีข้อความ Error | Pass | ![alt text](/labs/week-04/evidence/image-9.png) |
| TC-12 Pages | อัปโหลดขึ้น GitHub Pages สำเร็จ หน้าเว็บเปิดติดและใช้งานได้ปกติ | Pass | ![alt text](/labs/week-04/evidence/image-10.png) |


## Screenshots

- Desktop: ![alt text](/labs/week-04/evidence/desktop.png)
- Mobile 375px: ![alt text](/labs/week-04/evidence/mobile-375.png)
- Validation/empty state: ![alt text](/labs/week-04/evidence/verify-stats.png)

## Week 03 → Week 04 Reflection

การเขียน UI แบบ DOM Mutation ในสัปดาห์ที่ 3 ต้องใช้ JavaScript คอยเข้าถึงและอัปเดต HTML Elements ทีละจุดอย่างเจาะจง (เช่น document.getElementById) ซึ่งทำให้จัดการยาก โค้ดกระจัดกระจาย และเกิดบั๊กได้ง่ายเมื่อแอปพลิเคชันมีความซับซ้อนขึ้น ในขณะที่สัปดาห์นี้เปลี่ยนมาใช้ State-driven UI ของ React เราเพียงแค่กำหนด "ข้อมูล (State)" ให้ถูกต้อง เมื่อข้อมูลเปลี่ยน React จะจัดการวาด UI ใหม่ให้ตรงกับข้อมูลนั้นโดยอัตโนมัติ ทำให้การเขียนโค้ดเป็นระบบ คาดเดาผลลัพธ์ได้ง่าย และบำรุงรักษาได้ดีกว่ามาก

## AI / External Resource Disclosure
เครื่องมือที่ใช้: Google Gemini
Prompt/คำถามสำคัญ: ขอคำแนะนำในการปรับโค้ด App.jsx, RequestForm.jsx, RequestCard.jsx เพื่อเปลี่ยนจาก DOM-driven เป็น State-driven รวมถึงการเขียนตาราง Test Evidence และการอธิบาย Component Tree
ส่วนที่นำมาปรับ: โครงสร้างการจัดการ State และ Derived Data ใน App, การจัดการฟอร์มแบบ Controlled Input และการแปลงสถานะเป็น Badge ภาษาไทย
วิธีตรวจสอบความถูกต้อง: นำโค้ดมาปรับใช้ในโปรเจกต์ ทดสอบรันด้วย npm run dev และทดลองใช้งานระบบจริงตาม Test Case ต่าง ๆ เพื่อตรวจสอบการทำงาน การเปลี่ยนแปลงของหน้า UI และแจ้ง Error อย่างถูกต้อง