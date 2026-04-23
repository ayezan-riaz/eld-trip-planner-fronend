function formatDateTime(value) {
  return new Date(value).toLocaleString();
}

export default function StopsTable({ stops }) {
  return (
    <div className="table-wrap">
      <table className="stops-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Type</th>
            <th>Label</th>
            <th>Location</th>
            <th>Start</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop, index) => (
            <tr key={`${stop.type}-${index}-${stop.start}`}>
              <td>{stop.day_index}</td>
              <td><span className={`pill pill-${stop.type}`}>{stop.type.replaceAll("_", " ")}</span></td>
              <td>{stop.label}</td>
              <td>{stop.location}</td>
              <td>{formatDateTime(stop.start)}</td>
              <td>{stop.duration_hours} h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
