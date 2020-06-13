from selenium import webdriver
from bs4 import BeautifulSoup
import json
## webdriver headless opiton
options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=300x300')
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

    def crawlRawData(self, newPostNumber):
        num = 0
        for i in range(1,(newPostNumber+1)*2): ## 새로운 환자마다 테이블에서 2개의 row 를 읽어야한다
            if i % 2 != 0: ## i 번째 환자에 대한 첫번째 row
                component = {}  # 해당 row 는 환자번호,감염경로,확진일,거주지, 격리시설에 대한 정보를 담고 있다
                num = self.soup.select('#patient:nth-child({}) > td.sorting_1 > p'.format(i))[0].get_text()
                component['환자번호'] = num
                component['감염경로'] = self.soup.select('#patient:nth-child({}) > td:nth-child(3)'.format(i))[0].get_text()
                component['확진일'] = self.soup.select('#patient:nth-child({}) > td:nth-child(4)'.format(i))[0].get_text()
                component['거주지'] = self.soup.select('#patient:nth-child({}) > td:nth-child(5)'.format(i))[0].get_text()
                component['격리시설'] = self.soup.select('#patient:nth-child({}) > td:nth-child(6)'.format(i))[0].get_text() # dict 를 사용하여 각각의 정보 저장
            else:
                contents = self.soup.select('#DataTables_Table_0 > tbody > tr:nth-child({}) > td.tdl > p'.format(i)) ## i 번째 환자에 대한 두번째 row
                way = [] ## 두번째 row 는 경로에 대한 정보를 담고 있기 때문에 list 를 사용한다
                if contents != None : # row 가 존재한다면
                    for content in contents :
                        contentInfo = {}
                        if content.b != None :  ## 첫번째 column 은 날짜
                            contentInfo["날짜"] = content.b.text
                        if content.span != None :
                            self.parseInfo(content.span.text,contentInfo)  ## 나머지 column
                            errorFlag = contentInfo.get("Error") ## 상세정보에 홈페이지 관련 정보는 무시한다
                            if errorFlag == None:
                                way.append(contentInfo) ## 올바른 경로 정보면 list 에 추가
                        else :
                            way=["확인중"] ## 해당 tr:nth-child에 tdl class가 존재하지 않으면 환자의 경로는 아직 확인중이라는걸 의미한다
                    component["경로"] = way
                    self.rawContents.append(component)

    def parseInfo(self, string,contentInfo) : ## 경로 정보를 담은 string 을 parse 하여 dictionary에 저장
        strs = string.split('→') ## 시간은 화살표로 나눠져 나타난다
        detail = {}
        lists = []
        if string.find("출처")==1: ## 시청 홈페이지 출처 관련 정보는 무시한다
            contentInfo['Error']="true"
            return
        if len(strs) == 1 :  ## 단 하나의 정보를 담고 있다면
            if string.count(":")==1: ## 시간 존재여부 체크
                j = string.index(':')+3.
                detail["시간"] = string[0:j]
                detail["내용"] = string[j:]
            elif string.count(":")==2: ## 시간이 duration 일때
                j = string.index(":");
                k = string.index(":",j+1)+3. ## 두개의 시간을 찾아서 split
                detail["시간"] = string[0:k]
                detail["내용"] = string[k:]
            else :
                detail["내용"] = string ## 내용에 시간이 없을때
            lists.append(detail)
            detail = {}
        else : ## 여러 개 경로 데이터가 존재할때
            for s in strs: ## 각 경로 데이터를 탐색
                if s.find("출처")==1: # 웹페이지 출처 정보 무시
                    break
                if s.count(":")==1: ## 하나의 시간이 표시될때
                    j = s.index(':')+3
                    detail["시간"] = s[0:j]
                    detail["내용"] = s[j:]
                elif s.count(":")==2: ## 시간이 duration 으로 표시될때
                    j = s.index(":");
                    k = s.index(":",j+1)+3
                    detail["시간"] = s[0:k]
                    detail["내용"] = s[k:]
                else :
                    detail["내용"] = s
            lists.append(detail)
            detail = {}
        contentInfo['세부경로'] = lists



crawler = SeoulCrawler()

