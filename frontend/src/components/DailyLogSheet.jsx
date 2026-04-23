const STATUS_Y = {
  off_duty: 189,
  sleeper: 207,
  driving: 226,
  on_duty: 246,
};

const GRID = {
  x0: 56,
  x1: 458,
};

function hourToX(dateValue) {
  const date = new Date(dateValue);
  const hours = date.getHours() + date.getMinutes() / 60;
  return GRID.x0 + ((GRID.x1 - GRID.x0) * hours) / 24;
}

function makeLogPath(activities) {
  if (!activities?.length) return "";

  let path = "";
  activities.forEach((activity, index) => {
    const startX = hourToX(activity.start);
    const endX = hourToX(activity.end);
    const y = STATUS_Y[activity.status] ?? STATUS_Y.off_duty;

    if (index === 0) {
      path += `M ${startX} ${y} `;
    } else {
      const previous = activities[index - 1];
      const previousEndX = hourToX(previous.end);
      const previousY = STATUS_Y[previous.status] ?? STATUS_Y.off_duty;
      path += `L ${previousEndX} ${previousY} L ${previousEndX} ${y} `;
    }

    path += `L ${endX} ${y} `;
  });

  return path;
}

function remarksText(remarks) {
  return remarks.slice(0, 8).map((remark) => `${remark.time} ${remark.location} - ${remark.note}`);
}

function monthDayYear(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return { month, day, year };
}

export default function DailyLogSheet({ day }) {
  const dateBits = monthDayYear(day.date);
  const path = makeLogPath(day.activities);
  const remarks = remarksText(day.remarks);

  return (
    <article className="log-card">
      <div className="log-card-header">
        <div>
          <small>Log day {day.day_index}</small>
          <h3>{day.date}</h3>
        </div>
        <div className="totals-inline">
          <span>{day.total_miles} mi</span>
          <span>{day.status_totals.driving} h driving</span>
        </div>
      </div>

      <div className="log-template">
        <img src="/blank-paper-log.png" alt="Blank driver daily log template" />
        <svg viewBox="0 0 536 522" className="log-overlay" preserveAspectRatio="none">
          <path d={path} fill="none" stroke="#1363df" strokeWidth="2.2" />

          <text x="166" y="22" className="log-text">{dateBits.month}</text>
          <text x="227" y="22" className="log-text">{dateBits.day}</text>
          <text x="282" y="22" className="log-text">{dateBits.year}</text>

          <text x="63" y="72" className="log-text-small">{day.form.from}</text>
          <text x="269" y="72" className="log-text-small">{day.form.to}</text>

          <text x="57" y="107" className="log-text-small">{day.total_miles}</text>
          <text x="146" y="107" className="log-text-small">{day.total_miles}</text>

          <text x="270" y="106" className="log-text-small">{day.form.carrier_name}</text>
          <text x="320" y="126" className="log-text-small">{day.form.home_terminal}</text>

          <text x="385" y="188" className="log-totals">{day.status_totals.off_duty}</text>
          <text x="385" y="207" className="log-totals">{day.status_totals.sleeper}</text>
          <text x="385" y="226" className="log-totals">{day.status_totals.driving}</text>
          <text x="385" y="246" className="log-totals">{day.status_totals.on_duty}</text>

          <text x="33" y="335" className="log-text-small">{day.form.shipping_document}</text>

          {remarks.map((line, index) => (
            <text key={`${line}-${index}`} x="121" y={380 + index * 15} className="log-remark">
              {line}
            </text>
          ))}
        </svg>
      </div>
    </article>
  );
}
