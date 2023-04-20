ymaps.ready(init);

// Adding Yandex map for tracking delivery address
function init() {
    let myPlacemark;
    let myMap = new ymaps.Map('map', {
            center: [56.3287, 44.002],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Tracking map clicks
    myMap.events.add("click", (event) => {
        let coords = event.get('coords');

        // If there is a placemark, just toggle it. If there isn't - create it
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        } else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Creating placemark
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Determining the address by coordinates (reverse geocoding)
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let address = firstGeoObject.getAddressLine();

            myPlacemark.properties
                .set({ iconCaption: [
                        // City name
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Building number
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    balloonContent: address
                });
                
            delivery_input.value = address;
        });
    }
}