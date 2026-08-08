import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import RewardShop from "./pages/RewardShop";
import NameSetup from "./NameSetup.jsx";
import { UserProvider, useUser } from "./context/UserContext";
import { challenges } from "./data/challenges";
import "./index.css";

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
        <Link to="/rewards">Rewards</Link>
      </div>

      <Link to="/dashboard" className="nav-button">
        Dashboard
      </Link>
    </nav>
  );
}

function BottomNav() {
  const { user } = useUser();
  const activeDay = Math.min(user.completedDays + 1, 60);

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

      <Link to={`/day/${activeDay}`}>
        <span>◎</span>
        Challenge
      </Link>

      <Link to="/rewards">
        <span>🎁</span>
        Rewards
      </Link>
    </div>
  );
}

function Landing() {
  const { user } = useUser();
  const currentProgress = Math.round((user.completedDays / 60) * 100);

  return (
    <div className="app-page">
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
            <Link to="/welcome" className="primary-button">
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
            <strong>XP</strong>
            <span>REWARDS</span>
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

            <span className="progress-label">{currentProgress}%</span>
          </div>

          <div className="progress-bar">
            <div style={{ width: `${currentProgress}%` }}></div>
          </div>

          <div className="day-grid">
            {Array.from({ length: 60 }, (_, i) => {
              const dayNum = i + 1;
              const isCompleted = user.completedChallenges.includes(dayNum);
              const isCurrent = dayNum === user.completedDays + 1;

              return (
                <Link
                  to={`/day/${dayNum}`}
                  key={dayNum}
                  className={`day-box ${
                    isCompleted ? "done" : isCurrent ? "current" : ""
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {isCompleted ? "✓" : dayNum}
                </Link>
              );
            })}
          </div>

          <div className="journey-footer">
            <span>
              <i className="legend done-legend"></i>
              Completed
            </span>

            <span>
              <i className="legend current-legend"></i>
              Active
            </span>

            <span>
              <i className="legend upcoming-legend"></i>
              Upcoming
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
                <h3>Earn rewards</h3>
                <p>Collect XP, coins, streaks and achievements.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-card">
            <div className="feature-icon">🔥</div>

            <span className="eyebrow">CONSISTENCY</span>

            <h2>Don't break the chain.</h2>

            <p>
              Your streak turns daily coding into a habit. Every completed
              challenge moves you one step closer to Day 60.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>

            <span className="eyebrow">REWARDS</span>

            <h2>Get rewarded for building.</h2>

            <p>
              Earn XP, AB Coins and achievements every time you complete a
              challenge.
            </p>
          </div>
        </section>

        <section className="final-cta">
          <span className="eyebrow">READY?</span>

          <h2>Your next 60 days can look different.</h2>

          <p>Start with one build. Then come back tomorrow.</p>

          <Link to="/welcome" className="primary-button">
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
  const { user, removeName } = useUser();
  const navigate = useNavigate();

  const progress = Math.round((user.completedDays / 60) * 100);
  const activeDayNum = Math.min(user.completedDays + 1, 60);
  const activeChallenge = challenges.find((c) => c.id === activeDayNum) || challenges[0];

  const nextAchievement =
    user.streak >= 30
      ? "🚀 Halfway There"
      : user.streak >= 15
      ? "⚡ Consistent Builder"
      : "🔥 15 Day Streak";

  const handleChangeName = () => {
    removeName();
    navigate("/welcome");
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard">
        <section className="dashboard-header">
          <div>
            <span className="eyebrow">STUDENT DASHBOARD</span>

            <h1>
              Good morning, {user.name || "Student"} 👋
            </h1>

            <p>Keep your momentum going.</p>

            <button className="change-name-button" onClick={handleChangeName}>
              Change Name
            </button>
          </div>

          <div className="avatar">
            {(user.name || "S").charAt(0).toUpperCase()}
          </div>
        </section>

        <section className="reward-overview">
          <div>
            <span className="eyebrow">YOUR REWARDS</span>

            <div className="reward-numbers">
              <div>
                <strong>⭐ {user.xp}</strong>
                <small>XP</small>
              </div>

              <div>
                <strong>🪙 {user.coins}</strong>
                <small>AB COINS</small>
              </div>
            </div>
          </div>

          <div className="reward-level">
            <span>LEVEL</span>
            <strong>{Math.floor(user.xp / 500) + 1}</strong>
          </div>
        </section>

        <section className="streak-card">
          <div>
            <span className="eyebrow">CURRENT STREAK</span>

            <div className="streak-number">
              {user.streak} <span>days</span>
            </div>

            <p>🔥 You're on a roll. Don't stop now.</p>
          </div>

          <div className="fire">🔥</div>
        </section>

        <Link to="/rewards" className="reward-shop-button">
          🎁 Open Reward Shop →
        </Link>

        <section className="today-card">
          <div className="today-top">
            <span className="day-pill">DAY {activeChallenge.id}</span>
            <span className="time">{activeChallenge.estimatedTime}</span>
          </div>

          <h2>{activeChallenge.title}</h2>

          <p>{activeChallenge.description}</p>

          <div className="task-tags">
            {activeChallenge.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <Link to={`/day/${activeChallenge.id}`} className="primary-button full-button">
            {user.completedChallenges.includes(activeChallenge.id)
              ? "View Completed Challenge →"
              : "Start Today's Challenge →"}
          </Link>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR PROGRESS</span>
              <h2>{user.completedDays} / 60 days</h2>
            </div>

            <strong>{progress}%</strong>
          </div>

          <div className="progress-bar large">
            <div style={{ width: `${progress}%` }}></div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">60-DAY JOURNEY MAP</span>
              <h2>Click any day to jump to its challenge</h2>
            </div>
          </div>

          <div className="day-grid">
            {Array.from({ length: 60 }, (_, i) => {
              const dayNum = i + 1;
              const isCompleted = user.completedChallenges.includes(dayNum);
              const isCurrent = dayNum === activeDayNum;

              return (
                <Link
                  to={`/day/${dayNum}`}
                  key={dayNum}
                  className={`day-box ${
                    isCompleted ? "done" : isCurrent ? "current" : ""
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {isCompleted ? "✓" : dayNum}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NEXT REWARD</span>
              <h2>{nextAchievement}</h2>
            </div>
          </div>

          <div className="next-reward-card">
            <div className="next-reward-icon">🏆</div>

            <div>
              <strong>Keep building every day</strong>

              <p>
                Complete more challenges to unlock exclusive ABTalks achievements.
              </p>
            </div>
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

            <div className={`achievement ${user.streak >= 15 ? "" : "locked"}`}>
              <span>⚡</span>

              <div>
                <strong>Consistent Builder</strong>

                <small>
                  {user.streak >= 15
                    ? "15 day streak completed"
                    : `${15 - user.streak} days remaining`}
                </small>
              </div>

              <b>{user.streak >= 15 ? "✓" : "🔒"}</b>
            </div>

            <div className={`achievement ${user.completedDays >= 30 ? "" : "locked"}`}>
              <span>🚀</span>

              <div>
                <strong>Halfway There</strong>

                <small>
                  {user.completedDays >= 30
                    ? "30 challenges completed"
                    : `${30 - user.completedDays} days remaining`}
                </small>
              </div>

              <b>{user.completedDays >= 30 ? "✓" : "🔒"}</b>
            </div>

            <div className={`achievement ${user.completedDays >= 60 ? "" : "locked"}`}>
              <span>👑</span>

              <div>
                <strong>ABTalks Champion</strong>

                <small>
                  {user.completedDays >= 60
                    ? "60 day challenge completed"
                    : `${60 - user.completedDays} days remaining`}
                </small>
              </div>

              <b>{user.completedDays >= 60 ? "✓" : "🔒"}</b>
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
  const { dayId } = useParams();
  const { user, completeChallenge } = useUser();

  const numDay = Number(dayId) || 1;
  const challenge = challenges.find((c) => c.id === numDay) || challenges[0];

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [submitted, setSubmitted] = useState(
    user.completedChallenges.includes(challenge.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!github.trim() || !linkedin.trim()) {
      alert("Please submit both GitHub and LinkedIn links.");
      return;
    }

    if (user.completedChallenges.includes(challenge.id)) {
      alert(`Day ${challenge.id} is already completed.`);
      return;
    }

    completeChallenge(challenge.id, challenge.xp, challenge.coins);
    setSubmitted(true);
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="challenge-page">
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>

        <section className="challenge-header">
          <span className="day-pill">DAY {challenge.id} / 60</span>

          <h1>{challenge.title}</h1>

          <p>{challenge.description}</p>

          <div className="challenge-meta">
            <span>⏱ {challenge.estimatedTime}</span>
            <span>● {challenge.difficulty}</span>
            <span>🏷️ {challenge.category}</span>
          </div>
        </section>

        <section className="task-section">
          <span className="eyebrow">TODAY'S TASK</span>

          <h2>Build requirements</h2>

          <p>
            Create a clean, responsive interface matching the specifications below:
          </p>

          <div className="checklist">
            {challenge.checklist.map((item, idx) => (
              <div key={idx}>
                <span>✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <form className="proof-section" onSubmit={handleSubmit}>
          <span className="eyebrow">PROOF OF WORK</span>

          <h2>Show what you built.</h2>

          <label>GitHub Repository</label>

          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/username/project"
            disabled={submitted}
            required
          />

          <label>LinkedIn Post</label>

          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/posts/..."
            disabled={submitted}
            required
          />

          <button
            type="submit"
            className="primary-button submit-button"
            disabled={submitted}
          >
            {submitted ? `✓ Day ${challenge.id} Completed` : `Submit Day ${challenge.id} →`}
          </button>
        </form>

        {submitted && (
          <section className="success-reward">
            <div className="success-icon">🎉</div>

            <div>
              <strong>Challenge completed!</strong>

              <p>
                You earned <b>+{challenge.xp} XP</b> and <b>+{challenge.coins} AB Coins</b>.
                Your streak is now {user.streak} days! 🔥
              </p>
            </div>
          </section>
        )}

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
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:dayId" element={<ChallengeDay />} />
          <Route path="/rewards" element={<RewardShop />} />
          <Route path="/welcome" element={<NameSetup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
