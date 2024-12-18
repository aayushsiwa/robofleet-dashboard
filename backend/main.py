from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import asyncio
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_name = "./data/fake_robot_data.json"

with open(file_name, "r") as f:
    robots = json.load(f)


@app.get("/robots")
async def get_robots():
    return robots


async def robot_stream():
    while True:
        for robot in robots:
            robot["Battery Percentage"] = max(0, robot["Battery Percentage"] - random.randint(0, 5))
            robot["CPU Usage"] = random.randint(1, 100)
            robot["RAM Consumption"] = random.randint(1000, 8000)
            robot["Last Updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
            robot["Location Coordinates"] = [
                round(random.uniform(-90.0, 90.0), 6),
                round(random.uniform(-180.0, 180.0), 6),
            ]
        yield f"data: {json.dumps(robots)}\n\n"
        await asyncio.sleep(5)


@app.get("/stream")
async def stream():
    return StreamingResponse(robot_stream(), media_type="text/event-stream")
