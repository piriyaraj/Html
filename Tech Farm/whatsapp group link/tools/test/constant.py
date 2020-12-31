import re
import requests 
from bs4 import BeautifulSoup
header="""<p style="text-align: left;">Hi Everyone celebrity&nbsp;<b class="name">HRITHIK ROSHAN</b><b>&nbsp;WhatsApp group links</b>&nbsp;fans groups photos and details&nbsp; You can find every thing about <span class="name">HRITHIK ROSHAN</span>&nbsp;This is the right place to find <b><span class="name">HRITHIK ROSHAN</span> WhatsApp group links</b>&nbsp;The join button link&nbsp;its redirected WhatsApp page and you will get all updates about <span class="name">HRITHIK ROSHAN</span>&nbsp;Join the&nbsp;<span class="name">HRITHIK ROSHAN</span> groups through the WhatsApp group link that we provide</p>
<style media="screen">
	.washare{
		outline: none;
		display: block;
		margin-left: auto;
		margin-right:auto;
		border: 4px solid darkgreen;
		font-size: 40px;
		background-color:#3caf50;
		border-radius:10px;
		font-weight: bolder;
		font-family:sans-serif;
		box-shadow: 4px 5px yellow;

	}
	.washare:focus{
		background-color:lightblue;
		border-radius:20px;
	}
	.washare:active{
		box-shadow: 4px 3px yellow;
		transform: translatey(4px);
	}
	#wajoin{
		font-weight: bolder;
		display: block;
		margin-left: auto;
		margin-right:auto;
		margin-top: 30px;
		margin-bottom: 30px;
		padding: 0px;
		font-size: 40px;
		text-align:center;
		width: 200px;
		border: 2px solid red;
		border-radius: 20px;
		font-size: 20px;

	}
	#wajoin1 {
		width: 200px;
		display: block;
		margin-left: auto;
		margin-right:auto;
		border: none;
		text-align: center;
		font-size: 16px;
	}
	img{
	 	height:auto;
	}
	#wajoin11:disabled{
	  	background-color: #F00A0E;
	}
</style>


   
<div style="text-align: center;"><br />
<h2>Steps to Join</h2>
<h2>1. share with one WhatsApp group</h2>
</div>
<button class="washare" name="button" onclick="washare()" type="button">Share</button>
<div id="wajoin" style="background-color: #4caf20;"></div>
<h2 style="text-align: center;">2.wait until join button Enable</h2>
<button class="washare" disabled="" id="wajoin11" onclick="linkopen()">Share First</button>

<script type="text/javascript">
	var actor_name=document.getElementsByClassName('post-title')[0].innerText.split(" WHATSAPP")[0];
	var link_name=actor_name.replace(" ","_");
	var gplink=window.location.href.split("/2")[0]+"/p/postlinks.html?name="+link_name+"?";


	function linkopen(){
	window.open(gplink, '_blank');
	}

        var count=0;

	function washare() {
		var link=window.location.href;
		var url="whatsapp://send?text=Join  "+document.getElementsByClassName('post-title')[0].innerText+"%0D"+"For new hot photos,videos,biodata and latest news%0D"+link+"%0D%0D"+link+"%0D%0D"+link+"%0D%0D"+link+"%0D%0D"+link;
		window.location=url;
		
                if(count==1){
                    return 0;
                }
		count=1;


		var timeLeft = 120;
		var elem = document.getElementById('wajoin');

		var timerId = setInterval(countdown, 1000);

		function countdown() {

			if (timeLeft == -1) {
				clearTimeout(timerId);
				elem.innerHTML="";

				document.getElementById("wajoin11").removeAttribute("disabled");
				document.getElementById("wajoin11").innerHTML="Join Now";
			}
			else {
				if(timeLeft<115){
					elem.innerHTML = 'Wait ' +timeLeft + ' seconds';
					var m=timeLeft%4;
					if(m==0){
						logo=">>>";
					}
					else if(m==1){
						logo=">>";
					}
					else if(m==2){
						logo=">";
					}
					else{
						logo=">>";
					}
					document.getElementById("wajoin11").innerHTML="Wait"+logo;
				}

				timeLeft--;
			}
		}
	}
</script>

   <div style="text-align: center;">=============================================<span><!--more--></span></div>"""

footer="""<p class="MsoNormal" style="text-align: center;"><span style="color: black; mso-themecolor: text1;"><o:p>&nbsp;</o:p></span><span style="text-align: left;">==============================</span></p>
<p class="MsoNormal" style="text-align: center;"><span style="text-align: left;">
</span></p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="line-height: normal; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><span style="font-family: Georgia, serif;"><span style="font-size: 13.5pt;">HRITHIK ROSHAN Fans </span><span style="font-size: 18px;">WhatsApp</span><span style="font-size: 13.5pt;">&nbsp;groups links, online jobs groups and promotion
groups.</span></span><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 13.5pt;"><o:p></o:p></span></p><p class="MsoNormal"><o:p><br /></o:p></p><p class="MsoNormal"></p><h3 style="text-align: center;"><i>&nbsp;</i><span style="color: black;"><b><i> <span style="background-color: #04ff00;"><a href="https://www.whatsappgrouplinker.tk/p/sitemap.html" target="_blank">JOIN OTHER GROUPS</a></span></i></b></span><br /></h3><br /><p></p><p style="text-align: left;">If you have any suggestion or complaint about HRITHIK ROSHAN WhatsApp group you can put it into the comment section .<br />and if you have WhatsApp group links for promote you also put the details in the comment.</p><p style="text-align: left;"><br />And you can add your WhatsApp groups here. if you want to add your groups you can add your WhatsApp group details and sent through the contact form.<br />You can promote your business also. contact now.<br /><span>&nbsp;</span><br /><span style="font-size: medium;">submit you link .</span></p><p style="text-align: left;"><span style="font-size: medium;">Limited Chance now you can add your WhatsApp group links in this site.<br /></span></p><div style="text-align: left;"><h3 style="text-align: center;"><span style="color: black;"><b><i>&nbsp;<span style="background-color: #04ff00;"><a href="https://www.whatsappgrouplinker.tk/p/add-your-whatsapp-group-links.html" target="_blank">Add Your WhatsApp Group</a></span></i></b></span></h3></div>"""


table_head="""<span style="color: black;background: aqua; mso-highlight: aqua;">HRITHIK ROSHAN WhatsApp Group</span>"""

url="https://www.whatsappgrouplinker.tk/sitemap.xml"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
wa_links=re.findall(r'<loc>(.+?)</loc>',soup.prettify().replace("\n","").replace(" ",""))
