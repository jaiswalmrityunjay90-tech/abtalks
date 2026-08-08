import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NameSetup() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("abtalks_user_name");

    if (savedName) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleContinue = () => {
    const cleanName = name.trim();

    if (!cleanName) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem("abtalks_user_name", cleanName);
    navigate("/dashboard");
  };

  return (
    <main className="name-setup">
      <div className="name-card">
        <div className="logo">
          <span className="logo-mark">A</span>
          ABTalks
        </div>

        <span className="eyebrow">WELCOME TO ABTALKS</span>

        <h1>Let's get started 👋</h1>

        <p>
          Enter your name to personalize your 60-day coding journey.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleContinue();
            }
          }}
        />

        <button
          className="primary-button"
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>
    </main>
  );
}

export default NameSetup;