class Script:
    title = ""
    template = ""
    titleList = []
    templateList = []
    def __init__(self):
        return

    def generate(self, rawContents):  ##rawData를 기반으로
        # 1. Normal Case
        # ex) {6.11} {마포구} 확진자 정보입니다. 현재 파악한 경로는 {6.10} {12:00} {러프 신촌점}
        #                                               {6.11} {09:30} {맥도날드 신촌점}
        #                                               {6.11} {10:30} {맥도날드 신촌점}
        #
        for content in reversed(rawContents):
            self.title = "서울시 {}번쨰 확진자 {}에서 발생!".format(content['환자번호'], content['거주지'])
            self.template = "{} {} 확진자 정보입니다. 현재 파악한 경로는 ".format(content["확진일"],content["거주지"])
            routes = content["경로"]
            for routesByDate in routes:
                if routesByDate != "확인중":
                    self.template += (routesByDate['날짜'] + " ")
                    detailRoutes = routesByDate["세부경로"]

                    for detailInfo in detailRoutes:
                        if '시간' in detailInfo.keys():
                            self.template += (detailInfo["시간"] + " ")
                        self.template += (detailInfo["내용"] + " ")
                else:
                    self.template += "없으며, 확인중에 있습니다. 추후 보도드리겠습니다."
            self.titleList.append(self.title)
            self.templateList.append(self.template)