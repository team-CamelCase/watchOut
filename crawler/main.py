#-*- coding:utf-8 -*-
####
 #       _____                              _    _____
 #      / ____|                            | |  / ____|
 #     | |        __ _   _ __ ___     ___  | | | |        __ _   ___    ___
 #     | |       / _` | | '_ ` _ \   / _ \ | | | |       / _` | / __|  / _ \
 #     | |____  | (_| | | | | | | | |  __/ | | | |____  | (_| | \__ \ |  __/
 #      \_____|  \__,_| |_| |_| |_|  \___| |_|  \_____|  \__,_| |___/  \___|
 #       _____                                          _                _     ____              _____   ____    __  __
 #      / ____|                                        | |              | |   |  _ \            |_   _| |  _ \  |  \/  |
 #      \___ \  | | | | | '_ \  | '_ \   / _ \  | '__| | __|  / _ \  / _` |   |  _ <  | | | |     | |   |  _ <  | |\/| |
 #      ____) | | |_| | | |_) | | |_) | | (_) | | |    | |_  |  __/ | (_| |   | |_) | | |_| |    _| |_  | |_) | | |  | |
 #     |_____/   \__,_| | .__/  | .__/   \___/  |_|     \__|  \___|  \__,_|   |____/   \__, |   |_____| |____/  |_|  |_|
 #                      | |     | |                                                     __/ |
 #                      |_|     |_|                                                    |___/
 #
import setCrawler
import cleanRawData
import detectNewPost
from sendToSpeechSaver import Transfer
from createNewsScript import Script

import schedule
import time

## 새로운 포스트 감지를 위한 스케쥴
schedule.every(3).seconds.do(setCrawler.crawler.countNewPost, 1060)

while True:
    schedule.run_pending()
    time.sleep(3)
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


