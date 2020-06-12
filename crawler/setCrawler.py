from selenium import webdriver
from bs4 import BeautifulSoup

## webdriver headless opiton
options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")

class SeoulCrawler:
    ## Set Webdriver(Used Chrome Driver)
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    ## Create webdriver object from corona tab of Seoul City Hall's hompage
    driver.get('https://www.seoul.go.kr/coronaV/coronaStatus.do')
    ## Click confirmation path tab
    driver.find_element_by_css_selector('#container > div.layout-inner.layout-sub \
    > div > div.move-tab > ul > li:nth-child(2) > button').click()

    # 클릭한 페이지에서 html 가져오기
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    topPatientCSS = '#patient:nth-child(1) > td.sorting_1 > p'
    topPatientNumber = False
    newPostNumber = False
    rawContents = []
    def __init__(self):
        #클래스 초기화시 최상단 patientNumber를 가져온다.
        patientNumber = self.soup.select(self.topPatientCSS)[0].get_text()
        self.topPatientNumber = int(patientNumber)

    def countNewPost(self, prevPatientNumber):
        ## prevPatientNumber와 비교하여 새로운 정보 확인
        ## 게시글 수 리턴
        newPatientNumber = int(self.soup.select(self.topPatientCSS)[0].get_text())
        self.newPostNumber = newPatientNumber - prevPatientNumber
        if self.newPostNumber != 0:
            self.crawlRawData(self.newPostNumber)
            # print(self.rawContents)
            #새로운 Post 전송 후 rawContents를 비워둬야함.
            # print("length : ", len(self.rawContents))
    def crawlRawData(self, newPostNumber):
        for i in range(1,newPostNumber):
            self.rawContents.append(self.soup.select('#DataTables_Table_0 > tbody > tr:nth-child({})'.format(i)))

crawler = SeoulCrawler()