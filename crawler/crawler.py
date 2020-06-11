import requests
from bs4 import BeautifulSoup

## HTTP GET Request
req = requests.get('https://www.seoul.go.kr/coronaV/coronaStatus.do')

## HTML 소스 가져오기
html = req.text
## HTTP Header 가져오기
header = req.headers


## HTTP Status 가져오기 (200: 정상)
status = req.status_code
## HTTP가 정상적으로 되었는지 (True/False)
is_ok = req.ok

print(is_ok)

## BeautifulSoup으로 html소스를 python객체로 변환하기
## 첫 인자는 html소스코드, 두 번째 인자는 어떤 parser를 이용할지 명시.
## 이 글에서는 Python 내장 html.parser를 이용했다.
soup = BeautifulSoup(html, 'html.parser')

sampleData = soup.select('DataTables_Table_0 > tbody > tr:nth-child(4) > td')
print(sampleData)