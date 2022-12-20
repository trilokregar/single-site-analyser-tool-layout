/// ------------ SET MAP-VIEW ------------ ///
function _setMapView(lat, lng, zoom) {
  map.setView([lat, lng], zoom);
}

/// ----------- GET "BBOX" FROM "BOUNDS" ------------ ///
function _getBBoxFromBounds(bounds) {
  const southWest = bounds._southWest;
  const northEast = bounds._northEast;
  const bbox = `${northEast.lng},${southWest.lat},${southWest.lng},${northEast.lat}`;
  return bbox;
}

/// -------- CLEAR AUTOCOMPLETE VALUES ------------ ///
function _clearAutoCompleteValues() {
  searchedPlaceName = "";
  $placesAutocomplete.val("");
}

/// ----------- ADD LAT-LNG TO INPUTS  --------- ///
function _addLatLngInputValues(lat, lng) {
  if (lat) {
    $latitude.val(lat);
  }
  if (lng) {
    $longitude.val(lng);
  }
}

/// ---------- CLEAR LATITUDE-LONGITUDE OF INPUTS --------- ///
function _clearLatLngInputValues() {
  $latitude.val("");
  $longitude.val("");
}

/// ------------ GET LAT-LNG FROM INPUTS ------------- ///
function _getLatLngValues() {
  const inputLat = $latitude.val();
  const inputLng = $longitude.val();

  return { inputLat, inputLng };
}

/// ----------- ADD MARKER --------- ////////
function _addMarkerWithPopup(lat, lng) {
  existingMarker = L.marker([lat, lng]).addTo(map);
  existingMarker.bindPopup(
    `<b>Latitude:</b> ${lat}
      <br />
    <b>Longitude:</b> ${lng}`
  );
}

/// ----------- REMOVE MARKER ----------- ///
function _removeMarker(existingMarker) {
  if (existingMarker) {
    map.removeLayer(existingMarker);
  }
}

/// ------ SPINNER ------- ///
// function _spinner(className) {
//   return (
//     <div className={`spinner-border text-primary ${className}`} role="status">
//       <span className="sr-only">Loading...</span>
//     </div>
//   );
// }
