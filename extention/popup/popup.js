function generateEventLink(event) {
    const baseUrl = "https://www.google.com/calendar/event?action=TEMPLATE";

    const formatDate = (iso) =>
        iso.replace(/[-:]/g, "").replace(".000", "");

    const start = formatDate(event.start_datetime);
    const end = formatDate(event.end_datetime);

    const title = encodeURIComponent(event.title || "Event");
    const description = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.location || "");

    return `${baseUrl}&dates=${start}/${end}&text=${title}&location=${location}&details=${description}`;
}

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
        const data = await res.json();
        const container = document.getElementById("results");
        container.innerHTML = "";

        if (data.events) {
            const events = Array.isArray(data.events) ? data.events : JSON.parse(data.events);
            console.log(events)
            events.forEach(event => {
                const link = generateEventLink(event);
                const div = document.createElement("div");
                div.innerHTML = `
                <h4>${event.title}</h4>
                <p>${event.start_datetime} → ${event.end_datetime}</p>
                <a href="${link}" target="_blank">➕ Add to Google Calendar</a>
                `;
                container.appendChild(div);
            });

        } else {
            container.innerText = "No events found 😢";
        }

    });
});
