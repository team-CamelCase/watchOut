from selenium import webdriver
from bs4 import BeautifulSoup


## Set Webdriver(Used Chrome Driver)
driver = webdriver.Chrome('./chromedriver')
## Create webdriver object from corona tab of Seoul City Hall's hompage
driver.get('https://www.seoul.go.kr/coronaV/coronaStatus.do')
## Click confirmation path tab
driver.find_element_by_css_selector('#container > div.layout-inner.layout-sub \
> div > div.move-tab > ul > li:nth-child(2) > button').click()

#클릭한 페이지에서 html 가져오기
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
# sampleContents = soup.select('#DataTables_Table_0 > tbody > tr:nth-child(4) > td')

#확진자 이동 경로 및 시간이 있는 html 항목 tr:nth-child(2n) (n>=1)
for i in range(1,10):
    sampleContents = soup.select('#DataTables_Table_0 > tbody > tr:nth-child({})'.format(i))
    print(sampleContents)


##필요 기능##
# 1. Raw data to cleaned Data Function
# 2. Automatic detection of new posts Function
# 3. Create news scripts




