import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const statusElement = document.getElementById("dashboard-status");
const dashboardBody = document.getElementById("dashboard-body");

let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  setStatus("Firebase dashboard connected.", false);
  loadRequests();
} catch (error) {
  setStatus("Firebase is not configured. Update firebase-config.js.", true);
  console.error(error);
}

async function loadRequests() {
  if (!db) return;

  try {
    const requestsQuery = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(requestsQuery);
    if (querySnapshot.empty) {
      setStatus("No requests found yet.", false);
      return;
    }

    dashboardBody.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "-";
      row.innerHTML = `
        <td>${createdAt}</td>
        <td>${escapeHtml(data.name || "-")}</td>
        <td>${escapeHtml(data.email || "-")}</td>
        <td>${escapeHtml(data.course || "-")}</td>
        <td>${escapeHtml(data.message || "-")}</td>
      `;
      dashboardBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    setStatus("Unable to load requests. Check Firebase permissions.", true);
  }
}

function setStatus(text, isError) {
  if (!statusElement) return;
  statusElement.textContent = text;
  statusElement.style.color = isError ? "#dc2626" : "#0f766e";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
