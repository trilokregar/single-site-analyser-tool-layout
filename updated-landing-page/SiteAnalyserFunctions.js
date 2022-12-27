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
function _addMarkerWithPopup(lat, lng, markerIcon) {
  const icon = markerIcon && {"icon" : markerIcon};
  
  existingMarker = L.marker([lat, lng], icon).addTo(map);
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
function _spinner(className = "") {
  return '<span id="spinner" class="spinner spinner-border ' + className + '" role="status" aria-hidden="true"></span>';
}

/// -------------------------- REMOVE HEATMAP ------------------------ ///
function _removeHeatMap(existingHeatmap) {
  // clearing previous "Heatmap-Points"
  allHeatMapPointsArr = [];

  // remove layer
  map.removeLayer(existingHeatmap);
}

/// --------------------------- SHOW HEATMAP ---------------------- ///
function _showHeatMap(resPoiLayers, bbox) {
  // Construct NorthWest and SouthEast coordinates from the bbox
  const bboxArray = bbox.split(",");
  const nw = `${bboxArray[3]},${bboxArray[2]}`;
  const se = `${bboxArray[1]},${bboxArray[0]}`;

  // clearing previous "Heatmap-Points"
  allHeatMapPointsArr = [];

  // variable which used to trigger "HeatMap" when all API's are done.
  var calledApiCount = 0;

  // Calling API to get HeatMapPoints
  for (let i = 0; i < resPoiLayers.length; i++) {
    const resultLayer = resPoiLayers[i];
    $.ajax({
        type: "GET",
        url: `https://app.staging.admavin.com/api/v1/point/type/${resultLayer}/heatmap?nw=${nw}&se=${se}`,
        success: function (response) {
          const { result = {} } = response;
          const pointsArr = result.points || [];
          allHeatMapPointsArr.push(...pointsArr);
        },
        error: function (result) {
          alert("failed");
        },
        complete: function () {
          // Increasing the "apiCalledCount"
          calledApiCount++;

          // ------- Showing "HeatMap" from "allHeatMapPointsArr" ---- //
          if (calledApiCount === resPoiLayers.length) {
            // Setting "Loading = false"
            $(`#spinner-${selectedTgId}`).html("");

            // if "No-Points" then return "null"
            if (allHeatMapPointsArr.length === 0) {
              return null;
            }
          
            // heatmap style options
            const hmRadius = Math.abs(
              Math.round(100 - allHeatMapPointsArr.length / 100) - 20
            );
            const hmBlur = hmRadius > 50 ? 30 : 40;
            const options = {
              radius: hmRadius,
              blur: hmBlur,
            };
          
            // show heatmap
            existingHeatmap = L.heatLayer(allHeatMapPointsArr, options).addTo(map);
          }
        }
      });
  }
}

/// ------------------ RENDER POI MARKERS --------------------- ///
function _renderPoiMarkers(poiGroupName, poisArr = []) {
  // Icon
  const poiGrpIcon = poiTypesMarkerColorMap[poiGroupName];

  const markersArr = [];
  poisArr.forEach((poi) => {
    const poiName = poi.name;
    const { latitude, longitude } = poi.center; 

    // Create a marker for each point
    const poiMarker = L.marker([latitude, longitude], {"icon" : poiGrpIcon}).addTo(map);
    poiMarker.bindPopup(`<b>${poiName}</b>`);

    // Add to the Array of Markers
    markersArr.push(poiMarker);
  });

  return markersArr;
}

/// -------------------- POI MARKERS API FUNCTION ---------------------- ///
function _getPoiMarkers(bbox, poiName, poiGroupName, poisMarkerMap) {
  // Construct NorthEast and SouthWest coordinates from the bbox
  const bboxArray = bbox.split(",");
  const nw = `${bboxArray[3]},${bboxArray[2]}`;
  const se = `${bboxArray[1]},${bboxArray[0]}`;

  // calling api
  $.ajax({
    type: "GET",
    url: `https://kyp.mavinlabs.com/api/v1/geo/within/bbox/points?nw=${nw}&se=${se}&types=${poiName}&geoJson=false&_pn=1&_ps=1000`,
    dataType: "json",
    success: function (response) {
      const pois = response.result || [];

      // Render Markers
      const markersArr = _renderPoiMarkers(poiGroupName, pois);
      poisMarkerMap[poiName] = markersArr;
    },
    error: function (result) {
      alert("failed");
    },
    complete: function () {
      // Setting "Loading = false" for POI-Selection
      const poiNameId = poiName.replace(/[^\w ]/g, '').split(" ").join("-"); // creating ID from name(has space in between & spcl char )
      $(`#spinner-${poiNameId}`).html("");
    },
  });
};