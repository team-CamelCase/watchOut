import { decorate, observable, action, entries } from "mobx";

const MINUTE = 60000

class Store {
    constructor() {
        this.userCity = null
        this.cityNewsPageNum = 0
        this.cityNewsRowsPerPage = 5
        this.cityNewsData = []


        this.userCountry = null
        this.countryNewsPageNum = 0
        this.countryNewsRowsPerPage = 5
        this.countryNewsData = []

        this.isNewsDialogOpen = false
        this.curDialogNewsId = null
        this.curDialogNewsDataType = null

        this.snackbarOpen = false
        this.snackbarMsg = ""

        /* Constants */

        // Region Types
        this.CITY = "city"
        this.COUNTRY = "country"

        setInterval(() => {
            this.fetchNewsData(this.CITY)
            this.fetchNewsData(this.COUNTRY)
        }, 5000)//MINUTE)
    }

    set = (field, value) => {
        this[field] = value
    }

    openNewsDialog = (regionType, id) => {
        this.isNewsDialogOpen = true
        this.curDialogNewsId = id

        switch (regionType) {
            case this.CITY:
                this.curDialogNewsDataType = "cityNewsData"
            case this.COUNTRY:
                this.curDialogNewsDataType = "countryNewsData"
        }
    }

    closeNewsDialog = () => {
        this.isNewsDialogOpen = false
    }

    getRegionName = (type) => {
        switch (type) {
            case this.CITY:
                return this.userCity
            case this.COUNTRY:
                return this.userCountry
        }
    }

    getNewsData = (type) => {
        switch (type) {
            case this.CITY:
                return this.cityNewsData
            case this.COUNTRY:
                return this.countryNewsData
        }

    }

    getNewsPageNum = (type) => {
        switch (type) {
            case this.CITY:
                return this.cityNewsPageNum
            case this.COUNTRY:
                return this.countryNewsPageNum
        }
    }

    getRowsPerPage = (type) => {
        switch (type) {
            case this.CITY:
                return this.cityNewsRowsPerPage
            case this.COUNTRY:
                return this.countryNewsRowsPerPage
        }
    }


    getLocalInfo = async () => {

        try {

            const API_TOKEN = process.env.REACT_APP_IPINFO_TOKEN
        
            const response = await fetch(
                "http://ipinfo.io/json",
                {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                        Accept: "application/json"
                    },
                    method: "GET"
                }
            )

            const responseJson = await response.json()

            return responseJson

        } catch (err) {
            console.log("ipinfo 에러", err)
            throw err
        }
    }

    isNewsDataReady = (type) => {

        switch (type) {
            case this.CITY:
                return this.cityNewsData.length == 0
            case this.COUNTRY:
                return this.countryNewsData.length == 0
        }
    }

    fetchNewsData = async (regionType) => {
        try {
            const response = await fetch(
                "http://localhost/api/v1/news",
                {
                    headers: {
                        Accept: "application/json"
                    },
                    method: "GET"
                }
            )

            const newsData = await response.json()

            let newsDataField = ""

            switch (regionType) {

                case this.CITY:
                    newsDataField = "cityNewsData"
                    break;

                case this.COUNTRY:
                    newsDataField = "countryNewsData"
            }

            if (this[newsDataField].length) {

                const isDataNew = isNewDataAppeared(
                    this[newsDataField],
                    newsData
                )

                if (isDataNew) {
                    this.set(
                        "snackbarMsg",
                        "새로운 뉴스가 생성되었습니다"
                    )

                    this.set(
                        "snackbarOpen",
                        true
                    )

                    this.set(
                        newsDataField,
                        rows
                    )
                }

            } else {
                this.set(
                    newsDataField,
                    newsData
                )
            }

            return

        } catch (err) {
            console.log("getNesData error", err)
            throw err
        }
    }
}


const createData = (id, type, text, createdTime) => {
    return { id, type, text, createdTime };
}

const rows = [
    createData(1, '정보', '연남동 거주자 확진 동선 : 다모토리 -> ', Date.now()),
    createData(2, '정보', '51번째 확진자 동선 : 부탄츄 -> ', Date.now() + 10),
    createData(3, '안내', '코로나 예방 수칙 안내 : 마스크를 꼭..', Date.now() + 100),
    createData(5, '정보', '52번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 200),
    createData(6, '정보', '53번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 300),
    createData(7, '정보', '54번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 400),
    createData(8, '정보', '55번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 500),
    createData(9, '정보', '56번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 600),
].sort((a, b) => (a.createdTime < b.createdTime ? -1 : 1));

decorate(Store, {
    userCity: observable,
    userCountry: observable,
    cityNewsPageNum: observable,
    cityNewsRowsPerPage: observable,
    isNewsDialogOpen: observable,
    countryNewsPageNum: observable,
    countryNewsRowsPerPage: observable,
    snackbarOpen: observable,
    set: action,
    getLocalInfo: action,
    openNewsDialog: action,
    closeNewsDialog: action
});

export default Store;

const isNewDataAppeared = (prevList, newList) => {
    return newList.reduce((isDataNew, newEl) => {
        if (isDataNew) {
            return true
        }

        const isAlreadyExist = prevList.find(prevEl => {
            return prevEl.id == newEl.id
        })

        if (!isAlreadyExist) {
            return true
        }

        return false
    }, false)
}