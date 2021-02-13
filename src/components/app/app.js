import React, {Component} from "react";
import SearchPanel from "../searchPanel";
import AddPanel from "../addPanel";
import FilterButton from "../filterButton";
import ItemsList from "../itemsList";
import "./styles.css"

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newItem: {},
            searchText: "",
            toggleFavorite: false,
            sortOlder: true
        }
        this.getDataFromAdd = this.getDataFromAdd.bind(this)
        this.getDataFromSearch = this.getDataFromSearch.bind(this)
        this.onToggleFavorite = this.onToggleFavorite.bind(this)
        this.onToggleOlder = this.onToggleOlder.bind(this)
        this.onToggleNewest = this.onToggleNewest.bind(this)
    }

    onToggleFavorite() {
        this.setState({
            toggleFavorite: !this.state.toggleFavorite
        })
    }

    onToggleOlder() {
        this.setState({
            sortOlder: true
        })
    }

    onToggleNewest() {
        this.setState({
            sortOlder: false
        })
    }

    getDataFromAdd(item) {
        this.setState({
            newItem: item
        })
    }

    getDataFromSearch(text) {
        this.setState({
            searchText: text
        })
    }

    render() {
        return (
            <div className="app">
                <div className="header">
                    <h1>Phone Book</h1>
                    <div>
                        <SearchPanel sendData={this.getDataFromSearch}/>
                    </div>
                </div>
                <div>
                    <AddPanel sendData={this.getDataFromAdd}/>
                    <FilterButton
                        allOrFavorite={this.state.toggleFavorite}
                        blockOlder={this.state.sortOlder}
                        onToggleFavorite={this.onToggleFavorite}
                        onToggleOlder={this.onToggleOlder}
                        onToggleNewest={this.onToggleNewest}/>
                </div>
                <div>
                    <ItemsList
                        newItem={this.state.newItem}
                        searchText={this.state.searchText}
                        toggleFavorite={this.state.toggleFavorite}
                        sortOlder={this.state.sortOlder}/>
                </div>

            </div>
        )
    }
}

