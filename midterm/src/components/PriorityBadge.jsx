function PriorityBadge({ priority }) {
  const isUrgent = priority === 'urgent';
  
  return (
    <span className={`badge ${isUrgent ? 'danger' : ''}`}>
      {isUrgent ? 'เร่งด่วน' : 'ปกติ'}
    </span>
  );
}

export default PriorityBadge;