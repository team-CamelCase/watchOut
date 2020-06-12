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
    topPatientNumber = False
    def __init__(self):
        #클래스 초기화시 최상단 patientNumber를 가져온다.
        patientNumber = self.soup.select('#patient:nth-child(1) > td.sorting_1 > p')
        self.topPatientNumber = patientNumber
    def countNewPost(self, prevPatientNumber):
        ## 10분마다 새로운 게시글이 있는 확인
        ## prevPatientNumber와 비교하여 새로운 정보 확인
        ## 게시글 수 리턴
        return
    def crawlRawData(self):
        rawContents = []
        ## 확진자 이동 경로 및 시간이 있는 html 항목 tr:nth-child(2n) (n>=1)
        for i in range(1,10):
            rawContents.append(self.soup.select('#DataTables_Table_0 > tbody > tr:nth-child({})'.format(i)))

        return rawContents
crawler = SeoulCrawler()
topPatientNumber = crawler.topPatientNumber

print(crawler.crawlRawData())








