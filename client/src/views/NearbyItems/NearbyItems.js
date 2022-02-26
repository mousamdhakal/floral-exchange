import { useDispatch } from 'react-redux'
import './NearbyItems.scss'

import { useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux';

import Map, { Marker, Popup } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import * as uiActions from '../../actions/uiActions'
import * as postActions from '../../actions/postActions'

const NearbyItems = () => {
  const mapRef = useRef();

  const dispatch = useDispatch()
  dispatch(uiActions.setActive('nearbyItems'))

  const [viewState, setViewState] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
    zoom: 10,
  })

  let posts = useSelector((state) => state.post.posts);

  if (!posts || posts.length === 0) {
    dispatch(postActions.getPosts())
  }

  let filteredPosts = posts.filter((post) => {
    return post.location && post.location.latitude && post.location.longitude
  })
  const handleMarkerClick = useCallback((e, item) => {
    e.preventDefault()
    setSelectedItem(item)
    setViewState(vState => { return { ...vState, latitude: item.location.latitude, longitude: item.location.longitude } })
    mapRef.current?.flyTo({ center: [item.location.longitude, item.location.latitude], duration: 500 });
  }, [])

  const [selectedItem, setSelectedItem] = useState(null)
  return (
    <Map
      reuseMaps
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      // mapStyle="mapbox://styles/mousamdhakal/ckzzb5akj011v14rw83in6usy"
      mapStyle="mapbox://styles/mousamdhakal/ckzzb8bcy000e14pe4tfvuwci"

    >
      {filteredPosts && filteredPosts.length > 0 && filteredPosts.map((item) => (
        <Marker
          key={item._id}
          latitude={item.location.latitude}
          longitude={item.location.longitude}
        >
          <button
            className="marker-button"
            onClick={(e) => handleMarkerClick(e, item)}
          >
            <LocationOnIcon />
          </button>
        </Marker>
      ))}
      {selectedItem ? (
        <Popup
          latitude={selectedItem.location.latitude}
          longitude={selectedItem.location.longitude}
          closeButton={true}
          closeOnClick={false}
          anchor='left'
          onClose={() => setSelectedItem(null)}
        >
          <div>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.description}</p>
          </div>
        </Popup>
      ) : null}
    </Map>
  )
}

export default NearbyItems
