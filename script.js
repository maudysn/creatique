const form = document.getElementById("analysisForm");
const result = document.getElementById("result");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const marketingText = document.getElementById("marketingText").value.trim();
  const product = document.getElementById("product").value;
  const brand = document.getElementById("brand").value;
  const audience = document.getElementById("audience").value;
  const platform = document.getElementById("platform").value;
  const goal = document.getElementById("goal").value;

  if (!marketingText) {
    result.textContent = "Please enter your marketing text.";
    return;
  }

  result.innerHTML = "<p>CREATIQUE is analyzing your text... ✨</p>";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        marketingText,
        product,
        brand,
        audience,
        platform,
        goal
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysis failed.");
    }

    result.innerHTML = `
      <h2>Your Pragmatic Analysis</h2>
      <div class="analysis-content">${escapeHTML(data.analysis).replace(/\n/g, "<br>")}</div>
    `;

  } catch (error) {
    result.innerHTML = `
      <p>Sorry, something went wrong.</p>
      <p>${escapeHTML(error.message)}</p>
    `;
  }
});

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character];
  });
}
