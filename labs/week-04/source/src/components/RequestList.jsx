import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest }) {
  // LAB4-R11: เพิ่ม empty state
  if (requests.length === 0) {
    return (
      <div className="request-list-empty" style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
        <p>ไม่พบรายการคำร้องที่ค้นหา</p>
      </div>
    );
  }

  return (
    <div className="request-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;