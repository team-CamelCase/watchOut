import requests
import os

class Transfer():
    url = ""
    def __init__(self):
        self.url = "http://localhost:8080/api/v1/speech"
    def sendScript(self, title, content):
        data = {"title" : title, "content": content}
        response = requests.post(self.url, data = data)
        if response.status_code == 200: ##success logo

            print(
                "       _____                                       __           _   _              _____                             _              _   _   _")
            print(
                "      / ____|                                     / _|         | | | |            / ____|                           | |            | | | | | |")
            print(
                "     | (___    _   _    ___    ___    ___   ___  | |_   _   _  | | | |  _   _    | |       _ __    __ _  __      __ | |   ___    __| | | | | |")
            print(
                "      \___ \  | | | |  / __|  / __|  / _ \ / __| |  _| | | | | | | | | | | | |   | |      | '__|  / _` | \ \ /\ / / | |  / _ \  / _` | | | | |")
            print(
                "      ____) | | |_| | | (__  | (__  |  __/ \__ \ | |   | |_| | | | | | | |_| |   | |____  | |    | (_| |  \ V  V /  | | |  __/ | (_| | |_| |_|")
            print(
                "     |_____/   \__,_|  \___|  \___|  \___| |___/ |_|    \__,_| |_| |_|  \__, |    \_____| |_|     \__,_|   \_/\_/   |_|  \___|  \__,_| (_) (_)")
            print("                                                                         __/ |")
            print("                                                                        |___/")
            print(
                "      _   _                                       _                    __   _   _            _                       _                                               _                       _              _")
            print(
                "     | \ | |                                     (_)                  / _| (_) | |          | |                     | |                                             | |                     | |            | |")
            print(
                "     |  \| |   ___  __      __   __   __   ___    _    ___    ___    | |_   _  | |   ___    | |__     __ _   ___    | |__     ___    ___   _ __      _   _   _ __   | |   ___     __ _    __| |   ___    __| |")
            print(
                "     | . ` |  / _ \ \ \ /\ / /   \ \ / /  / _ \  | |  / __|  / _ \   |  _| | | | |  / _ \   | '_ \   / _` | / __|   | '_ \   / _ \  / _ \ | '_ \    | | | | | '_ \  | |  / _ \   / _` |  / _` |  / _ \  / _` |")
            print(
                "     | |\  | |  __/  \ V  V /     \ V /  | (_) | | | | (__  |  __/   | |   | | | | |  __/   | | | | | (_| | \__ \   | |_) | |  __/ |  __/ | | | |   | |_| | | |_) | | | | (_) | | (_| | | (_| | |  __/ | (_| |")
            print(
                "     |_| \_|  \___|   \_/\_/       \_/    \___/  |_|  \___|  \___|   |_|   |_| |_|  \___|   |_| |_|  \__,_| |___/   |_.__/   \___|  \___| |_| |_|    \__,_| | .__/  |_|  \___/   \__,_|  \__,_|  \___|  \__,_|")
            print(
                "      _               _____   ____    __  __            _                       _           _                                                               | |")
            print(
                "     | |             |_   _| |  _ \  |  \/  |          | |                     | |         | |                                                              |_|")
            print(
                "     | |_    ___       | |   | |_) | | \  / |     ___  | |   ___    _   _    __| |    ___  | |_    ___    _ __    __ _    __ _    ___")
            print(
                "     | __|  / _ \      | |   |  _ <  | |\/| |    / __| | |  / _ \  | | | |  / _` |   / __| | __|  / _ \  | '__|  / _` |  / _` |  / _ \\")
            print(
                "     | |_  | (_) |    _| |_  | |_) | | |  | |   | (__  | | | (_) | | |_| | | (_| |   \__ \ | |_  | (_) | | |    | (_| | | (_| | |  __/")
            print(
                "      \__|  \___/    |_____| |____/  |_|  |_|    \___| |_|  \___/   \__,_|  \__,_|   |___/  \__|  \___/  |_|     \__,_|  \__, |  \___|")
            print(
                "                                                                                                                          __/ |")
            print(
                "                                                                                                                         |___/")
