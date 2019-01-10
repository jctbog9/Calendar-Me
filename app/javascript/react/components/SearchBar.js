import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchField: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldSubmit = this.handleFieldSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleFieldChange(event) {
    this.setState({ searchField: event.target.value})
  }

  handleFieldSubmit(event) {
    let payload = ""
    if (event != "") {
      event.preventDefault()
      payload = JSON.stringify({ search_field: this.state.searchField })
    }
    fetch('/api/v1/events/search.json', {
      method: 'POST',
      body: payload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.props.handleSearch(body)
    })
  }

  handleClear(){
    this.setState({ searchField: ""})
    this.handleFieldSubmit("")
  }

  render() {
    return (
      <div id='search-bar'>
        <form onSubmit={this.handleFieldSubmit}>
          <ul>
            <li className="small-8" id="search-bar-li">
              <input
                type='text'
                name='searchField'
                value={this.state.searchField}
                onChange={this.handleFieldChange}
                placeholder='Search...'
                className='search-field'
              />
            </li>
            <li id="search-bar-li">
              <button type="submit" className="search-button">
                <i className="fa fa-search"></i>
              </button>
            </li>
            <li id="search-bar-li">
              <button type="reset" onClick={this.handleClear} className="search-button">
                <i className="fas fa-times clear"></i>
              </button>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

export default SearchBar
