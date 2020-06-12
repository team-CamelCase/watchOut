import requests
import os

class Transfer():
    url = ""
    def __init__(self):
        self.url = "http://localhost:8080/api/v1/speech"
    def sendScript(self, title, content):
        data = {"title" : title.encode('utf-8'), "content": content.encode('utf-8')}
        response = requests.post(self.url, data = data)
        print(response.status_code)
        print(response.text)


