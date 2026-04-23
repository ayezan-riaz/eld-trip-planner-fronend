function formatNumber(value) {
  if (value === undefined || value === null) return "-";
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 });
}

export default function SummaryCards({ summary, input }) {
  const cards = [
    { label: "Distance", value: `${formatNumber(summary.distance_miles)} mi` },
    { label: "Drive hours", value: `${formatNumber(summary.drive_hours)} h` },
    { label: "Trip days", value: summary.trip_days },
    { label: "Fuel stops", value: summary.fuel_stops },
    { label: "Breaks", value: summary.breaks },
    { label: "34h restarts", value: summary.cycle_restarts },
  ];

  return (
    <>
      <div className="summary-header">
        <div className="summary-route">
          <div>
            <small>Current</small>
            <strong>{input.current_location}</strong>
          </div>
          <span>→</span>
          <div>
            <small>Pickup</small>
            <strong>{input.pickup_location}</strong>
          </div>
          <span>→</span>
          <div>
            <small>Dropoff</small>
            <strong>{input.dropoff_location}</strong>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <article className="metric-card" key={card.label}>
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </div>
    </>
  );
}
