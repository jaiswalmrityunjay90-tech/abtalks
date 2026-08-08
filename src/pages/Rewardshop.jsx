import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const rewards = [
  {
    id: 1,
    icon: "🎨",
    title: "Profile Theme",
    description: "Unlock a special ABTalks profile theme.",
    cost: 200,
  },
  {
    id: 2,
    icon: "🔥",
    title: "Streak Badge",
    description: "Show everyone that you are maintaining your streak.",
    cost: 300,
  },
  {
    id: 3,
    icon: "⚡",
    title: "Pro Builder Badge",
    description: "A special badge for consistent builders.",
    cost: 500,
  },
  {
    id: 4,
    icon: "🚀",
    title: "Elite Builder",
    description: "Unlock the Elite Builder reward.",
    cost: 750,
  },
  {
    id: 5,
    icon: "👑",
    title: "ABTalks Champion",
    description: "The ultimate 60-day challenge reward.",
    cost: 1000,
  },
];

function RewardShop() {
  const { user, buyReward } = useUser();
  const [toastMessage, setToastMessage] = useState("");

  const handleBuy = (reward) => {
    const res = buyReward(reward);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="app-page">
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

      <main className="reward-shop">
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>

        {toastMessage && (
          <div className="reward-toast-alert" style={{
            margin: "15px 0",
            padding: "14px 20px",
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid var(--purple)",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "600"
          }}>
            {toastMessage}
          </div>
        )}

        <section className="shop-header">
          <span className="eyebrow">ABTALKS REWARD SHOP</span>

          <h1>Spend your hard-earned coins. 🪙</h1>

          <p>
            Complete challenges, earn AB Coins and unlock exclusive
            rewards.
          </p>

          <div className="coin-balance">
            <span>🪙</span>
            <div>
              <small>YOUR BALANCE</small>
              <strong>{user.coins} AB Coins</strong>
            </div>
          </div>
        </section>

        <section className="reward-grid">
          {rewards.map((reward) => {
            const unlocked = user.unlockedRewards?.includes(reward.id);
            const canAfford = user.coins >= reward.cost;

            return (
              <div
                className={`shop-reward-card ${unlocked ? "unlocked" : ""}`}
                key={reward.id}
              >
                <div className="shop-reward-icon">
                  {reward.icon}
                </div>

                <div className="shop-reward-content">
                  <h2>{reward.title}</h2>

                  <p>{reward.description}</p>

                  <div className="reward-price">
                    <span>🪙 {reward.cost}</span>
                  </div>

                  <button
                    className={`reward-buy-button ${
                      unlocked
                        ? "reward-unlocked"
                        : !canAfford
                        ? "reward-disabled"
                        : ""
                    }`}
                    onClick={() => handleBuy(reward)}
                    disabled={unlocked || !canAfford}
                  >
                    {unlocked
                      ? "✓ Unlocked"
                      : !canAfford
                      ? "Not Enough Coins"
                      : "Unlock Reward"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <section className="shop-tip">
          <span>💡</span>

          <div>
            <strong>How to earn more coins?</strong>

            <p>
              Complete daily challenges and submit your proof of work.
              Every completed challenge gives you AB Coins.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RewardShop;