const questionInput = document.getElementById("question");
const schemaInput = document.getElementById("schema");
const dialectInput = document.getElementById("dialect");
const generateButton = document.getElementById("generate");
const sqlOutput = document.getElementById("sql-output");
const explanationOutput = document.getElementById("explanation-output");
const statusOutput = document.getElementById("status");
const copyButton = document.getElementById("copy-sql");

document.querySelectorAll(".example").forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.dataset.question;
    questionInput.focus();
  });
});

generateButton.addEventListener("click", generateSQL);

async function generateSQL() {
  const question = questionInput.value.trim();
  const schema = schemaInput.value.trim();
  const dialect = dialectInput.value;

  if (!question) {
    statusOutput.textContent = "Please type a question first.";
    questionInput.focus();
    return;
  }

  generateButton.disabled = true;
  generateButton.querySelector("span").textContent = "Generating…";
  statusOutput.textContent = "Asking the AI to prepare your query…";
  copyButton.disabled = true;

  try {
    const response = await fetch("/.netlify/functions/generate-sql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, schema, dialect })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not generate SQL.");

    sqlOutput.textContent = data.sql || "No SQL was returned.";
    explanationOutput.textContent = data.explanation || "No explanation was returned.";
    copyButton.disabled = !data.sql;
    statusOutput.textContent = "Query generated. Review it before using it.";
  } catch (error) {
    statusOutput.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    generateButton.disabled = false;
    generateButton.querySelector("span").textContent = "Generate SQL";
  }
}

copyButton.addEventListener("click", async () => {
  const sql = sqlOutput.textContent;
  try {
    await navigator.clipboard.writeText(sql);
    copyButton.textContent = "Copied!";
    setTimeout(() => { copyButton.textContent = "Copy"; }, 1500);
  } catch {
    statusOutput.textContent = "Copy failed. Please select and copy the SQL manually.";
  }
});
