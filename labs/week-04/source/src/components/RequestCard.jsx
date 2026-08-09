function RequestCard({ request, onDeleteRequest }) {
  const statusConfig = {
    'pending': { label: 'รอดำเนินการ', className: 'badge-pending' },
    'in-progress': { label: 'กำลังดำเนินการ', className: 'badge-in-progress' },
    'completed': { label: 'เสร็จสิ้น', className: 'badge-completed' }
  };

  const currentStatus = statusConfig[request.status] || statusConfig['pending'];

  return (
    <article className="request-card">
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <span className={`badge ${currentStatus.className}`}>
            {currentStatus.label}
          </span>
          {request.priority === 'urgent' && (
            <span className="badge" style={{ backgroundColor: '#feeceb', color: 'var(--danger)' }}>
              ด่วน
            </span>
          )}
        </div>

        <div className="request-id">{request.id}</div>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
      </div>
      
      <button 
        onClick={() => onDeleteRequest(request.id)} 
        aria-label={`ลบคำร้อง ${request.id}`}
      >
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;