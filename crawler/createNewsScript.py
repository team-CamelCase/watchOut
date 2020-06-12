import json
from google.cloud import language_v1

# 1. Seoul 시청같이 데이터 정제가 잘 된 경우
## script template
# 1. {6.11} {영등포} 확진자 정보입니다. 현재 경로 확인 중에 있으며, {서남병원}에 격리 조치되었습니다.

## rawData Format

defaultFormat = {
    "환자번호": "11999",
    "확진일": "6.11",
    "거주지": "마포구",
    "접촉력": "러프에서 술 마심",
    "조치사항": "세브란스병원",
    "경로": [
        {
            "날짜": "6.10",
            "세부 경로": [
                {
                    "시간": "12:00",
                    "장소": "러프 신촌점"
                }
            ]
        },
        {
            "날짜": "6.11",
            "세부 경로": [
                {
                    "시간": "10:00",
                    "장소": "국가지정격립병상"
                },
                {
                    "시간": "9:30",
                    "장소": "맥도날드 신촌점"
                }
            ]
        }
    ]
}


class Script:
    def __init__(self):
        return

    def generate(self, defaultFormat):  ##rawData를 기반으로
        # 1. Normal Case
        # ex) {6.11} {마포구} 확진자 정보입니다. 현재 파악한 경로는 {6.10} {12:00} {러프 신촌점}
        #                                               {6.11} {09:30} {맥도날드 신촌점}
        #                                               {6.11} {10:30} {맥도날드 신촌점}
        template = "{} {} 확진자 정보입니다. 현재 파악한 경로는 ".format(defaultFormat["확진일"],defaultFormat["거주지"])

        routes = defaultFormat["경로"]
        for routesByDate in routes:
            print(routesByDate)

            template += (routesByDate['날짜']+" ")
            detailRoutes = routesByDate["세부 경로"]

            for detailInfo in detailRoutes:
                template += (detailInfo["시간"] + " ")
                template += (detailInfo["장소"]+" ")

            print(template)

script = Script()
script.generate(defaultFormat)

# 2. 해외처럼 데이터 정제가 되지 않은 경우 google NLP 사용하여 시간 및 LOCATION 정보 추
