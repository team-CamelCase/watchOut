#-*- coding:utf-8 -*-

import setCrawler
import cleanRawData
import detectNewPost
from sendToSpeechSaver import Transfer
from createNewsScript import Script

import schedule
import time

## 새로운 포스트 감지를 위한 스케쥴
schedule.every(5).seconds.do(setCrawler.crawler.countNewPost, 1068)

while True:
    schedule.run_pending()
    time.sleep(5)
    rawContents = setCrawler.crawler.rawContents
    if len(rawContents) != 0: ## update된 정보가 있는 경우 createNewsScript 생성
        script = Script()
        script.generate(rawContents)
        for i in range(len(rawContents)):
            print("Title : ", script.titleList[i])
            print("Contents : ", script.templateList[i])
            transfer = Transfer()
            transfer.sendScript(script.titleList[i], script.templateList[i])

        setCrawler.crawler.rawContents.clear()


