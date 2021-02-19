import React, {Component} from "react";
import FetchData from "../../services/fetchData";
import "./styles.css"

const REGEX_NAME = /^[а-яА-ЯёЁ\-\s]+$/;
const REGEX_PHONE = /^[0-9\-]+$/;

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
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.nameRef = React.createRef();
        this.phoneRef = React.createRef();

        this.validators = {
            name: (value) => REGEX_NAME.test(value),
            phone: (value) => REGEX_PHONE.test(value),
        }
    }

    fetchData = new FetchData()

    onNameChange(e) {
        this.setState({
            name: e.target.value,
            incorrectName: !this.validators.name(e.target.value),
        })
    }

    onPhoneChange(e) {
        this.setState({
            phone: e.target.value,
            incorrectPhone: !this.validators.phone(e.target.value)
        })
    }

    updateValidation() {
        this.setState({
            incorrectName: !this.validators.name(this.state.name),
            incorrectPhone: !this.validators.phone(this.state.phone)
        });
    }

    get isValidForm() {
        return this.validators.name(this.state.name) && this.validators.phone(this.state.phone);
    }

    onSubmit(e) {
        e.preventDefault();
        this.updateValidation();

        console.table(this.state);

        if (!this.isValidForm) {
            return;
        }

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
                    ref={this.nameRef}
                    placeholder={namePlaceholder}
                    onChange={this.onNameChange}
                    minLength={3}
                    value={this.state.name}/>
                <input
                    className={clsPhone}
                    type="text"
                    ref={this.phoneRef}
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