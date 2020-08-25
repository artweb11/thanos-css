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
        }).then( function(r){
            return r.arrayBuffer()}
        )        
        .then( function( ab ){
            return URL.createObjectURL( new Blob( [ ab ], { type: 'image/png' } ) )
        })
        .then(function( src ){
            var img = document.createElement('img');
            img.src = src;

            img.onload = function(){
                var c = document.createElement('canvas');
                c.width = ~~(w/2);
                c.height = h;
                c.style.cssText = 'position: absolute; right:0;top:0;';
                document.querySelector('#clone').appendChild( c );

                var ctx = c.getContext('2d');
                ctx.drawImage( img, ~~(w/2), 0, w, h, 0, 0, w, h );
            }

            document.querySelector('#site').appendChild( img );

        
            document.body.classList.add('loaded');
            window.real.classList.add('halved');
        }).catch( function( e ){
            console.log( e );
        });
        

        
        window.real = document.body;

        window.loadIFR = function(){
            window.real.classList.add('halved');
        }
    }, false);


    

})();