import React, {Component} from "react";
import Item from "../item";
import "./styles.css";
import FetchData from "../../services/fetchData";
import Spinner from "../spinner";

export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumbers: [],
            onToggleFavorite: false,
            sortOlder: true,
            isLoading: false
        }
        this.onDelete = this.onDelete.bind(this)
        this.onFavorite = this.onFavorite.bind(this)
    }

    fetchData = new FetchData()

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.fetchData.getPhoneNumbers()
            .then((phoneNumbers) => {
                this.setState({
                    phoneNumbers: phoneNumbers,
                    isLoading: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.newItem.id && this.props.newItem.id !== prevProps.newItem.id) {
            this.setState(() => {
                const newPhone = {
                    name: this.props.newItem.name,
                    phoneNumber: this.props.newItem.phoneNumber,
                    id: this.props.newItem.id,
                    favorite: this.props.newItem.favorite,
                    date: this.props.newItem.date.toJSON()
                }
                const newPhones = [...this.state.phoneNumbers, newPhone]
                return {
                    phoneNumbers: newPhones
                }
            })
        }

        if (this.props.toggleFavorite !== prevProps.toggleFavorite) {
            this.setState({
                onToggleFavorite: !this.state.onToggleFavorite
            })
        }

        if (this.props.sortOlder !== prevProps.sortOlder) {
            this.setState({
                sortOlder: !this.state.sortOlder
            })
        }
    }

    onDelete(id) {
        const index = this.state.phoneNumbers.findIndex(elem => elem.id === id)
        const newArr = [...this.state.phoneNumbers.slice(0, index), ...this.state.phoneNumbers.slice(index+1)]
        this.setState({
            phoneNumbers: newArr
        })
        this.fetchData.deletePhoneNumbers(id)
    }

    onFavorite(id) {
        const index = this.state.phoneNumbers.findIndex(elem => elem.id === id)
        const body = this.state.phoneNumbers[index]
        body.favorite = !body.favorite
        this.fetchData.changeFavorite(id, body)

        const changedFavorite = [...this.state.phoneNumbers.slice(0, index), body, ...this.state.phoneNumbers.slice(index+1)]
        this.setState({
            phoneNumbers: changedFavorite
        })
    }

    searchPhonesNumbers() {
        return this.state.phoneNumbers.filter((item) => {
            return (item.name.indexOf(this.props.searchText) > -1) || (item.phoneNumber.indexOf(this.props.searchText) > -1)
        })
    }

    filterFavorite(arr) {
        return this.state.onToggleFavorite ?
            arr.filter(item => item.favorite === true)
            : arr
    }

    sortByTime (arr) {
        if (this.state.sortOlder) {
            arr.sort((firstItem, secondItem) => {
                return (new Date(firstItem.date)) - (new Date(secondItem.date))
            })
        } else {
            arr.sort((firstItem, secondItem) => {
                return (new Date(secondItem.date)) - (new Date(firstItem.date))
            })
        }
        return arr
    }

    render() {
        const elements = this.sortByTime(this.filterFavorite(this.searchPhonesNumbers())).map(item => {
            const {id} = item
            return (
                <li key={id} className="list-group-item">
                    <Item
                        itemData={item}
                        onDelete={() => this.onDelete(id)}
                        onFavorite={() => this.onFavorite(id)}/>
                </li>
            )
        })

        return this.state.isLoading ?
            <Spinner/> :
            <ul className="app-list list-group">
                {elements}
            </ul>

    }
}