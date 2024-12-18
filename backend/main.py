from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import uuid
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

# robots = [
#     {
#         "Robot ID": str(uuid.uuid4()),
#         "Online/Offline": random.choice([True, False]),
#         "Battery Percentage": random.randint(10, 100),
#         "CPU Usage": random.randint(1, 100),
#         "RAM Consumption": random.randint(1000, 8000),
#         "Last Updated": time.strftime("%Y-%m-%d %H:%M:%S"),
#         "Location Coordinates": [
#             round(random.uniform(-90.0, 90.0), 6),
#             round(random.uniform(-180.0, 180.0), 6),
#         ],
#     }
#     for _ in range(10)
# ]

file_name="./data/fake_robot_data.json"

with open(file_name, "r") as f:
    robots=json.load(f)

# json.load(file_name)

@app.get("/robots")
async def get_robots():
    return JSONResponse(robots)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("WebSocket connection initiated.")
    await websocket.accept()
    try:
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
            await websocket.send_json(robots)
            print("Data sent to WebSocket clients.")
            await asyncio.sleep(5)
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()

