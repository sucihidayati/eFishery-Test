import React from "react";
import './form_search.scss'

const FormSearch = (props) => {
    const { searchText, handleFilteredData } = props
    return (
        <div className="form_search">
            <div className="form_search-grid">
                <input type="text" name="search" id="search" className="form" placeholder="search anything" value={searchText} onChange={handleFilteredData} />
            </div>
        </div>
    )
}

export default FormSearch