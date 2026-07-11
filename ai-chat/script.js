const chatLog = document.getElementById("chatLog");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Hand-written first: one call to the OpenAI Responses API.
// OPENAI_API_KEY comes from config.js, which is not committed to the repo.
async function askAI(userText) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: userText,
      instructions: "You are a friendly, concise assistant for a web dev student.",
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI request failed with status ${res.status}`);
  }

  const data = await res.json();

  // The Responses API returns an "output" array. Find the message item
  // and pull its text out of the content array.
  const messageItem = data.output.find((item) => item.type === "message");
  const textItem = messageItem.content.find((c) => c.type === "output_text");
  return textItem.text;
}

// AI-extended part: turn the single askAI() call into a working chat page.
document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  addMessage("Thinking...", "ai");

  try {
    const reply = await askAI(text);
    chatLog.lastChild.textContent = reply;
  } catch (err) {
    chatLog.lastChild.textContent = "Something went wrong reaching the AI. Check that config.js has a valid key.";
    console.error(err);
  }
});