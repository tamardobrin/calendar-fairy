from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()


class PageText(BaseModel):
    text: str


@app.post("/extract-events")
async def extract_events(data: PageText):
    prompt = f"""
You are a helpful assistant that extracts calendar events from webpages.
Given this text, return a list of calendar events in JSON format with the fields: title, start_datetime, end_datetime, location, description.
Text:\n{data.text}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        print("GPT raw response:", response)
        return {"events": response.choices[0].message.content}
    except Exception as e:
        print("Error from GPT:", e)
        return {"error": str(e)}
