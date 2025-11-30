import React from 'react'
import "./LoaderStyle.css"

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div className="loader"></div>
    </div>
  )
}
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default Loader