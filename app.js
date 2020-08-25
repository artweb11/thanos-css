(function(){    

    document.querySelector('#form').addEventListener('submit', function(e){
        e.preventDefault();
        var u = document.querySelector('#web').value;
        if( u.indexOf('http://') != -1 ){
            u = u.replace('http://', 'https://');
        } else {
            u = 'https://'+u;
        }
        var url = 'http://thanos-css.netlify.app/.netlify/functions/screenshot?url='+u;

        var cs = window.getComputedStyle( document.querySelector('#site'), false );
        var w = parseInt( cs.getPropertyValue('width') );
        var h = parseInt( cs.getPropertyValue('height') );
        // console.log( w, h );
        url += '&width='+w+'&height='+h;

        /*
        document.querySelector('#site').innerHTML = '<iframe id="ifr" src="'+url+'" width="'+w+'px" height="100%" frameborder="0" onload="loadIFR()"></iframe>';*/
        document.body.classList.add('loading');

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
                // var img = document.createElement('img');
                // img.src = src;
                // img.style.cssText = 'position: absolute;right:0;top:0;';
                // document.querySelector('#clone').appendChild( img );

                var c = document.createElement('canvas');
                c.width = ~~(w/2);
                c.height = h;
                c.style.cssText = 'position: absolute; right:0;top:0;';
                document.querySelector('#clone').appendChild( c );

                var ctx = c.getContext('2d');
                ctx.drawImage( img, ~~(w/2), 0, w, h, 0, 0, w, h );

                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                window.real.classList.add('halved');

                setTimeout( function(){
                    disintegrate( ctx, ~~(w/2), h, 4, 4, function(){
                        document.body.classList.add('thanos');
                    } );
                }, 1000 );
            }

            document.querySelector('#site').appendChild( img );

        
            
        }).catch( function( e ){
            alert('The site took more than 10 seconds to load. Please try another site.');
        });
        

        
        window.real = document.body;

        window.loadIFR = function(){
            window.real.classList.add('halved');
        }
    }, false);

    function disintegrate( ctx, w, h, cols, rows, cb ){
        var mx = Math.ceil(w/cols);
        var my = Math.ceil(h/rows);
        var cw = Math.ceil( w/mx );
        var ch = Math.ceil( h/my );
        var arr = [];

        var imd = ctx.createImageData( cw, ch );
        for (let i = 0; i < imd.data.length; i += 4) {
            imd.data[i + 3] = 0;  // A value
        }

        for( var i=0; i<my; i++){
            for( var j=0; j<mx; j++){
                arr.push( {x: j*cw, y: i*ch, val: Math.random()*15, dissapeared: false });
            }
        }

        requestAnimationFrame( anim );


        function anim(){
            // for( var i=0; i<200; i++){
            //     var x = ~~( Math.random()*(w-5) );
            //     var y = ~~( Math.random()*(h-5) );

            //     ctx.fillRect( x, y, 5, 5 );
            // }
            for( var i in arr ){
                arr[i].val -= 0.12;
                if( arr[i].val < 1 ){
                    //ctx.fillRect( arr[i].x, arr[i].y, cw, ch );
                    ctx.putImageData( imd, arr[i].x, arr[i].y );
                    arr[i].dissapeared = true;
                }                
            }
            var ct =  arr.filter( function(i){ return !i.dissapeared }).length;
            // console.log( ct );

            if( ct > 0 ){
                requestAnimationFrame( anim );
            } else {
                cb.call();
            }

        }
        
    }
    

})();