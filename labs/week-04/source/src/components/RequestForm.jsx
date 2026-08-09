import { useState } from 'react';

function RequestForm({ onAddRequest }) {
  // สร้าง State สำหรับเก็บค่าจาก input
  const [formData, setFormData] = useState({
    requesterName: '',
    requestType: '',
    location: '',
    details: '',
    priority: 'normal'
  });
  
  // สร้าง State เก็บข้อผิดพลาด
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  // ฟังก์ชันกลางอัปเดต state เมื่อ input เปลี่ยน
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // ลบ error เมื่อผู้ใช้เริ่มพิมพ์แก้
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!formData.requesterName.trim()) newErrors.requesterName = 'กรุณาระบุชื่อ';
    if (!formData.requestType) newErrors.requestType = 'กรุณาเลือกประเภท';
    if (!formData.location.trim()) newErrors.location = 'กรุณาระบุสถานที่';
    if (!formData.details.trim()) newErrors.details = 'กรุณาระบุรายละเอียด';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFeedback('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // หากผ่าน ส่งข้อมูลไปยัง App.jsx
    onAddRequest(formData);
    
    // รีเซ็ตฟอร์ม
    setFormData({
      requesterName: '', requestType: '', location: '', details: '', priority: 'normal'
    });
    setFeedback('เพิ่มคำร้องสำเร็จ!');
    setTimeout(() => setFeedback(''), 3000);
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input 
            id="requesterName" name="requesterName" 
            value={formData.requesterName} onChange={handleChange} 
            aria-invalid={!!errors.requesterName}
          />
          <small className="error" id="requesterName-error">{errors.requesterName}</small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select 
            id="requestType" name="requestType" 
            value={formData.requestType} onChange={handleChange}
            aria-invalid={!!errors.requestType}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">{errors.requestType}</small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input 
            id="location" name="location" 
            value={formData.location} onChange={handleChange}
            aria-invalid={!!errors.location}
          />
          <small className="error" id="location-error">{errors.location}</small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea 
            id="details" name="details" rows="4" 
            value={formData.details} onChange={handleChange}
            aria-invalid={!!errors.details}
          ></textarea>
          <small className="error" id="details-error">{errors.details}</small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input type="radio" name="priority" value="normal" 
                   checked={formData.priority === 'normal'} onChange={handleChange} /> ปกติ
          </label>
          <label>
            <input type="radio" name="priority" value="urgent" 
                   checked={formData.priority === 'urgent'} onChange={handleChange} /> เร่งด่วน
          </label>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">{feedback}</p>
      </form>
    </section>
  );
}

export default RequestForm;