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

    function insertRow(groupName, groupLink) {
        // alert(sectionId);
        var tbody = document.getElementById("tableBody");
        newtr = document.createElement('tr');   //create a div
        // newdiv.id=sectionId;
        var tag = "<td>" + groupName + "</td><td> <a href=\"" + groupLink + "\" target=\"_blank\"><button name=\"button\" type=\"button\">Join Now</button></a></td>";

        newtr.innerHTML = tag;                    //add an id
        tbody.appendChild(newtr);                 //append to the doc.body
        tbody.insertBefore(newtr, tbody.lastChild)
    }
//     function createTable(tableName, sectionId) {

//         var body = document.getElementById("groups-grid");
//         newbrdiv = document.createElement("div");
//         newbrdiv.innerHTML = "<br clear=\"all\">";
//         body.appendChild(newbrdiv);                 //append to the doc.body
//         body.insertBefore(newbrdiv, body.lastChild)

//         newdiv = document.createElement('div');   //create a div
//         newdiv.id = sectionId;
//         // ;
//         // var tag="<thead><tr><th colspan=\"2\" >"+tableName+"</th></tr></thead><tbody id="+rowId+"></tbody>";
//         newdiv.innerHTML = "<h2 class=\"styled-table\">" + tableName + "</h2>";                 //add an i
//         body.appendChild(newdiv);                 //append to the doc.body
//         body.insertBefore(newdiv, body.lastChild)
//     }

    function loadMorelink(lastcount) {
        //     alert(tableName,loadButtonid);
        tableName = document.title;

        firebase.database().ref(tableName).once("value", function (tableValue) {
            var dataRow = tableValue.val();
            var tableRow = Object.keys(dataRow);
            // console.log(tableValue);
            // alert(tableRow.length);
            for (var t = lastcount; t < tableRow.length; t++) {

                if (t == lastcount + 8) {
                    var loadMoreButton = document.getElementById("loadmoreGroup");
                    tag = "loadMorelink('" + t + "')";
                    loadMoreButton.setAttribute('onclick', tag);

                    // addLoadMoreButton(tableName+"buttonid",t+"sectionId");
                    break;
                }
                var k = tableRow[t];
                var url = "https://bikespeci.blogspot.com/p/gateway.html?walink=" + dataRow[k].groupLink;
                var name = dataRow[k].groupName;
                var image = dataRow[k].groupImage;
                insertRow(name, url, image, tableName + "sectionId");
                // console.log(name, url);
                if (t == tableRow.length - 1) {
                    // alert(t+" last link");
                    var loadMoreButton = document.getElementById("loadmoreGroup");
                    loadMoreButton.style.display = "none";
                    break;
                }
            }
            // console.log(tableRow);
        });
    }
    function loadLinks() {
        var i = document.title;
        document.getElementById("tableHead").innerText = i;
        database = firebase.database();
        var ref = database.ref(i);
        ref.once("value", function (tableValue) {
            // console.log(tableValue.val());
            var dataRow = tableValue.val();
            var tableRow = Object.keys(dataRow);
            // console.log(tableRow);
            // console.log(tableValue);
            for (var t = 0; t < tableRow.length; t++) {
                if (t == 8) {
                    // alert("hello");
                    document.getElementById("loadmoreGroup").style.display = "block";
                    var loadMoreButton = document.getElementById("loadmoreGroup");
                    tag = "loadMorelink('" + t + "')";
                    loadMoreButton.setAttribute('onclick', tag);
                    break;
                }
                var k = tableRow[t];
                var url = "https://bikespeci.blogspot.com/p/gateway.html?walink=" + dataRow[k].groupLink;
                var name = dataRow[k].groupName;
                // var image = dataRow[k].groupImage;
                insertRow(name, url);
                // console.log(name, url);
            }
            // console.log(tableRow);
        });

    }
    function move() {
        var elem = document.getElementById("myBar");
        var width = 0;
        var time = 10;
        var id = setInterval(frame, 10 * time);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                document.getElementById("tableDiv").style.display = "block";
                elem.style.display = "none";
            } else {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = "Wait until load all links ";

            }
        }
    }
    move();
    loadLinks();
