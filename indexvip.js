import os
import sys
import time
import json
import random
import asyncio
import datetime
import requests
from pathlib import Path
from typing import List, Dict, Optional, Any

plus = " [\x1b[32m+\x1b[0m]"
mins = " \x1b[0m[\x1b[31m-\x1b[0m]"
seru = "\x1b[0m[\x1b[34m!\x1b[0m]"

base_url = "https://api.voltix.ai"
user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
]

def get_random_user_agent() -> str:
    return random.choice(user_agents)

def get_headers() -> Dict[str, str]:
    return {"User-Agent": get_random_user_agent()}

def fetch_quests() -> Optional[Dict[str, Any]]:
    try:
        response = requests.get(f"{base_url}/tasks/socials", headers=get_headers(), timeout=30)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"{mins} Failed to fetch quests: {response.status_code} {response.text}")
            return None
    except Exception as e:
        print(f"{mins} Error fetching quests: {str(e)}")
        return None

async def main() -> None:
    print('\n\x1b[34mScript Tanpa Autentikasi\x1b[0m - \x1b[33mNo Login Required\x1b[0m\n')
    
    while True:
        print(f"{plus} Fetching quest data...")
        quests = fetch_quests()
        if quests:
            print(f"{plus} Quests: {json.dumps(quests, indent=2)}")
        await asyncio.sleep(10)  # Delay 10 detik untuk simulasi

if _name_ == "_main_":
    asyncio.run(main())
