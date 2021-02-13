import React, {Component} from "react"

export default class SearchPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const text = e.target.value
        this.setState({
            text: text
        })
        this.props.sendData(text)
    }

    render() {
        return (
            <input
                type="text"
                placeholder="Поиск"
                onChange={this.onChange}/>
        )
    }
}