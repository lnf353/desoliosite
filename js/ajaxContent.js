;
(function(){
    window.onload = function() {
	var navigation = document.querySelector(".site-parts"),
	    b = document.querySelectorAll('.site-parts')[0],
	    backgroundSiteParts = document.querySelector('.changed-bg'),
	    firstHighlight = document.querySelector(".site-parts").firstElementChild,
	    hrefS,
	    highlightPartOfMenu = function(e) {
		if(e.target.tagName != "A") return;
		firstHighlight.classList.remove('site-parts--highlight-point');
		e.target.classList.add('site-parts--highlight-point');
		firstHighlight = e.target;
		
		if(e.target.getAttribute('href') != "home.html"){
		    backgroundSiteParts.classList.add('site-parts--black-menu');
		} else {
		    backgroundSiteParts.classList.remove('site-parts--black-menu');
		}
	    };
	var makeLogoSliderRun = function(e) {
	    if(e.target.tagName != "SPAN") return;
	    var logoSlider = document.querySelector(".logo-slider"),
		rightArrow = document.querySelector('.logo-slider__right-arrow'),
		list = document.querySelector(".logo-slider__list"),
		logoSliderWidth = logoSlider.getBoundingClientRect().width,
		logoListWidth = list.getBoundingClientRect().width;
	    
	    if(list.offsetWidth <= 340) {
		var logoSliderHeight = logoSlider.getBoundingClientRect().height,
		    logoListHeight = list.getBoundingClientRect().height;
		if(e.target.classList.contains("logo-slider__arrow-left")) {
		    var difference = 0;
		} else {
		    var difference = -logoListHeight + logoSliderHeight - 35;
		}
		list.style.marginTop = difference + "px";
		
	    } else {
		
		if(e.target.classList.contains("logo-slider__arrow-left")) {
		    var difference = 0;
		} else {
		    var difference = -logoListWidth + logoSliderWidth;
		}

		list.style.marginLeft = difference + "px";
	    }
	};
	document.addEventListener('click', highlightPartOfMenu);
	document.addEventListener('click', makeLogoSliderRun);
	navigation.onclick = function(e) {
            var target = e.target;
	    if(target.tagName != "A") return;
	    var hrefS = {
		page: target.getAttribute('href')

	    };
	    hrefS.page1 = hrefS.page.split("/");
	    hrefS.page1.pop();
	    hrefS.page1 = hrefS.page1.join('') + "/";
	    	    
	    history.pushState(hrefS, null, 'http://localhost/desolio.com/' + hrefS.page1 );
	    console.log(hrefS);
	    insertContent(hrefS);
	    e.preventDefault();
	    
	};
	function historyCome(e) {
	    if(location.pathname == "/desoliosite/service/"){
	    	hrefS= {page: 'service/service.html',
	    page1: 'service/'};
	    }
	    if(location.pathname == "/desoliosite/home/"){
	    	hrefS= {page: 'home/home.html',
	    page1: 'service/'};
	    }
	    if(location.pathname == "/desoliosite/contacts/"){
	    	hrefS= {page: 'contacts/contacts.html',
	    page1: 'service/'};
	    }
	    if(location.pathname == "/desoliosite/our-team/"){
	    	hrefS= {page: 'our-team/our-team.html',
	    page1: 'service/'};
	    }
	    if(location.pathname == "/desoliosite/service/"){
	    	hrefS= {page: 'our-blog/our-blog.html',
	    page1: 'service/'};
	    }
	    if(location.pathname == "/desoliosite/portfolio/"){
	    	hrefS= {page: 'portfolio/portfolio.html',
	    page1: 'service/'};
	    }
	    insertContent(hrefS);
    }
	 window.addEventListener('popstate', historyCome);
    };
  

    function insertContent(hrefS) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if(req.readyState == 4) {
 		document.querySelector('.past-content').innerHTML = req.responseText;
		
		var loader = document.querySelector(".past-content");
		var preloader = document.createElement('div');
		preloader.className = "preloader";
		loader.appendChild(preloader);
		var waitForPreloaderToHidden = setTimeout(function(){
		    preloader.classList.add("preloader--hidden");
		    var removeBlock = setTimeout(function() {
			preloader.classList.add("preloader--none-display");
		    },255);
		},50);
		
	    }
	};
	req.open('GET', "http://localhost/desoliosite/" + hrefS.page);
	req.send();
    }
    
   

   
})();

