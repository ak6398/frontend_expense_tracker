import React from "react";

const Index = () => {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      padding: "40px 0"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: 36,
        maxWidth: 600,
        width: "90%",
        textAlign: "center"
      }}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Expense Tracker" style={{ width: 90, marginBottom: 18 }} />
        <h1 style={{ color: "#4f46e5", fontWeight: 700, marginBottom: 12 }}>Welcome to Daily Expense Tracker</h1>
        <p style={{ fontSize: 18, color: "#374151", marginBottom: 24 }}>
          Take control of your finances with a simple, beautiful, and powerful expense tracker.
        </p>
        <ul style={{ textAlign: "left", margin: "0 auto 24px", maxWidth: 420, color: "#6366f1", fontSize: 16, lineHeight: 1.7 }}>
          <li>Add, edit, and delete your daily expenses</li>
          <li> Secure signup and login</li>
          <li> Fast, responsive, and easy to use</li>
        </ul>
        <p style={{ color: "#6b7280", fontSize: 15 }}>
          Built with <strong>React</strong> & <strong>Django</strong> for a seamless experience.<br/>
          Start tracking your expenses today!
        </p>
      </div>
    </div>
  );
};

export default Index;
