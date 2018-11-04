function addMapElements() {
    var bridges = [{
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [12.339643764463714,45.4436030075387],
                [12.3397462498444,45.44354707795633],
                [12.339837915100942,45.44349476601351],
                [12.339994164918462,45.44340544031664],
                [12.339992134442374,45.443403773073285],
                [12.339944035020189,45.443363773947276],
                [12.339826200443365,45.44342771573011],
                [12.339810054235922,45.44343696912819],
                [12.339615490531314,45.443547270898364],
                [12.339529694516877,45.44359584958897],
                [12.339448234104015,45.44364191935559],
                [12.339490767524204,45.44368367890656],
                [12.339493012879714,45.44368526116982],
                [12.339643764463714,45.4436030075387]
            ]]
        }
    }];

    /* ---------------------------- Map Interaction Functions --------------------------- */

    /* ------ Bridge Highlight ----------- */
    function style(feature) {
        return {
            fillColor: "#ff7800",
            weight: 2,
            opacity: 1,
            color: 'purple',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    L.geoJson(bridges, {style: style}).addTo(mymap);

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        mymap.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(bridges, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(mymap);

}