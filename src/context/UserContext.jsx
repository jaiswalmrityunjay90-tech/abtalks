/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY_USER = "abtalks-user";
const STORAGE_KEY_NAME = "abtalks_user_name";

const defaultUserState = {
  completedDays: 11,
  completedChallenges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  streak: 11,
  xp: 1200,
  coins: 850,
  unlockedRewards: [],
  name: "Student",
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY_USER);
    const savedName = localStorage.getItem(STORAGE_KEY_NAME);

    let parsed = defaultUserState;
    if (savedUser) {
      try {
        parsed = { ...defaultUserState, ...JSON.parse(savedUser) };
      } catch (err) {
        console.error("Failed to parse user data from localStorage", err);
      }
    }
    if (savedName) {
      parsed.name = savedName;
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    if (user.name) {
      localStorage.setItem(STORAGE_KEY_NAME, user.name);
    }
  }, [user]);

  const updateName = (newName) => {
    const clean = newName.trim();
    if (!clean) return;
    setUser((prev) => ({ ...prev, name: clean }));
    localStorage.setItem(STORAGE_KEY_NAME, clean);
  };

  const removeName = () => {
    localStorage.removeItem(STORAGE_KEY_NAME);
    setUser((prev) => ({ ...prev, name: "" }));
  };

  const completeChallenge = (dayId, xpReward = 175, coinReward = 100) => {
    const numDay = Number(dayId);
    if (user.completedChallenges.includes(numDay)) return false;

    setUser((prev) => {
      const nextCompletedDays = Math.max(prev.completedDays, numDay);
      return {
        ...prev,
        completedDays: nextCompletedDays,
        completedChallenges: [...prev.completedChallenges, numDay],
        streak: prev.streak + 1,
        xp: prev.xp + xpReward,
        coins: prev.coins + coinReward,
      };
    });
    return true;
  };

  const buyReward = (reward) => {
    if (user.unlockedRewards.includes(reward.id)) {
      return { success: false, message: "Reward already unlocked!" };
    }
    if (user.coins < reward.cost) {
      return { success: false, message: "Not enough AB Coins! 🪙" };
    }

    setUser((prev) => ({
      ...prev,
      coins: prev.coins - reward.cost,
      unlockedRewards: [...prev.unlockedRewards, reward.id],
    }));
    return { success: true, message: `Successfully unlocked ${reward.title}! 🎉` };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateName,
        removeName,
        completeChallenge,
        buyReward,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
