chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveFlashcard") {
      console.log("Background script received:", message.text); // Debug
      chrome.storage.local.get("flashcards", (data) => {
        const flashcards = data.flashcards || [];
        if (!flashcards.includes(message.text)) {
          flashcards.push(message.text);
          chrome.storage.local.set({ flashcards });
          console.log("Flashcard saved:", flashcards); // Debug
        }
      });
    }
  });
  