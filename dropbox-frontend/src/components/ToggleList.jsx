import React from "react";
export default function ToggleList({ showDeleted, setShowDeleted }) {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{ marginTop: '0', marginBottom: '0' }}>{showDeleted ? 'Deleted ' : ''}Files List</h1>
        <button style={{padding: '0px', height: '20px'}} onClick={() => setShowDeleted(!showDeleted)}>
          {showDeleted ? "Show Active Files" : "Show Deleted Files"}
        </button>
      </div>
    </>
  );
}
