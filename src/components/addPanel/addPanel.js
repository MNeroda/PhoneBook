import React, {Component} from "react";
import FetchData from "../../services/fetchData";
import "./styles.css"

export default class AddPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            buttonDisable: false
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
        const date = new Date()
        this.setState({
            buttonDisable: true
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
                    buttonDisable: false
                })
            })

    }

    render() {

        return (
                <form onSubmit={this.onSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Имя"
                        onChange={this.onNameChange}
                        minLength={3}/>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Номер"
                        onChange={this.onPhoneChange}
                        minLength={3}/>
                    <button type="submit" disabled={this.state.buttonDisable}>
                        Добавить
                    </button>
                </form>
        )
    }
}