# 📅 Calendar Fairy

**Calendar Fairy** is a smart browser extension that scans any webpage for calendar-worthy events (like meetings, appointments, etc.) and lets you add them to Google Calendar in one click.

---

##  Tech Stack

- **Browser extension** (Manifest V3)
- **FastAPI** backend (Python)
- Optional: **OpenAI API** for event extraction

---

## How to Run

### 1. Clone the repo

### 2. set up the backend
```
cd backend
python -m venv venv
source venv/Scripts/activate   # or source venv/bin/activate (Mac/Linux)
pip install fastapi uvicorn openai
```
create an .env with your OPENAI_API_KEY

Then run the server:
uvicorn main:app --reload --port 8000

### 3. Load the extension in Chrome
Go to chrome://extensions <br>
Enable Developer Mode <br>
Click Load unpacked and select the extension/ folder


🧚 Made with magic by Tamar Dobrin
