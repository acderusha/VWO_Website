function addMapElements() {
    var bridges = [{
        "type": "Feature",
        "properties": {
            "name": "Ponte DonÃ ",
            "district1": "Cannaregio",
            "district2": "Castello"
        },
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
    },{
            "type": "Feature",
            "properties": {
                "name": "Ponte de la Panada",
                "district1": "Cannaregio",
                "district2": "null"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [12.341912833857192,45.44230762302502],
                    [12.341870013183943,45.44226522770734],
                    [12.341812167895437,45.44230023945249],
                    [12.34172274807719,45.44234972538719],
                    [12.341658392943863,45.44238863531758],
                    [12.34169862712569,45.44242773061923],
                    [12.34170033319225,45.442429570271635],
                    [12.3417632977089,45.44239332783155],
                    [12.34180707872671,45.44236815824586],
                    [12.341817582606247,45.4423622830532],
                    [12.341850526831493,45.4423433408778],
                    [12.341912833857192,45.44230762302502]
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

        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        mymap.fitBounds(e.target.getBounds());

        var container = document.getElementById("descBoxContainer");
        var description = document.getElementById("descBox");
        container.style.display = "";
        container.width = "300px";
        description.style.display = "block";
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

    /* ---------------------------------- */

    /* ------ Custom Info Control ----------- */

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        try {
            var attrs = Object.keys(props);
            var attribute;
            var value;

            attribute = attrs[2];
            value = props[attribute];
        }
        /* --------- Always Goes Here ---------- */
        catch (e) {
            /* -------- Only here to suppress null pointer error ---------- */
        }

        if(value != "null") {
            this._div.innerHTML = '<h4>Bridge</h4>' + (props ?
                '<b>' + props.name + '</b><br />' + '<b> District1: </b>' + props.district1 + '</b><br />' + '<b> District2: </b>' + props.district2
                : 'Hover over a bridge');
        }
        else{
            this._div.innerHTML = '<h4>Bridge</h4>' +  (props ?
                '<b>' + props.name + '</b><br />' + '<b> District: </b>' + props.district1
                : 'Hover over a bridge');
        }
    };

    info.addTo(mymap);

}