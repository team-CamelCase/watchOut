# Purpose
Data crawling and crate raido news script

### 필수 사항


2. 사전에 virtualenv crawlerCovid를 실행하여 crawlerCovid 가상환경이 생성되어 있습니다.
3. source crawlerCovid/bin/activate를 실행 후 crawlerCovid 가상환경이 실행되어 있는지 확인하세요.

# Download and Setting
docker 에는 필요한 패키지랑 라이브러리들 환경 세팅 해놨습니다.
해당 crawler를 로컬 환경에서 실행시 필요한 요소들은 아래 항목을 통해 다운로드 가능합니다.

### 1. chromedirver

    아래 링크를 통해 각 운영체제에 맞는 chromedriver를 설치하세요.
    https://chromedriver.storage.googleapis.com/index.html?path=83.0.4103.39/

### 2. google-cloud-language

    pip install google-cloud-language

### 3. google-cloud-storage

    pip install google-cloud-storage

### 4. bs4

    pip install bs4

### 5. selenium

    pip install selenium
### 6. schedule

    pip install schedule
# Function

### 1. setCrawler
    a. Clean Raw Data Function
    b. Extract time data
    c. Extract location data
    d. Create dictionary
        key(time), value(location list)
    e. Detect new posts

### 3. createNewsScript

### 4. sendToSpeechSaver
