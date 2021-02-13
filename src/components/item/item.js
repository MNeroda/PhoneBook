import React, {Component} from "react";
import "./styles.css"

export default class Item extends Component {

    render() {
        const {name, phoneNumber, date, favorite} = this.props.itemData
        const objDate = new Date(date)
        const visibleDate = `${objDate.toDateString()}, в ${objDate.getHours()}:${objDate.getMinutes()}`

        let classNames = "item d-flex justify-content-between"
        if (favorite) {
            classNames += " favorite"
        }

        return (
            <div className={classNames}>
                <span className="item-label">
                    <p>
                    Имя: {name}, Телефон: {phoneNumber}
                    </p>
                    <p>
                        Запись добавлена: {visibleDate}
                    </p>
                </span>

                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-star btn-sm"
                        onClick={this.props.onFavorite}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button className="btn-trash btn-sm"
                        onClick={this.props.onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}