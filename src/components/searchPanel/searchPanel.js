import React, {Component} from "react"
import "./styles.css"

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
            <input className="search-panel"
                type="text"
                placeholder="Поиск"
                onChange={this.onChange}/>
        )
    }
}