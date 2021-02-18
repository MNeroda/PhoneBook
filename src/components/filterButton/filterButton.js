import React, {Component} from "react";
import "./styles.css"

export default class FilterButton extends Component{
    render() {
        const allOrFavoriteLabel = this.props.allOrFavorite ? "Все" : "Избранные"
        let clsNameOlder = "btn-filter"
        let clsNameNewest = "btn-filter"
        this.props.blockOlder ?  clsNameOlder+= " selected" : clsNameNewest+= " selected"

        return (
            <>
                <button className={clsNameOlder}
                    type="button"
                        disabled={this.props.blockOlder}
                        onClick={this.props.onToggleOlder}>
                    Поздние
                </button>
                <button className={clsNameNewest}
                    type="button"
                        disabled={!this.props.blockOlder}
                        onClick={this.props.onToggleNewest}>
                    Ранние
                </button>
                <button className="btn-filter"
                    type="button"
                        onClick={this.props.onToggleFavorite}>
                    {allOrFavoriteLabel}
                </button>
            </>
        )
    }
}