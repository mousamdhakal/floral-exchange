import { useDispatch } from 'react-redux'
import './NearbyItems.scss'

import { useState, useCallback, useRef } from 'react'

import Map, { Marker, Popup } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import * as itemData from './testData.json'

import * as uiActions from '../../actions/uiActions'

const NearbyItems = () => {
  const mapRef = useRef();

  const dispatch = useDispatch()
  dispatch(uiActions.setActive('nearbyItems'))

  const [viewState, setViewState] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
    zoom: 10,
  })

  const handleMarkerClick = useCallback((e,item) => {
    e.preventDefault()
    setSelectedItem(item)
    setViewState(vState => {return {...vState, latitude: item.location.latitude, longitude: item.location.longitude}})
    mapRef.current?.flyTo({center: [item.location.longitude, item.location.latitude], duration: 500});
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
      {itemData.items.map((item) => (
        <Marker
          key={item.id}
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
            <h3>{selectedItem.name}</h3>
          </div>
        </Popup>
      ) : null}
    </Map>
  )
}

export default NearbyItems
