"""Automated integration test for Hush headless WebSocket service."""

import asyncio
import json
import threading
import time
import websockets
from hush.service import HushService

def run_service(service):
    asyncio.run(service.run_server())

async def client_test():
    print("Connecting to Hush service on ws://127.0.0.1:4879...")
    async with websockets.connect("ws://127.0.0.1:4879") as ws:
        # Test 1: Ping
        await ws.send(json.dumps({"action": "ping"}))
        res1 = json.loads(await ws.recv())
        assert res1.get("status") == "ok", f"Ping failed: {res1}"
        print("[OK] Ping test passed")

        # Test 2: Get Initial State
        await ws.send(json.dumps({"action": "get_initial_state"}))
        res2 = json.loads(await ws.recv())
        assert res2.get("status") == "ok", f"Initial state failed: {res2}"
        data = res2["data"]
        print(f"[OK] Initial state received: {len(data['models'])} models available")
        print(f"[OK] Current active model: {data['config']['model']}")
        print(f"[OK] Hold chord: {data['config']['hold_chord']}")
        print(f"[OK] Devices found: {len(data['devices'])}")

        # Test 3: Set config
        await ws.send(json.dumps({"action": "set_config", "key": "strip_fillers", "value": True}))
        res3 = json.loads(await ws.recv())
        assert res3.get("status") == "ok"
        print("[OK] Config update test passed")

        print("\nAll Hush Service integration tests passed successfully!")

def main():
    service = HushService(port=4879)
    t = threading.Thread(target=run_service, args=(service,), daemon=True)
    t.start()
    time.sleep(1.5)  # wait for service to bind
    asyncio.run(client_test())

if __name__ == "__main__":
    main()
