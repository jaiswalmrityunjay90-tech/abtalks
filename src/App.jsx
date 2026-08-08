import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

const challenges = [
  { day: 1, title: "Personal Portfolio", status: "completed" },
  { day: 2, title: "Landing Page", status: "completed" },
  { day: 3, title: "Todo Application", status: "completed" },
  { day: 4, title: "Calculator", status: "completed" },
  { day: 5, title: "Quiz Application", status: "completed" },
  { day: 6, title: "Weather App", status: "completed" },
  { day: 7, title: "Expense Tracker", status: "completed" },
  { day: 8, title: "Movie Search", status: "completed" },
  { day: 9, title: "GitHub Profile", status: "completed" },
  { day: 10, title: "Notes Application", status: "completed" },
  { day: 11, title: "Responsive Blog", status: "completed" },
  { day: 12, title: "Weather Dashboard", status: "today" },
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">A</span>
        ABTalks
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <Link to="/dashboard" className="nav-button">
        Dashboard
      </Link>
    </nav>
  );
}

function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/">
        <span>⌂</span>
        Home
      </Link>

      <Link to="/dashboard">
        <span>▦</span>
        Progress
      </Link>

      <Link to="/day/12">
        <span>◎</span>
        Challenge
      </Link>

      <Link to="/dashboard">
        <span>♙</span>
        Profile
      </Link>
    </div>
  );
}

function Landing() {
  return (
    <div>
      <Navbar />

      <main className="landing">
        <section className="hero">
          <div className="hero-badge">
            <span className="live-dot"></span>
            60-DAY CODING CHALLENGE
          </div>

          <h1>
            Build in public.
            <br />
            <span>Get better every day.</span>
          </h1>

          <p className="hero-text">
            ABTalks helps Indian college students build real projects,
            maintain consistency, and create visible proof of their skills.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard" className="primary-button">
              Start My Journey <span>→</span>
            </Link>

            <a href="#how-it-works" className="secondary-button">
              How it works
            </a>
          </div>

          <div className="hero-note">
            <span>🔥</span>
            Build something every day for 60 days.
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <strong>60</strong>
            <span>DAYS</span>
          </div>

          <div className="stat-card">
            <strong>60+</strong>
            <span>BUILDS</span>
          </div>

          <div className="stat-card">
            <strong>2</strong>
            <span>PROOFS</span>
          </div>

          <div className="stat-card">
            <strong>1</strong>
            <span>JOURNEY</span>
          </div>
        </section>

        <section className="journey-preview">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR JOURNEY</span>
              <h2>60 days. One visible journey.</h2>
            </div>
            <span className="progress-label">20%</span>
          </div>

          <div className="progress-bar">
            <div style={{ width: "20%" }}></div>
          </div>

          <div className="day-grid">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;

              return (
                <div
                  key={day}
                  className={`day-box ${
                    day <= 11
                      ? "done"
                      : day === 12
                      ? "current"
                      : ""
                  }`}
                >
                  {day <= 11 ? "✓" : day}
                </div>
              );
            })}
          </div>

          <div className="journey-footer">
            <span>
              <i className="legend done-legend"></i> Completed
            </span>

            <span>
              <i className="legend current-legend"></i> Today
            </span>

            <span>
              <i className="legend upcoming-legend"></i> Upcoming
            </span>
          </div>
        </section>

        <section id="how-it-works" className="how-section">
          <div className="section-title">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Simple enough to actually stick with.</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div>
                <h3>Pick a track</h3>
                <p>Choose a learning path that matches your goals.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <div>
                <h3>Build every day</h3>
                <p>Complete one practical coding challenge each day.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <div>
                <h3>Submit proof</h3>
                <p>Share your GitHub work and LinkedIn post.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <div>
                <h3>Grow your portfolio</h3>
                <p>Turn 60 days of consistency into visible proof.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <div>
              <span className="eyebrow">CONSISTENCY</span>
              <h2>Don't break the chain.</h2>
              <p>
                Your streak turns daily coding into a habit. Every completed
                challenge moves you one step closer to Day 60.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <div>
              <span className="eyebrow">VISIBILITY</span>
              <h2>Make your work visible.</h2>
              <p>
                Every challenge gives you something real to add to your
                GitHub and share with your network.
              </p>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <span className="eyebrow">READY?</span>
          <h2>Your next 60 days can look different.</h2>
          <p>Start with one build. Then come back tomorrow.</p>

          <Link to="/dashboard" className="primary-button">
            Start Challenge →
          </Link>
        </section>
      </main>

      <footer>
        <div className="logo">
          <span className="logo-mark">A</span>
          ABTalks
        </div>
        <p>Build. Share. Grow.</p>
      </footer>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard">
        <section className="dashboard-header">
          <div>
            <span className="eyebrow">STUDENT DASHBOARD</span>
            <h1>Good morning, Student 👋</h1>
            <p>Keep your momentum going.</p>
          </div>

          <div className="avatar">S</div>
        </section>

        <section className="streak-card">
          <div>
            <span className="eyebrow">CURRENT STREAK</span>
            <div className="streak-number">
              11 <span>days</span>
            </div>
            <p>🔥 You're on a roll. Don't stop now.</p>
          </div>

          <div className="fire">🔥</div>
        </section>

        <section className="today-card">
          <div className="today-top">
            <span className="day-pill">DAY 12</span>
            <span className="time">~90 MIN</span>
          </div>

          <h2>Weather Dashboard</h2>

          <p>
            Build a responsive weather dashboard that displays weather
            information for a searched city.
          </p>

          <div className="task-tags">
            <span>JavaScript</span>
            <span>API</span>
            <span>Responsive</span>
          </div>

          <Link to="/day/12" className="primary-button full-button">
            Start Today's Challenge →
          </Link>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR PROGRESS</span>
              <h2>12 / 60 days</h2>
            </div>

            <strong>20%</strong>
          </div>

          <div className="progress-bar large">
            <div style={{ width: "20%" }}></div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ACHIEVEMENTS</span>
              <h2>Keep collecting.</h2>
            </div>
          </div>

          <div className="achievements">
            <div className="achievement">
              <span>🔥</span>
              <div>
                <strong>First Week</strong>
                <small>7 days completed</small>
              </div>
              <b>✓</b>
            </div>

            <div className="achievement">
              <span>💻</span>
              <div>
                <strong>10 Builds</strong>
                <small>10 challenges completed</small>
              </div>
              <b>✓</b>
            </div>

            <div className="achievement locked">
              <span>🚀</span>
              <div>
                <strong>Halfway There</strong>
                <small>Complete Day 30</small>
              </div>
              <b>🔒</b>
            </div>
          </div>
        </section>

        <section className="recovery-card">
          <span>💡</span>
          <div>
            <strong>Missed a day?</strong>
            <p>
              Don't let one missed day define your journey. Come back today
              and keep building.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function ChallengeDay() {
  return (
    <div className="app-page">
      <Navbar />

      <main className="challenge-page">
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>

        <section className="challenge-header">
          <span className="day-pill">DAY 12 / 60</span>
          <h1>Weather Dashboard</h1>
          <p>
            Build a responsive weather application that lets users search for
            a city and view its current weather.
          </p>

          <div className="challenge-meta">
            <span>⏱ ~90 min</span>
            <span>● Intermediate</span>
          </div>
        </section>

        <section className="task-section">
          <span className="eyebrow">TODAY'S TASK</span>
          <h2>Build a weather dashboard</h2>

          <p>
            Create a clean, responsive interface where users can search for a
            city and see useful weather information.
          </p>

          <div className="checklist">
            <div>
              <span>✓</span>
              Search for a city
            </div>

            <div>
              <span>✓</span>
              Display current temperature
            </div>

            <div>
              <span>✓</span>
              Display weather condition
            </div>

            <div>
              <span>✓</span>
              Create responsive layout
            </div>

            <div>
              <span>✓</span>
              Add loading state
            </div>

            <div>
              <span>✓</span>
              Handle invalid cities
            </div>
          </div>
        </section>

        <section className="proof-section">
          <span className="eyebrow">PROOF OF WORK</span>
          <h2>Show what you built.</h2>

          <label>GitHub Repository</label>
          <input
            type="text"
            placeholder="https://github.com/username/project"
          />

          <label>LinkedIn Post</label>
          <input
            type="text"
            placeholder="https://linkedin.com/posts/..."
          />

          <button className="primary-button submit-button">
            Submit Day 12 →
          </button>
        </section>

        <section className="completion-card">
          <div className="completion-icon">🔥</div>
          <div>
            <strong>Complete today's challenge</strong>
            <p>
              Submit your proof of work to continue your streak and unlock
              the next day.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/day/12" element={<ChallengeDay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;