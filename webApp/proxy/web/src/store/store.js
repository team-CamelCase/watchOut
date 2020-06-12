import { decorate, observable, action, entries } from "mobx";

class Store {
    constructor() {
        this.userCity = null
        this.userCountry = null
        this.newsTablePageNumber = 0
        this.newsTableRowsPerPage = 5
        this.cityNewsData = []
        this.countryNewsData = []

        this.isNewsDialogOpen = false
        this.curDialogNewsId = null
        this.curDialogNewsDataType = null
    }

    set = (field, value) => {
        this[field] = value
    }

    openNewsDialog = (regionType, id) => {
        this.isNewsDialogOpen = true
        this.curDialogNewsId = id
        this.curDialogNewsDataType = regionType
    }

    closeNewsDialog = () => {
        this.isNewsDialogOpen = false
    }


    getLocalInfo = async () => {

        try {

            const response = await fetch(
                "http://ipinfo.io/json",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_IPINFO_TOKEN}`,
                        Accept: "application/json"
                    },
                    method: "GET"
                }
            )

            const responseJson = await response.json()

            console.log("ipinfo로 요청한 결과", responseJson)

            return responseJson

        } catch (err) {
            console.log("ipinfo 에러", err)
            throw err
        }
    }

    getNewsData = async (regionType) => {
        try {
            // const response = await fetch(
            //     "http://우리백엔드서버2",
            //     {
            //         headers: {
            //             Accept: "application/json"
            //         },
            //         method: "GET"
            //     }
            // )

            // const responseJson = await response.json()

            // return responseJson.data

            // this.set(
            //     "cityNewsData",
            //     responseJson.data.city
            // )

            // this.set(
            //     "countryNewsData",
            //     responseJson.data.country
            // )

            this.set(
                regionType,
                rows
            )

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
    newsTablePageNumber: observable,
		newsTableRowsPerPage: observable,
		isNewsDialogOpen : observable,
    set: action,
    getLocalInfo: action,
    openNewsDialog : action,
    closeNewsDialog : action
});

export default Store;