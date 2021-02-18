import React, {Component} from "react";
import FetchData from "../../services/fetchData";
import "./styles.css"

export default class AddPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            buttonDisable: false,
            incorrectName: false,
            incorrectPhone: false
        }
        this.onNameChange = this.onNameChange.bind(this)
        this.onPhoneChange = this.onPhoneChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    fetchData = new FetchData()

    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onPhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const regName = /^[а-я]+$/ig
        const regPhone = /^[0-9\-]+$/g

/*        if (!regName.test(this.state.name)) {
            console.log("name")
        }*/

        if (!regName.test(this.state.name) || !regPhone.test(this.state.phone)) {

            if (!regName.test(this.state.name)) {
                console.log("incorrect name")
                this.setState({
                    incorrectName: true
                })
            }

            if (!regPhone.test(this.state.phone)) {
                console.log("incorrect phone")
                this.setState({
                    incorrectPhone: true
                })
            }
        } else {
            const date = new Date()
            this.setState({
                buttonDisable: true,
                incorrectName: false,
                incorrectPhone: false
            })

            this.fetchData.sendPhoneNumbers(this.state.name, this.state.phone, date, false)
                .then(response => {
                    const newItem = {
                        name: this.state.name,
                        phoneNumber: this.state.phone,
                        date: date,
                        id: response.name,
                        favorite: false
                    }
                    this.props.sendData(newItem)
                })
                .then(() => {
                    this.setState({
                        buttonDisable: false,
                        name: "",
                        phone: ""
                    })
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.incorrectName !== this.state.incorrectName && this.state.incorrectName) {
            this.setState({
                name: ""
            })
        }
        if (prevState.incorrectPhone !== this.state.incorrectPhone && this.state.incorrectPhone) {
            this.setState({
                phone: ""
            })
        }
    }

    render() {
        let clsName = "input-field"
        let namePlaceholder = this.state.incorrectName ? "Только русские буквы" : "Введите имя"
        let phonePlaceholder = this.state.incorrectPhone ? "Только цифры" : "Введите телефон"
        let clsPhone = "input-field"
        if (this.state.incorrectName) {
            clsName+= " incorrect"
        }
        if (this.state.incorrectPhone) {
            clsPhone+= " incorrect"
        }

        return (
                <form onSubmit={this.onSubmit} className="add-form">
                    <input
                        className={clsName}
                        type="text"
                        placeholder={namePlaceholder}
                        onChange={this.onNameChange}
                        minLength={3}
                        value={this.state.name}/>
                    <input
                        className={clsPhone}
                        type="text"
                        placeholder={phonePlaceholder}
                        onChange={this.onPhoneChange}
                        minLength={3}
                        value={this.state.phone}/>
                    <button className="btn-add-post" type="submit" disabled={this.state.buttonDisable}>
                        Добавить
                    </button>
                </form>
        )
    }
}