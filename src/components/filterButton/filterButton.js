import React, {Component} from "react";

export default class FilterButton extends Component{
    render() {
        const allOrFavoriteLabel = this.props.allOrFavorite ? "Все" : "Избранные"
        return (
            <>
                <button type="button"
                        disabled={this.props.blockOlder}
                        onClick={this.props.onToggleOlder}>
                    Поздние
                </button>
                <button type="button"
                        disabled={!this.props.blockOlder}
                        onClick={this.props.onToggleNewest}>
                    Ранние
                </button>
                <button type="button"
                        onClick={this.props.onToggleFavorite}>
                    {allOrFavoriteLabel}
                </button>
            </>
        )
    }
}