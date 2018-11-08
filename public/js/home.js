var bridges = [{
    "type": "Feature",
    "properties": {
        "name": "Ponte DonÃ ",
        "district1": "Cannaregio",
        "district2": "null",
        "ramp": "permanent",
        "railing": "none",
        "slip_stair": "yes",
        "opening": "both",
        "tactile": "none",
        "private": "yes"
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
        "district2": "Castello",
        "ramp": "none",
        "railing": "both",
        "slip_stair": "none",
        "opening": "none",
        "tactile": "yes",
        "private": "no"
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
},{
    "type": "Feature",
    "properties": {
        "name": "Ponte dei Mendicanti",
        "district1": "Castello",
        "district2": "null",
        "ramp": "temporary",
        "railing": "one",
        "slip_stair": "none",
        "opening": "one",
        "tactile": "yes",
        "private": "no"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [12.342792943181951,45.44180946122445],
            [12.34275158361336,45.44177187005166],
            [12.3427157075657,45.441792634174654],
            [12.342704818482382,45.44177753131999],
            [12.342687905697275,45.44175373860059],
            [12.34265312184466,45.44176471851598],
            [12.342646566105508,45.4417673558149],
            [12.34267593492723,45.441808807770315],
            [12.34260077851,45.44185097668881],
            [12.342506316883144,45.441902325807376],
            [12.342510950718435,45.44190693348993],
            [12.342455356277359,45.44193893807774],
            [12.342500515685918,45.44197868772394],
            [12.34257331718245,45.44193727402573],
            [12.342664311514735,45.441885664155556],
            [12.3427137417864,45.441856935857224],
            [12.342794796815426,45.441810404331015],
            [12.342792943181951,45.44180946122445]
        ]]
    }
}];

// Custom Info Control
var info = L.control();

// Style for bridges
function style(feature) {
    return {
        fillColor: "#ff7800",
        weight: 2,
        opacity: 1,
        color: 'purple',
        dashArray: '3',
        fillOpacity: 1
    };
}

/* ---------------------------- Map Interaction Functions --------------------------- */

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    bridgeLayer.resetStyle(e.target);
    info.update();
}

function describeFeature(e) {
    var layer = e.target;

    var container = document.getElementById("descBoxContainer");
    var description = document.getElementById("descBox");
    container.style.display = "";
    container.width = "300px";
    description.style.display = "block";

    addDescription(layer.feature.properties);

    //mymap.fitBounds(e.target.getBounds());
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());

    var layer = e.target;

    var container = document.getElementById("descBoxContainer");
    var description = document.getElementById("descBox");
    container.style.display = "";
    container.width = "300px";
    description.style.display = "block";

    addDescription(layer.feature.properties);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: describeFeature,
        dblclick: zoomToFeature
    });
}

/* ---------------------------------- */

function addMapElements() {

    /* ------ Custom Info Control ----------- */

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


function addDescription(props){
    var name;
    var district1;
    var district2;
    var ramp;
    var railing;
    var slip;
    var open;
    var tact;
    var priv;

    try {
        var attrs = Object.keys(props);
        var attribute;
        var value;

        for(var i = 0; i<attrs.length; i++){
            attribute = attrs[i];
            value = props[attribute];

            if(i === 0){
                name = value;
            }
            else if(i === 1){
                district1 = value;
            }
            else if(i === 2){
                district2 = value;
            }
            else if(i === 3){
                ramp = value;
            }
            else if(i === 4){
                railing = value;
            }
            else if(i === 5){
                slip = value;
            }
            else if(i === 6){
                open = value;
            }
            else if(i === 7){
                tact = value;
            }
            else if(i === 8){
                priv = value;
            }
        }
    }
    /* --------- Always Goes Here ---------- */
    catch (e) {
        /* -------- Only here to suppress null pointer error ---------- */
    }

    /* --------- if statements determining what info on bridge description -------- */
    var infoDiv = document.getElementById("infoDiv");
    var accomDiv = document.getElementById("accomDiv");
    var cautionDiv = document.getElementById("cautionDiv");

    /* ------ Remove All Children from Div ------ */
    while (infoDiv.firstChild) {
        infoDiv.removeChild(infoDiv.firstChild);
    }
    while (accomDiv.firstChild) {
        accomDiv.removeChild(accomDiv.firstChild);
    }
    while (cautionDiv.firstChild) {
        cautionDiv.removeChild(cautionDiv.firstChild);
    }

    let nameLabel = document.createElement("label");
    nameLabel.textContent = "Name: " + name;
    nameLabel.className = "descBoxItem";
    infoDiv.appendChild(nameLabel);

    let distLabel1 = document.createElement("label");
    distLabel1.textContent = "District: " + district1;
    distLabel1.className = "descBoxItem";
    infoDiv.appendChild(distLabel1);

    if(district2 != "null"){
        let distLabel2 = document.createElement("label");
        distLabel2.textContent = "District: " + district2;
        distLabel2.className = "descBoxItem";
        infoDiv.appendChild(distLabel2);
    }

    if(ramp === "permanent"){
        let rampLabel = document.createElement("label");
        rampLabel.textContent = "Ramp: Permanent";
        rampLabel.className = "descBoxItem";
        accomDiv.appendChild(rampLabel);
    }
    else if(ramp === "temporary"){
        let rampLabel = document.createElement("label");
        rampLabel.textContent = "Ramp: Temporary";
        rampLabel.className = "descBoxItem";
        accomDiv.appendChild(rampLabel);
    }

    if(railing === "one"){
        let railingLabel = document.createElement("label");
        railingLabel.textContent = "Railing: One Side";
        railingLabel.className = "descBoxItem";
        accomDiv.appendChild(railingLabel);
    }
    else if(railing === "both"){
        let railingLabel = document.createElement("label");
        railingLabel.textContent = "Railing: Both Sides";
        railingLabel.className = "descBoxItem";
        accomDiv.appendChild(railingLabel);
    }

    if(slip != "none"){
        let slipLabel = document.createElement("label");
        slipLabel.textContent = "Slip Stair Edging: Installed";
        slipLabel.className = "descBoxItem";
        accomDiv.appendChild(slipLabel);
    }
    else{
        let slipLabelNone = document.createElement("label");
        slipLabelNone.textContent = "Slip Stair Edging: None";
        slipLabelNone.className = "descBoxItem";
        cautionDiv.appendChild(slipLabelNone);
    }

    if(open === "one"){
        let openLabel = document.createElement("label");
        openLabel.textContent = "Canal Opening: One Side";
        openLabel.className = "descBoxItem";
        cautionDiv.appendChild(openLabel);
    }

    else if(open === "both"){
        let openLabel = document.createElement("label");
        openLabel.textContent = "Canal Opening: Both Sides";
        openLabel.className = "descBoxItem";
        cautionDiv.appendChild(openLabel);
    }

    if(tact != "none"){
        let tactLabel = document.createElement("label");
        tactLabel.textContent = "Tactile Pavement";
        tactLabel.className = "descBoxItem";
        accomDiv.appendChild(tactLabel);
    }

    if(open != "none" && tact === "none"){
        let tactopen = document.createElement("label");
        tactopen.textContent = "Tactile Pavement near Canal Opening: None";
        tactopen.className = "descBoxItem";
        cautionDiv.appendChild(tactopen);
    }

    if(open != "none" && tact != "none"){
        let tactopen = document.createElement("label");
        tactopen.textContent = "Tactile Pavement near Canal Opening: Installed";
        tactopen.className = "descBoxItem";
        accomDiv.appendChild(tactopen);
    }

    if(priv != "no"){
        let privLabel = document.createElement("label");
        privLabel.textContent = "Property: Private";
        privLabel.className = "descBoxItem";
        infoDiv.appendChild(privLabel);
    }
    else{
        let privLabel = document.createElement("label");
        privLabel.textContent = "Property: Public";
        privLabel.className = "descBoxItem";
        infoDiv.appendChild(privLabel);
    }
}

/* ------------------- Filter Functions ------------------ */

function filterLayer() {
    mymap.removeLayer(bridgeLayer);

    /*console.log("rampPerFilter: " + rampPerFilter);
    console.log("rampTempFilter: " + rampTempFilter);
    console.log("rampNoneFilter: " + rampNoneFilter);
    console.log("railBothFilter: " + railBothFilter);
    console.log("railOneFilter: " + railOneFilter);
    console.log("railNoneFilter: " + railNoneFilter);*/

    bridgeLayer = L.geoJson(bridges, {style: style, onEachFeature: onEachFeature,
            filter: function(feature, layer) {
                if(rampFilter) {
                    if (rampPerFilter) {
                        if (feature.properties.ramp === "permanent") {
                            return true;
                        }
                    }
                    if (rampTempFilter) {
                        if (feature.properties.ramp === "temporary") {
                            return true;
                        }
                    }
                    if (rampNoneFilter) {
                        if (feature.properties.ramp === "none") {
                            return true;
                        }
                    }
                }
                if(railFilter) {
                    if (railBothFilter) {
                        if (feature.properties.railing === "both") {
                            return true;
                        }
                    }
                    if (railOneFilter) {
                        if (feature.properties.railing === "one") {
                            return true;
                        }
                    }
                    if (railNoneFilter) {
                        if (feature.properties.railing === "none") {
                            return true;
                        }
                    }
                }
                if(slipFilter) {
                    if (slipInstallFilter) {
                        if (feature.properties.slip_stair === "yes") {
                            return true;
                        }
                    }
                    if (slipNoneFilter) {
                        if (feature.properties.slip_stair === "none") {
                            return true;
                        }
                    }
                }
                if(openFilter) {
                    if (openBothFilter) {
                        if (feature.properties.opening === "both") {
                            return true;
                        }
                    }
                    if (openOneFilter) {
                        if (feature.properties.opening === "one") {
                            return true;
                        }
                    }
                    if (openNoneFilter) {
                        if (feature.properties.opening === "none") {
                            return true;
                        }
                    }
                }
                if(tactFilter) {
                    if (tactInstallFilter) {
                        if (feature.properties.tactile === "yes") {
                            return true;
                        }
                    }
                    if (tactNoneFilter) {
                        if (feature.properties.tactile === "none") {
                            return true;
                        }
                    }
                }
                if(propFilter) {
                    if (privFilter) {
                        if (feature.properties.private === "yes") {
                            return true;
                        }
                    }
                    if (publicFilter) {
                        if (feature.properties.private === "no") {
                            return true;
                        }
                    }
                }

        }
    });

    bridgeLayer.addTo(mymap);
}