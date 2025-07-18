// src/App.js
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
// ...existing code...

const items = [
  {
    id: 1,
    name: "เสื้อสีดำ",
    price: 32,
    image: "shirt1.jpg",
    pickup: "หน้าม.เกษตร บางเขน",
  },
  {
    id: 2,
    name: "เสื้อโอเวอร์ไซส์ม่วงลาเวนเดอร์",
    price: 299,
    image: "",
    pickup: "BTS หมอชิต",
  },
  {
    id: 3,
    name: "เสื้อเชิ้ตสีฟ้าอ่อน",
    price: 350,
    image: "/shirt3.jpg",
    pickup: "ร้านใกล้บ้าน",
  },
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_wo7y3dc",
        "template_qexr4xi",
        formRef.current,
        "zK5bvAUWuyxrBtiIx"
      )
      .then(
        () => {
          alert("ส่งออเดอร์เรียบร้อย!");
          setLoading(false);
          setSelectedItem(null);
          formRef.current.reset();
        },
        (error) => {
          alert("ส่งไม่สำเร็จ ลองใหม่อีกครั้ง");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Series</h1>
      <h1 style={styles.title2}>✨ขายเสื้อผ้ามือสอง🍒</h1>
      <h1 style={styles.title3}>📪 นัดรับใน ม.เกษตร กำแพงแสน [ หอหน้า-ข้างมอ ]</h1>
      <h1 style={styles.title4}>inbox 24/7 💌</h1>
      <div style={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.image} alt={item.name} style={styles.image} />
            <h3 style={styles.itemName}>{item.name}</h3>
            <p style={styles.price}>ราคา {item.price} บาท</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={styles.popupBackdrop} onClick={() => setSelectedItem(null)}>
          <div
            style={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: 10 }}>สั่งซื้อ: {selectedItem.name}</h2>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={styles.popupImage}
            />
            <p>ราคา: {selectedItem.price} บาท</p>
            <p>นัดรับที่: {selectedItem.pickup}</p>

            <form ref={formRef} onSubmit={sendEmail} style={styles.form}>
              {/* ซ่อนข้อมูลสินค้าในฟอร์ม */}
              <input
                type="hidden"
                name="item_name"
                value={selectedItem.name}
              />
              <input
                type="hidden"
                name="price"
                value={selectedItem.price}
              />
              <input
                type="hidden"
                name="pickup_location"
                value={selectedItem.pickup}
              />

              <label style={styles.label}>ชื่อผู้สั่ง:</label>
              <input
                type="text"
                name="customer_name"
                placeholder="กรอกชื่อของคุณ"
                required
                style={styles.input}
              />

              <label style={styles.label}>เบอร์โทรศัพท์:</label>
              <input
                type="tel"
                name="customer_phone"
                placeholder="กรอกเบอร์โทร"
                required
                style={styles.input}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  backgroundColor: loading ? "#ccc" : "#ff7eb3",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "กำลังส่ง..." : "สั่งซื้อเลย"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                style={{ ...styles.button, backgroundColor: "#bbb", marginTop: 10 }}
              >
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Kanit', sans-serif",
    backgroundColor: "#fbe8f9",
    minHeight: "100vh",
    padding: "1rem",
    color: "#3a3a3a",
  },

  title: {
    textAlign: "center",
    color: "#ff7eb3",
    marginBottom: "2rem",
    fontSize: "2.5rem",
  },

  title2: {
    textAlign: "center",
    color: "#000000ff",
    fontSize: "1.5rem",
    fontWeight: 40,
  },

  title3: {
    textAlign: "center",
    color: "#000000ff",
    fontSize: "1.5rem",
    fontWeight: 40,
  },

    title4: {
    textAlign: "center",
    color: "#000000ff",
    fontSize: "1.5rem",
    fontWeight: 200,
  },

  grid: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff0f6",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "1rem",
    width: 180,
    cursor: "pointer",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    borderRadius: 8,
    marginBottom: "0.5rem",
  },
  itemName: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#d6336c",
    margin: "0.3rem 0",
  },
  price: {
    color: "#a8325b",
    fontWeight: "700",
  },
  popupBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popup: {
    backgroundColor: "#fff0f6",
    borderRadius: 16,
    padding: "2rem",
    width: "90%",
    maxWidth: 400,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  popupImage: {
    width: "80%",
    borderRadius: 12,
    marginBottom: "1rem",
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    alignItems: "stretch",
  },
  label: {
    textAlign: "left",
    fontWeight: "600",
    color: "#d6336c",
  },
  input: {
    padding: "0.6rem 1rem",
    borderRadius: 8,
    border: "1px solid #d6336c",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    padding: "0.7rem",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.1rem",
    userSelect: "none",
    transition: "background-color 0.3s",
  },
};
