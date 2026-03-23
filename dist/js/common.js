window.addEventListener("DOMContentLoaded", function(){
	//toggle
	let toggle = document.getElementById('toggle');
	let menu = document.getElementById('menu');

	toggle.onclick=function(){
		this.classList.toggle('open');
		menu.classList.toggle('open');
	}
});

    