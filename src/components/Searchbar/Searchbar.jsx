import React, { useState } from 'react'
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

function Searchbar ({onSubmit}) {
   const [query, setQuery] = useState('')

 const handleInputChange = (event) => {
  setQuery(event.target.value)
 }

const handleFormSubmit = (event) => {
  event.preventDefault()
  if(query.trim() !=='') {
    onSubmit(query)
  }
}

  
        return (
            <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleFormSubmit}>
              <button type="submit" className={css.button}>
                <span className="button-label">Search</span>
              </button>
    
              <input
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={handleInputChange}
              />
            </form>
          </header>
        )
    }

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar