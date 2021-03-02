export default class FetchData {
    constructor() {
        this.url = "https://phonebook-fec8f-default-rtdb.firebaseio.com/phoneNumbers.json"
    }

    async getPhoneNumbers() {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => {
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })): []
            })
    }

    sendPhoneNumbers(name, phoneNumber, date, favorite) {
        const obj = {name, phoneNumber, date, favorite}

        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
    }

    deletePhoneNumbers(id) {
        fetch(`https://phonebook-fec8f-default-rtdb.firebaseio.com/phoneNumbers/${id}.json`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    changeData(id, body) {
        return fetch(`https://phonebook-fec8f-default-rtdb.firebaseio.com/phoneNumbers/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        })
    }
}