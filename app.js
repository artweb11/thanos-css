(function(){

    document.querySelector('#form').addEventListener('submit', function(e){
        e.preventDefault();
        var url = '/.netlify/functions/screenshot?url='+document.querySelector('#web').value.replace('http://', 'https://');

        var cs = window.getComputedStyle( document.querySelector('#site'), false );
        var w = parseInt( cs.getPropertyValue('width') );
        var h = parseInt( cs.getPropertyValue('height') );
        console.log( w, h );
        url += '&width='+w+'&height='+h;

        document.querySelector('#site').innerHTML = '<iframe id="ifr" src="'+url+'" width="'+w+'px" height="100%" frameborder="0" onload="loadIFR()"></iframe>';

        document.body.classList.add('loaded');
        window.real = document.body;

        window.loadIFR = function(){
            window.real.classList.add('halved');
        }
    }, false);


    

})();