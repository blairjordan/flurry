import React from "react"
import logo from "/assets/logo.png"

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          position: "relative",
          marginBottom: "20px",
          animation: "spin 2s linear infinite",
        }}
      >
        <img src={logo} alt="Flurry Logo" />
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="pixel-font" style={{ color: "white", fontSize: "24px" }}>
        {message}
      </div>
    </div>
  )
}
