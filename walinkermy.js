
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBLD6K3MZOIc-8CCh1bd3miCp1sp09oPJI",
    authDomain: "whatsapp-group-linker.firebaseapp.com",
    databaseURL: "https://whatsapp-group-linker-default-rtdb.firebaseio.com",
    projectId: "whatsapp-group-linker",
    storageBucket: "whatsapp-group-linker.appspot.com",
    messagingSenderId: "270969542509",
    appId: "1:270969542509:web:78da8857670dd47a42ec64"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function insertRow(groupName, groupLink, image, sectionId) {
    // alert(sectionId);
    var body = document.getElementById(sectionId);
    newdiv = document.createElement('div');   //create a div
    // newdiv.id=sectionId;
    var tag = "<a href=\"#groupsingle\" rel=\"modal:open\" onclick=\"singlegroup('" + groupLink + "','Country','" + groupName + "','1','https://realgrouplinks.com/icons/LxfbH6TFbkb0kcChPDsjuL_23872.jpg')\"><div id=\"single-group\"><br><div id=\"group-img\" style=\"background-image: url(" + image + ")\"></div><div class=\"gp-detials\"> <h2 style=\"line-height:20px;\" class=\"gname\">" + groupName + "</h2><br><span style=\"font-size: 15px;\">Country</span></div></div></a>";

    newdiv.innerHTML = tag;                    //add an id
    body.appendChild(newdiv);                 //append to the doc.body
    body.insertBefore(newdiv, body.lastChild)
}
function createTable(tableName, sectionId) {

    var body = document.getElementById("groups-grid");
    newbrdiv = document.createElement("div");
    newbrdiv.innerHTML = "<br clear=\"all\">";
    body.appendChild(newbrdiv);                 //append to the doc.body
    body.insertBefore(newbrdiv, body.lastChild)

    newdiv = document.createElement('div');   //create a div
    newdiv.id = sectionId;
    // ;
    // var tag="<thead><tr><th colspan=\"2\" >"+tableName+"</th></tr></thead><tbody id="+rowId+"></tbody>";
    newdiv.innerHTML = "<h2 class=\"styled-table\">" + tableName + "</h2>";                 //add an i
    body.appendChild(newdiv);                 //append to the doc.body
    body.insertBefore(newdiv, body.lastChild)
}
function addLoadMoreButton(loadButtonid, sectionId, lastcount) {
    var body = document.getElementById("groups-grid");
    newbrdiv = document.createElement("div");
    newbrdiv.innerHTML = "<br clear=\"all\">";
    body.appendChild(newbrdiv);                 //append to the doc.body
    body.insertBefore(newbrdiv, body.lastChild)

    newbutton = document.createElement('div');   //create a div
    newbutton.className = "center";
    newbutton.innerHTML = "<button class=\"loadMore\" id=" + loadButtonid + " onclick=\"loadMorelink('" + sectionId + "'," + lastcount + ",'" + loadButtonid + "')\">Load More</button>";                 //add an id
    body.appendChild(newbutton);                 //append to the doc.body
    body.insertBefore(newbutton, body.lastChild);
}
function clickOn(id) {
    tableName = id.split("sectionId")[0];

    loadMorelink(tableName);


}
function loadMorelink(tableName, lastcount, loadButtonid) {
    alert(tableName,loadButtonid);
    var sectionId = tableName;
    tableName = tableName.split("sectionId")[0];

    firebase.database().ref(tableName).once("value", function (tableValue) {
        var dataRow = tableValue.val();
        var tableRow = Object.keys(dataRow);
        // console.log(tableValue);
        // alert(tableRow.length);
        for (var t = lastcount; t < tableRow.length; t++) {

            if (t == lastcount + 8) {
                var loadMoreButton = document.getElementById(loadButtonid);
                tag = "loadMorelink('" + sectionId + "'," + t + ",'" + loadButtonid + "')";
                loadMoreButton.setAttribute('onclick', tag);

                // addLoadMoreButton(tableName+"buttonid",t+"sectionId");
                break;
            }
            var k = tableRow[t];
            var url = dataRow[k].groupLink;
            var name = dataRow[k].groupName;
            var image = dataRow[k].groupImage;
            insertRow(name, url, image, tableName + "sectionId");
            // console.log(name, url);
            if (t == tableRow.length - 1) {
                // alert(t+" last link");
                var loadMoreButton = document.getElementById(loadButtonid);
                loadMoreButton.style.display = "none";
                break;
            }
        }
        // console.log(tableRow);
    });
}
function loadLinks(start) {
    database = firebase.database();
    var ref = database.ref();
    ref.on("value", gotData, errData);
}
function gotData(data) {
    var x = 0;
    var Tables = data.val();

        var i=document.title;
        x = x + 1;

        createTable(i, i + "sectionId");
        firebase.database().ref(i).once("value", function (tableValue) {
            var dataRow = tableValue.val();
            var tableRow = Object.keys(dataRow);
            // console.log(tableValue);
            for (var t = 0; t < tableRow.length; t++) {
                if (t == 8) {
                    addLoadMoreButton("buttonid" + x, i + "sectionId", t);
                    break;
                }
                var k = tableRow[t];
                var url = dataRow[k].groupLink;
                var name = dataRow[k].groupName;
                var image = dataRow[k].groupImage;
                insertRow(name, url, image, i + "sectionId");
                // console.log(name, url, image);
            }
            // console.log(tableRow);
        });



}
function errData(err) {
    console.log("Error!");
    console.log(err)
}
loadLinks();

