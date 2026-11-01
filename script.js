const form = document.getElementById("analysisForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const marketingText = document.getElementById("marketingText").value.trim();
    const product = document.getElementById("product").value.trim();
    const brand = document.getElementById("brand").value.trim();
    const audience = document.getElementById("audience").value.trim();
    const platform = document.getElementById("platform").value;
    const goal = document.getElementById("goal").value;

    if (!marketingText || !product || !audience || !platform || !goal) {
        result.innerHTML = `
            <div class="result-card">
                <h3>Incomplete Information</h3>
                <p>Please complete all required information before proceeding.</p>
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="result-card">
            <h3>Analysis Request Received</h3>
            <p>Your marketing text has been successfully submitted.</p>

            <h4>Context Summary</h4>
            <p><strong>Product:</strong> ${escapeHTML(product)}</p>
            <p><strong>Brand:</strong> ${escapeHTML(brand || "Not specified")}</p>
            <p><strong>Target Audience:</strong> ${escapeHTML(audience)}</p>
            <p><strong>Platform:</strong> ${escapeHTML(platform)}</p>
            <p><strong>Marketing Objective:</strong> ${escapeHTML(goal)}</p>

            <p class="notice">
                The pragmatic analysis engine is currently under development.
            </p>
        </div>
    `;

    result.scrollIntoView({ behavior: "smooth" });
});

function escapeHTML(text) {
    const element = document.createElement("div");
    element.textContent = text;
    return element.innerHTML;
          }
