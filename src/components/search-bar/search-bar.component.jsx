import './search-bar.styles.scss'
import { useState } from 'react'

const SearchBar = ({ onSearch }) => {

    const [input, setInput] = useState({
        search: ""
    })

    const searchInput = e => {
        const { name, value } = e.target;
        setInput({ [name]: value });

        clearTimeout(setTimeout(() => {
            onSearch.callback(input.search)
        }, 500))
    }

    return <>
        <section className="search">
            <div className="search__form">
                <input type="text" className="form-control" name="search" defaultValue={input.search} onChange={searchInput} />
                <div className="search__form-icon">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
            </div>
        </section>
    </>
}

export default SearchBar;