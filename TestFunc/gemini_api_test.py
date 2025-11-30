import requests
import json

API_KEY = "AIzaSyAPnHLOBwKTHkV-fJqk1wI6SxICYEm73zc"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

payload = {
    "contents": [
        {
            "parts": [
                {"text": "幫我用兩句話介紹高雄美術館"}
            ]
        }
    ]
}

response = requests.post(URL, json=payload)
result = response.json()

print(json.dumps(result, indent=2, ensure_ascii=False))

# 印出文字結果（更方便）
print("\n=== 回覆內容 ===")
print(result["candidates"][0]["content"]["parts"][0]["text"])
