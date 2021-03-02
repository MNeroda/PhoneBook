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
            isLoading: false,
            currentEdited: []
        }
        this.onDelete = this.onDelete.bind(this)
        this.onFavorite = this.onFavorite.bind(this)
        this.onEditStart = this.onEditStart.bind(this)
        this.onEditCancel = this.onEditCancel.bind(this)
        this.getDataFromAdd = this.getDataFromAdd.bind(this)
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
        this.fetchData.changeData(id, body)

        const changedFavorite = [...this.state.phoneNumbers.slice(0, index), body, ...this.state.phoneNumbers.slice(index+1)]
        this.setState({
            phoneNumbers: changedFavorite
        })
    }

    onEditStart(id) {
/*        const index = this.state.phoneNumbers.findIndex(item => item.id === id)*/
        if (this.state.currentEdited.indexOf(id) < 0) {
            const newCurrentEdited = this.state.currentEdited
            newCurrentEdited.push(id)
            this.setState({
                currentEdited: newCurrentEdited
            })
        }
    }

    getDataFromAdd(item) {
        const index = this.state.phoneNumbers.findIndex(elem => elem.id === item.id)
        const newPhonesNumbers = [...this.state.phoneNumbers.slice(0,index), item, ...this.state.phoneNumbers.slice(index+1)]
        this.setState({
            phoneNumbers: newPhonesNumbers
        })
    }

    onEditCancel(id) {
        const index = this.state.currentEdited.findIndex(elem => elem === id)
        const newCurrentEdited = [...this.state.currentEdited.slice(0, index), ...this.state.currentEdited.slice(index+1)]
        this.setState({
            currentEdited: newCurrentEdited
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
            const editFlag = this.state.currentEdited.indexOf(id) > -1
            return (
                <li key={id} className="list-group-item">
                    <Item
                        itemData={item}
                        editFlag={editFlag}
                        id={id}
                        sendData={this.getDataFromAdd}
                        onDelete={() => this.onDelete(id)}
                        onFavorite={() => this.onFavorite(id)}
                        onEditStart={() => this.onEditStart(id)}
                        onEditCancel={() => this.onEditCancel(id)}/>
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