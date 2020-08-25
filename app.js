(function(){

    document.querySelector('#form').addEventListener('submit', function(e){
        e.preventDefault();
        var u = document.querySelector('#web').value.replace('http://', 'https://');
        var url = 'http://thanos-css.netlify.app/.netlify/functions/screenshot?url='+u;

        var cs = window.getComputedStyle( document.querySelector('#site'), false );
        var w = parseInt( cs.getPropertyValue('width') );
        var h = parseInt( cs.getPropertyValue('height') );
        console.log( w, h );
        url += '&width='+w+'&height='+h;

        /*
        document.querySelector('#site').innerHTML = '<iframe id="ifr" src="'+url+'" width="'+w+'px" height="100%" frameborder="0" onload="loadIFR()"></iframe>';*/

        fetch( url, {
            method: "GET",
        }).then(function( e ){
            console.log( e );

            document.body.classList.add('loaded');
            window.real.classList.add('halved');
        });
        

        
        window.real = document.body;

        window.loadIFR = function(){
            window.real.classList.add('halved');
        }
    }, false);


    

})();