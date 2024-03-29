  var articalSectionId = "mainContent";

  function initLoading() {
      var mainContent = document.getElementById(articalSectionId);
      newSection = document.createElement('section'); //create a div
      newSection.className = "w3-light-grey";
      var tag = `<div id="myBar" class="w3-container w3-cyan w3-center" style="width:0%;max-height:20px ;">0%</div>`;
      newSection.innerHTML = tag;
      mainContent.appendChild(newSection); //append to the doc.body
      mainContent.insertBefore(newSection, mainContent.lastChild)
  }

  function initGroupLinks() {
      var mainContent = document.getElementById(articalSectionId);
      newSection = document.createElement('section'); //create a div
      newSection.className = "wrap";
      newSection.id = "results"
          // var tag = `<div id="results" style="display: none;">`;
          // newSection.innerHTML = tag;
      mainContent.appendChild(newSection); //append to the doc.body
      mainContent.insertBefore(newSection, mainContent.lastChild)
  }

  function initPreArtical() {
      var mainContent = document.getElementById(articalSectionId);
      newSection = document.createElement('section'); //create a div
      newSection.className = "preArtical";
      newSection.id = "preArtical"
          // var tag = `<div id="results" style="display: none;">`;
          // newSection.innerHTML = tag;
      mainContent.appendChild(newSection); //append to the doc.body
      mainContent.insertBefore(newSection, mainContent.lastChild)
  }

  function initPostArtical() {
      var mainContent = document.getElementById(articalSectionId);
      newSection = document.createElement('section'); //create a div
      newSection.className = "PostArtical";
      newSection.id = "PostArtical"
          // var tag = `<div id="results" style="display: none;">`;
          // newSection.innerHTML = tag;
      mainContent.appendChild(newSection); //append to the doc.body
      mainContent.insertBefore(newSection, mainContent.lastChild)
  }

  function initLoadMoreLink() {
      var mainContent = document.getElementById(articalSectionId);
      newSection = document.createElement('section'); //create a div
      newSection.className = "LoadMoreLink";
      // newSection.id = "LoadMoreLink";
      var tag = `<button id="LoadMoreLink" class="LoadMoreLink" style="display: none;">Load More Groups</button>`;
      newSection.innerHTML = tag;
      mainContent.appendChild(newSection); //append to the doc.body
      mainContent.insertBefore(newSection, mainContent.lastChild)
  }
  initPreArtical();
  initLoading();
  initGroupLinks();
  initLoadMoreLink()
  initPostArtical();
  var firebaseConfig = {
      apiKey: "AIzaSyCNPje1QfnH8Pg8oLzKYj_Guy1GaiiyWLs",
      authDomain: "telelinking-techfarm.firebaseapp.com",
      databaseURL: "https://telelinking-techfarm-default-rtdb.firebaseio.com",
      projectId: "telelinking-techfarm",
      storageBucket: "telelinking-techfarm.appspot.com",
      messagingSenderId: "344916823855",
      appId: "1:344916823855:web:aff753138b8af5bb579bda"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var groupBlock = `
  <div>
                      <a style="color: #5a5a5a" target="_blank" href="groupLink" title="Telegram group invite link: groupName">
                          <span>
                              <img src="groupLogo" onerror="imgError(this);" class="image"  alt="groupName">
                          </span>
                      </a>
                      <a style="color: #5a5a5a;font-family: fantasy;" target="_blank" href="groupLink" title="Telegram group invite link: groupName">
                          <h2>groupName</h2>
                      </a>
                  </div>
                  <div class="block2">
                      <div class="post-basic-info"> 
                          <div style="color:#0088cc;">
                          <a style="font-weight: 600;"href="groupLink" title="Telegram Chaneel invite link: groupName" target="_blank">@grouplinkText</a>
                          </div>
                          <span style="padding-right:20px;">Category: groupType</span>
                          <span>subscribe/members: groupCount</span>
                          <p class="descri" style="margin-bottom: 0px">groupDescri</p>
                      </div>
                      <div class="post-info-rate-share"> <span class="joinbtn"><a class="joinbtn" href="groupLink" target="_blank" title="Click here to join groupName Telegram group" rel="nofollow">Join group</a></span>
                          <div class="post-share">
                              <div>

                                  <a class="joinbtn" style="vertical-align:top" href="whatsapp://send?text=Follow this link to Join my Telegram group : groupLink %0A %0AFind more Telegram group at: https://groupsor.link/ " data-action="share/whatsapp/share" rel="nofollow">Share on</a>
                                  <a href="whatsapp://send?text=Follow this link to Join my Telegram group : currentPostLink" data-action="share/whatsapp/share">
                                      <img src="https://groupsor.link/assets/images/whatsapp.png" width="24" height="24" alt="Share on Whatsapp" title="Share on Whatsapp" rel="nofollow"></a>

                                  <a href="https://twitter.com/intent/tweet?text=Follow this link to Join my Telegram group : &amp;url=currentPostLink" target="_blank" rel="nofollow">
                                      <img src="https://groupsor.link/assets/images/twitter.jpg" width="24" height="24" alt="Share on Twitter" title="Share on Twitter"></a>
                              </div>
                          </div>
                      </div>
                  </div>
  `;
    function imgError(image) {
        image.onerror = "";
        image.src = "https://w7.pngwing.com/pngs/419/837/png-transparent-telegram-icon-telegram-logo-computer-icons-telegram-blue-angle-triangle-thumbnail.png";
        return true;
    }
  function insertBlock(groupName, groupLink, groupLogo, groupCount, groupType, groupDescri) {
      var resultDiv = document.getElementById("results");
      newDiv = document.createElement('div'); //create a div
      newDiv.className = "maindiv";
      var tag = groupBlock;
      tag = tag.replaceAll('groupName', groupName);
      tag = tag.replaceAll('groupLogo', groupLogo);
      tag = tag.replaceAll('groupLink', groupLink);
      tag = tag.replaceAll('groupCount', groupCount);
      tag = tag.replaceAll('groupType', groupType);
      tag = tag.replaceAll('grouplinkText', groupLink.split("/").pop());
      tag = tag.replaceAll('groupDescri', groupDescri);
      tag = tag.replaceAll('currentPostLink', document.location.href);


      newDiv.innerHTML = tag; //add an id
      resultDiv.appendChild(newDiv); //append to the doc.body
      resultDiv.insertBefore(newDiv, resultDiv.lastChild)
  }

  function loadMorelink(lastcount) {
      //     alert(tableName,loadButtonid);
      tableName = document.title.split(" Telegram")[0];

      firebase.database().ref(tableName).once("value", function(tableValue) {
          var dataRow = tableValue.val();
          var tableRow = Object.keys(dataRow);
          // console.log(tableValue);
          // alert(tableRow.length);
          for (var t = lastcount; t < tableRow.length; t++) {

              if (t == lastcount + 8) {
                  var loadMoreButton = document.getElementById("LoadMoreLink");
                  tag = "loadMorelink('" + t + "')";
                  loadMoreButton.setAttribute('onclick', tag);

                  // addLoadMoreButton(tableName+"buttonid",t+"sectionId");
                  break;
              }
              var k = tableRow[t];
              var groupName = dataRow[k].groupName;
              var groupLink = "https://t.me/" + dataRow[k].groupLink;
              var groupLogo = dataRow[k].groupLogo;
              var groupCount = dataRow[k].groupCount;
              var groupType = dataRow[k].groupType;
              var groupDescri = dataRow[k].groupDescri;
              // insertRow(groupName, groupLink);
              insertBlock(groupName, groupLink, groupLogo, groupCount, groupType, groupDescri)
                  // console.log(name, url);
              if (t == tableRow.length - 1) {
                  // alert(t+" last link");
                  var loadMoreButton = document.getElementById("LoadMoreLink");
                  loadMoreButton.style.display = "none";
                  break;
              }
          }
          // console.log(tableRow);
      });
  }

  function loadLinks() {
      var i = document.title.split(" Telegram")[0];
      // document.getElementById("tableHead").innerText = i;
      database = firebase.database();
      var ref = database.ref(i);
      ref.once("value", function(tableValue) {
          // console.log(tableValue.val());
          var dataRow = tableValue.val();
          var tableRow = Object.keys(dataRow);
          // console.log(tableRow);
          // console.log(tableValue);
          for (var t = 0; t < tableRow.length; t++) {
              if (t == 8) {
                  // alert("hello");
                  document.getElementById("LoadMoreLink").style.display = "block";
                  var loadMoreButton = document.getElementById("LoadMoreLink");
                  tag = "loadMorelink('" + t + "')";
                  loadMoreButton.setAttribute('onclick', tag);
                  break;
              }
              var k = tableRow[t];
              // var url = "https://bikespeci.blogspot.com/p/gateway.html?telelink=" + dataRow[k].groupLink;
              //                 var url = "https://chat.whatsapp.com/" + dataRow[k].groupLink;
              var groupName = dataRow[k].groupName;
              var groupLink = "https://t.me/" + dataRow[k].groupLink;
              var groupLogo = dataRow[k].groupLogo;
              var groupCount = dataRow[k].groupCount;
              var groupType = dataRow[k].groupType;
              var groupDescri = dataRow[k].groupDescri;
              // insertRow(groupName, groupLink);
              insertBlock(groupName, groupLink, groupLogo, groupCount, groupType, groupDescri)
                  // console.log(name, url);
          }
          // console.log(tableRow);
      });

  }

  function move() {
      var elem = document.getElementById("myBar");
      var width = 0;
      var time = 0;
      var id = setInterval(frame, 10 * time);

      function frame() {
          if (width >= 100) {
              clearInterval(id);
              document.getElementById("results").style.display = "block";
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
