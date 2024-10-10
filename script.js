let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB"; // Corrected language to English (GB)
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good morning sir");
  } else if (hours >= 12 && hours < 18) {
    speak("Good afternoon sir");
  } else {
    speak("Good evening sir");
  }
}

// Initialize speech recognition
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Handle speech recognition results
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  console.log(event);
  takeCommand(transcript.toLowerCase());
};

// Start speech recognition when button is clicked
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(msg) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Handle "what is" or "who is" questions
  if (msg.startsWith("what is") || msg.startsWith("who is")) {
    speak(`Here is what I found on the internet regarding ${msg}`);
    window.open(`https://www.google.com/search?q=${msg}`, "_blank");
    return;
  }

  // Handle "open" commands
  if (msg.startsWith("open")) {
    handleOpenCommand(msg);
    return;
  }

  // Handle time query
  if (msg.includes("time")) {
    let time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    speak(`The current time is ${time}`);
    return;
  }

  // Handle date query
  if (msg.includes("date")) {
    let date = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    speak(`Today's date is ${date}`);
    return;
  }

  // Handle identity queries
  if (msg.includes("who are you") || msg.includes("what are you")) {
    speak(
      "I am a virtual assistant, created by Jithu Baiju. How can I assist you?"
    );
    return;
  }

  // Handle greetings
  if (
    ["hello aura", "hi aura", "hey aura", "howdy aura", "greetings"].includes(
      msg
    )
  ) {
    speak("Hello sir, how can I assist you?");
    return;
  }

  // Handle unrecognized commands
  speak(`Here is what I found on the internet regarding ${msg}`);
  window.open(`https://www.google.com/search?q=${msg}`, "_blank");
}

function handleOpenCommand(msg) {
  let appMap = {
    youtube: "https://www.youtube.com",
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    github: "https://www.github.com",
    twitter: "https://www.twitter.com",
    chrome: "googlechrome://",
    whatsapp: "whatsapp://",
    telegram: "telegram://",
    calculator: "calculator://",
  };

  for (let app in appMap) {
    if (msg.includes(app)) {
      window.open(appMap[app], "_blank");
      speak(`Opening ${app} for you.`);
      return;
    }
  }

  speak("Sorry, I don't recognize that application.");
}

// Uncomment to automatically wish the user upon page load
// window.addEventListener("load", wishMe);
