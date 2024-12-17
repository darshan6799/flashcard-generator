document.addEventListener("DOMContentLoaded", () => {
  const flashcardList = document.getElementById("flashcard-list");
  const clearButton = document.getElementById("clear");
  const exportButton = document.getElementById("export");

  // Load flashcards
  chrome.storage.local.get("flashcards", (data) => {
    const flashcards = data.flashcards || [];
    flashcards.forEach((card) => addFlashcardToUI(card));
  });

  function addFlashcardToUI(text) {
    const li = document.createElement("li");
    li.textContent = text;
    flashcardList.appendChild(li);
  }
});

// Export all flashcards as a .txt file
document.getElementById("export-all").addEventListener("click", function () {
  const cardList = document.getElementById("flashcard-list");
  if (cardList.children.length > 0) {
    const allFlashcards = Array.from(cardList.children)
      .map((card) => card.innerText.replace("Copy\nRemove", "").trim())
      .join("\n\n");

    const blob = new Blob([allFlashcards], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "flashcards.txt";
    link.click();
  } else {
    alert("No flashcards to export!");
  }
});

// Clear all flashcards
document.getElementById("clear-all").addEventListener("click", function () {
  document.getElementById("flashcard-list").innerHTML = "";
});
