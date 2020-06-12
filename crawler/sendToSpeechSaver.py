import requests
import argparse
import os

class Transfer():
    url = ""
    def __init__(self):
        self.url = "http://172.28.0.2:3000/api/v1/speech"
    def sendScript(self, title, content):
        data = {"title" : title.encode('utf-8'), "content": content.encode('utf-8')}
        response = requests.post(self.url, data = data)
        print(response.status_code)
        print(response.text)

