import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# 網頁 URL
url = "https://t.8s8s.com/photo/tarot/tarot_6_4.htm"  # <- 換成你想爬取的網頁

# 建立下載資料夾
folder_name = "images"
os.makedirs(folder_name, exist_ok=True)

# 取得網頁內容
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# 找到所有 <img> 標籤
img_tags = soup.find_all("img")

for img in img_tags:
    img_url = img.get("src")
    if not img_url:
        continue
    img_url = urljoin(url, img_url)

    # 取得圖片原始檔名
    parsed_url = urlparse(img_url)
    file_name = os.path.basename(parsed_url.path)
    
    # 避免檔名空字串或沒有副檔名
    if not file_name or "." not in file_name:
        file_name = "unknown.jpg"
    
    file_path = os.path.join(folder_name, file_name)
    
    try:
        img_data = requests.get(img_url).content
        with open(file_path, "wb") as f:
            f.write(img_data)
        print(f"下載完成: {file_path}")
    except Exception as e:
        print(f"下載失敗: {img_url} | 錯誤: {e}")
