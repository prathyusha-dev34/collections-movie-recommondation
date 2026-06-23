import React, { useState } from "react";
 
function Collections() {
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState([]);
 
  const createCollection = () => {
    if (!collectionName.trim()) {
      alert("Enter Collection Name");
      return;
    }
 
    const newCollection = {
      id: Date.now(),
      name: collectionName,
    };
 
    setCollections([...collections, newCollection]);
    setCollectionName("");
  };
 
  return (
    <div
      style={{
        marginLeft: "260px",
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        📁 My Collections
      </h1>
 
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Collection Name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          style={{
            width: "300px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
 
        <button
          onClick={createCollection}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create
        </button>
      </div>
 
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div
              key={collection.id}
              style={{
                backgroundColor: "#1e293b",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              }}
            >
              <h3>📂 {collection.name}</h3>
            </div>
          ))
        ) : (
          <p>No Collections Created Yet</p>
        )}
      </div>
    </div>
  );
}
 
export default Collections;
 