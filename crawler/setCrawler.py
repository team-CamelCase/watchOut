from selenium import webdriver
from bs4 import BeautifulSoup

class SeoulCrawler:
    ## Set Webdriver(Used Chrome Driver)
    driver = webdriver.Chrome('./chromedriver')
    ## Create webdriver object from corona tab of Seoul City Hall's hompage
    driver.get('https://www.seoul.go.kr/coronaV/coronaStatus.do')
    ## Click confirmation path tab
    driver.find_element_by_css_selector('#container > div.layout-inner.layout-sub \
    > div > div.move-tab > ul > li:nth-child(2) > button').click()
    # 클릭한 페이지에서 html 가져오기
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    def __init__(self):
        return
    def crawlRawData(self):
        contents = []
        # 확진자 이동 경로 및 시간이 있는 html 항목 tr:nth-child(2n) (n>=1)
        for i in range(2,100,2):
            contents.append(self.soup.select('#DataTables_Table_0 > tbody > tr:nth-child({})'.format(i)))
        return contents
tempCrawler = SeoulCrawler()
a = tempCrawler.crawlRawData()
print(a)






