import { decorate, observable, action, entries } from "mobx";


class Store {
    constructor() {
        this.userCity = null
        this.userCountry = null
    }

    set(field, value) {
        this[field] = value
    }

    async getLocalInfo() {
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
}


decorate(Store, {
    userCity : observable,
    userCountry : observable,
    set : action,
    getLocalInfo : action,
});

export default Store;