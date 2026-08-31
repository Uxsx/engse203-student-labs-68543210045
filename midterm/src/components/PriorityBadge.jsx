function PriorityBadge({ priority }) {
  switch (priority) {
    case 'urgent':
      return <span className="badge danger">เร่งด่วน</span>;
    case 'normal':
      return <span className="badge">ปกติ</span>;
    default:
      return <span className="badge">ไม่ระบุ</span>;
  }
}

export default PriorityBadge;