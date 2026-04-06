import React from "react";

export default function RequestButton({ fetchStatus }) {
  return (
    <button onClick={fetchStatus} style={{ marginTop: "10px" }}>
      Send Request to Load Balancer
    </button>
  );
}