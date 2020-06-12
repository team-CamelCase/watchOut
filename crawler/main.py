import setCrawler
import cleanRawData
import createNewsScript
import detectNewPost


import schedule
import time

## 새로운 포스트 감지를 위한 스케쥴
schedule.every(5).seconds.do(setCrawler.crawler.countNewPost, 1070)

while True:
    schedule.run_pending()
    time.sleep(5)
    rawContents = setCrawler.crawler.rawContents
    print(rawContents)
    setCrawler.crawler.rawContents.clear()
