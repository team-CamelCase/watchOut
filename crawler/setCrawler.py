from selenium import webdriver
from bs4 import BeautifulSoup
import json 
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
        num = 0
        for i in range(1,newPostNumber+3):
            if i % 2 != 0:
                component = {} 
                num = self.soup.select('#patient:nth-child({}) > td.sorting_1 > p'.format(i))[0].get_text()
                component['환자번호'] = num
                component['감염경로'] = self.soup.select('#patient:nth-child({}) > td:nth-child(3)'.format(i))[0].get_text()
                component['확진일'] = self.soup.select('#patient:nth-child({}) > td:nth-child(4)'.format(i))[0].get_text()
                component['거주지'] = self.soup.select('#patient:nth-child({}) > td:nth-child(5)'.format(i))[0].get_text()
                component['격리시설'] = self.soup.select('#patient:nth-child({}) > td:nth-child(6)'.format(i))[0].get_text()
            else:
                contents = self.soup.select('#DataTables_Table_0 > tbody > tr:nth-child({}) > td.tdl > p'.format(i))
                way = []
                if contents != None :
                    for content in contents : 
                        contentInfo = {}
                        if content.b != None : 
                            contentInfo["날짜"] = content.b.text
                        if content.span != None : 
                            self.parseInfo(content.span.text,contentInfo)
                            errorFlag = contentInfo.get("Error")
                            if errorFlag == None:
                                way.append(contentInfo)
                        else : 
                            way=["확인중"]
                    component["경로"] = way 
                    self.rawContents.append(component)
        print(self.rawContents)


    def parseInfo(self, string,contentInfo) :
        strs = string.split('→')
        detail = {}
        lists = []
        if string.find("출처")==1:
            contentInfo['Error']="true"
            return 
        if len(strs) == 1 :  
            if string.count(":")==1:
                j = string.index(':')+3
                detail["시간"] = string[0:j]
                detail["내용"] = string[j:]
            elif string.count(":")==2:
                j = string.index(":");
                k = string.index(":",j+1)+3
                detail["시간"] = string[0:k]
                detail["내용"] = string[k:]
            else : 
                detail["내용"] = string    
            lists.append(detail)
            detail = {}
        else : ## 여러 개 데이터 
            for s in strs:
                if s.find("출처")==1:
                    break
                if s.count(":")==1:
                    j = s.index(':')+3
                    detail["시간"] = s[0:j]
                    detail["내용"] = s[j:]
                elif s.count(":")==2:
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

