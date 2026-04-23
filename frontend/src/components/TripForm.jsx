export default function TripForm({ values, setValues, onSubmit, planning }) {
  function update(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <form className="trip-form" onSubmit={onSubmit}>
      <label>
        <span>Current location</span>
        <input
          type="text"
          required
          placeholder="Dallas, TX"
          value={values.current_location}
          onChange={(event) => update("current_location", event.target.value)}
        />
      </label>

      <label>
        <span>Pickup location</span>
        <input
          type="text"
          required
          placeholder="Nashville, TN"
          value={values.pickup_location}
          onChange={(event) => update("pickup_location", event.target.value)}
        />
      </label>

      <label>
        <span>Dropoff location</span>
        <input
          type="text"
          required
          placeholder="Atlanta, GA"
          value={values.dropoff_location}
          onChange={(event) => update("dropoff_location", event.target.value)}
        />
      </label>

      <label>
        <span>Current cycle used (hours)</span>
        <input
          type="number"
          min="0"
          max="70"
          step="0.25"
          required
          value={values.current_cycle_used}
          onChange={(event) => update("current_cycle_used", event.target.value)}
        />
      </label>

      <button type="submit" disabled={planning}>
        {planning ? "Planning..." : "Generate trip plan"}
      </button>
    </form>
  );
}
