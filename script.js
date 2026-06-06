import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";


let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("Firebase initialized");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const contactForm = document.querySelector(".contact-form");
const statusMessage = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!db) {
      setStatus(
        "Backend is not configured yet. Please add your Firebase settings in script.js.",
        true
      );
      return;
    }

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const course = contactForm.course.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email) {
      setStatus("Please enter your name and email.", true);
      return;
    }

    setStatus("Saving your request...", false);
    try {
      await addDoc(collection(db, "requests"), {
        name,
        email,
        course,
        message,
        createdAt: serverTimestamp()
      });
      contactForm.reset();
      setStatus("Thank you! Your request was saved to Firebase.", false);
    } catch (error) {
      console.error("Save failed:", error);
      setStatus(
        "Unable to save. Check Firebase configuration and internet connection.",
        true
      );
    }
  });
}

function setStatus(text, isError) {
  if (!statusMessage) return;
  statusMessage.textContent = text;
  statusMessage.style.color = isError ? "#dc2626" : "#0f766e";
}
