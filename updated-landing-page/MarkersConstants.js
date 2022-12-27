// Icons
// "iconUrl" : URL Path
// "iconSize" : size of the icon.
// "iconAnchor" : point of the icon which will correspond to marker's location.
// "popupAnchor" : point from which the popup should open relative to the iconAnchor.
const blueIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-blue.png',
    iconSize:     [25, 40],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });
  
  const greenIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-green.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });
  
  const redIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-red.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });
  
  const yellowIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-yellow.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const blackIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-black.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const orangeIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-orange.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const violetIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-violet.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const greyIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-grey.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const fluorescentIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-fluorescent.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const pinkIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-pink.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });

  const mintIcon = L.icon({
    iconUrl: '../assets/landing-page/markers/marker-mint.png',
    iconSize:     [25, 35],
    // iconAnchor:   [12,50], 
    popupAnchor:  [1, -10]
  });


  // Mapping of "Markers-color" with the "PoiTypes"
  const poiTypesMarkerColorMap = {
    "Banks & ATMs": greenIcon,
    "Books & Cinema": redIcon,
    "Clothes, shoes & accessories": yellowIcon,
    "Corporate Companies": blackIcon,
    "Hardware Stores": orangeIcon,
    "Home & Kitchen": violetIcon,
    "Jewellery": greyIcon,
    "Mobiles & Electronics": fluorescentIcon,
    "Restaurants": pinkIcon,
    "Shopping Mall": mintIcon,
  };