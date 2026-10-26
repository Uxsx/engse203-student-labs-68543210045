import { Link } from 'react-router-dom';

const STATUS_ACTIONS = [
  { status: 'pending', label: 'รอดำเนินการ' },
  { status: 'in-progress', label: 'กำลังดำเนินการ' },
  { status: 'completed', label: 'เสร็จสิ้น' },
];

function RequestCard({ request, isStaff, onDeleteRequest, onChangeStatus }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>
      </div>
      {isStaff && (
        <div className="card-actions" data-testid={`staff-actions-${request.id}`}>
          {STATUS_ACTIONS.filter((a) => a.status !== request.status).map((a) => (
            <button
              key={a.status}
              className="button secondary"
              type="button"
              data-testid={`status-${a.status}-${request.id}`}
              onClick={() => onChangeStatus(request.id, a.status)}
              aria-label={`เปลี่ยนสถานะ ${request.id} เป็น ${a.label}`}
            >
              {a.label}
            </button>
          ))}
          <button className="button danger" type="button" onClick={() => onDeleteRequest(request.id)} aria-label={`ลบคำร้อง ${request.id}`}>
            ลบ
          </button>
        </div>
      )}
    </article>
  );
}

export default RequestCard;
