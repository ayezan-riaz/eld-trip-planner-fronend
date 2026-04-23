import { useState } from "react";
import { planTrip } from "./api";
import TripForm from "./components/TripForm";
import SummaryCards from "./components/SummaryCards";
import RouteMap from "./components/RouteMap";
import StopsTable from "./components/StopsTable";
import DailyLogSheet from "./components/DailyLogSheet";

const initialForm = {
  current_location: "",
  pickup_location: "",
  dropoff_location: "",
  current_cycle_used: 0,
};

export default function App() {
  const [formValues, setFormValues] = useState(initialForm);
  const [planning, setPlanning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setPlanning(true);
    setError("");

    try {
      const payload = await planTrip({
        current_location: formValues.current_location,
        pickup_location: formValues.pickup_location,
        dropoff_location: formValues.dropoff_location,
        current_cycle_used: Number(formValues.current_cycle_used),
      });
      setResult(payload);
    } catch (err) {
      setError(err.message || "Planning failed.");
      setResult(null);
    } finally {
      setPlanning(false);
    }
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Assessment Build</p>
          <h1>ELD Trip Planner</h1>
          <p className="hero-copy">
            Plan a HOS-aware trip, visualize the route, and generate paper-style daily log sheets.
          </p>
        </div>
        <div className="hero-badge">
          <span>70/8</span>
          <small>Property Carrier</small>
        </div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <h2>Trip inputs</h2>
          <TripForm
            values={formValues}
            setValues={setFormValues}
            onSubmit={handleSubmit}
            planning={planning}
          />
          {error ? <div className="error-box">{error}</div> : null}
          {result?.planning_assumptions ? (
            <div className="assumptions">
              <h3>Planner assumptions</h3>
              <ul>
                {result.planning_assumptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="panel">
          <h2>Route map</h2>
          <RouteMap
            route={result?.route}
            stops={result?.stops || []}
          />
        </section>
      </main>

      {result ? (
        <>
          <section className="panel">
            <h2>Trip summary</h2>
            <SummaryCards summary={result.summary} input={result.input} />
          </section>

          <section className="panel">
            <h2>Planned stops</h2>
            <StopsTable stops={result.stops} />
          </section>

          <section className="logs-section">
            <div className="logs-header">
              <h2>Daily log sheets</h2>
              <p>Generated from the planned activity timeline and drawn on a paper-log template.</p>
            </div>
            <div className="log-grid">
              {result.days.map((day) => (
                <DailyLogSheet key={day.date} day={day} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
