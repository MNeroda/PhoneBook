import React, {Component} from "react";
import "./styles.css"
import AddPanel from "../addPanel";

export default class Item extends Component {
    render() {
        const {name, phoneNumber, date, favorite} = this.props.itemData

        if (this.props.editFlag) {
            return (
                <AddPanel
                    sendData={this.props.sendData}
                    editFlag={true}
                    onEditCancel={this.props.onEditCancel}
                    editId={this.props.id}
                    placeholderEditData={{name, phoneNumber}}/>
            )
        }

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
                    <button className="btn-edit"
                        onClick={this.props.onEditStart}>
                        <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-star"
                        onClick={this.props.onFavorite}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button className="btn-trash"
                        onClick={this.props.onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}