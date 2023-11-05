import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import fetchImages from "./Api/Api";
import Button from './Button/Button'

function App () {
const [query, setQuery] = useState("")
const [images, setImages] = useState([])
const[page, setPage] = useState(1)
const [loader, setLoader] = useState(false)
const [largeImageURL, setLargeImageURL] = useState(null)
const [allImages, setAllImages] = useState(null)

useEffect(() => {
  const fetchData = async() => {
    if(query ==="") return
    try {
      const dataImages = await fetchImages(query, page)
      setTimeout(() => {
        setImages((prevImages) => [...prevImages, ...dataImages.hits])
        setLoader(false)
        setAllImages(dataImages.totalHits)
      }, 200)
    } catch(error) {
      console.log(error)
    setLoader(false)
    }
  }

  fetchData()
}, [query, page])

const handleSubmit = (currentQuery) => {
  if(query === currentQuery) return 
  setQuery(currentQuery)
  setImages([])
  setPage(1)
  setLoader(true)
}

const btnLoadMore = () => {
  setPage((prevPage) => prevPage + 1)
  setLoader(!loader)
}

 const handleImageClick = (newLargeImageURL) => {
  setLargeImageURL(newLargeImageURL)
 }

 const closeImageModal = () => {
  setLargeImageURL(null)
 }


    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 && (
          <div>
            <ImageGallery images={images} onImageClick={handleImageClick} />
            {images.length < allImages ? (
              <Button onClick={btnLoadMore}/>
            ) : (
              <p>No more images</p>
            )}
          </div>
        )}
        {loader && <Loader />}
      </div>
    );
  }

export default App;