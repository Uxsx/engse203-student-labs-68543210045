# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: TODO
- รหัสนักศึกษา: TODO
- Section: TODO

## URLs

- Repository: TODO
- Pull Request: TODO
- GitHub Pages: TODO

## Component Tree

```text
TODO: วาด App → child components และระบุ state owner
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

TODO: อธิบายว่าใคร owns requests/filter/form state, props ไหลลงตรงไหน และ callback ไหลกลับตรงไหน

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงรายการคำร้องเริ่มต้น 3 รายการ และ Summary ถูกต้อง | Pass |
| TC-02 Controlled input | พิมพ์ข้อความได้ตามปกติ ค่าในช่อง Input เปลี่ยนแปลงตามที่พิมพ์ | Pass |
| TC-03 Invalid | ขึ้นข้อความ Error สีแดงใต้ช่องที่ไม่ได้กรอก และกรอบเปลี่ยนเป็นสีแดง | Pass |
| TC-04 Valid add | มีการ์ดคำร้องใหม่เพิ่มขึ้นมาด้านบนสุด ฟอร์มถูกล้างข้อมูล และ Summary อัปเดต | Pass | 
| TC-05 Filter | รายการคำร้องแสดงเฉพาะสถานะที่เลือกเท่านั้น | Pass |
| TC-06 All | รายการคำร้องกลับมาแสดงครบทุกรายการ | Pass |
| TC-07 Empty | แสดงข้อความ "ไม่พบรายการคำร้องที่ค้นหา" | Pass |
| TC-08 Delete | การ์ดที่กดลบหายไปจากหน้าจอทันที และตัวเลข Summary ลดลง | Pass | 
| TC-09 Mobile | เลย์เอาต์เปลี่ยนจาก 2 คอลัมน์เป็น 1 คอลัมน์ หน้าจอไม่ล้น | Pass | 
| TC-10 Keyboard | มีกรอบสีน้ำเงิน (Focus-visible) ปรากฏรอบปุ่มและฟอร์มที่กำลังกด Tab | Pass | `evidence/tc10.png` |
| TC-11 Build | พิมพ์คำสั่งรันผ่าน สร้างโฟลเดอร์ `dist` สำเร็จโดยไม่มีข้อความ Error | Pass | `evidence/tc11.png` |
| TC-12 Pages | อัปโหลดขึ้น GitHub Pages สำเร็จ หน้าเว็บเปิดติดและใช้งานได้ปกติ | Pass | `evidence/tc12.png` |


## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”

