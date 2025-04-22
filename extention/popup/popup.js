document.getElementById("scan").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText
    }, async (results) => {
        const text = results[0].result;

        const res = await fetch("http://localhost:8000/extract-events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        console.log(res)
        const data = await res.json();
        const container = document.getElementById("results");

        if (data.events) {
            container.innerText = data.events;  
            console.log("🧚 Extracted Events:", data.events);
        } else {
            container.innerText = "No events found 😢";
        }

    });
});
