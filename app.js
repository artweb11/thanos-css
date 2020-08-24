(function(){

    document.querySelector('#submit').addEventListener('click', function(){
        var url = document.querySelector('#web').value;

        var cs = window.getComputedStyle( document.querySelector('#site'), false );
        var w = parseInt( cs.getPropertyValue('width') );

        document.querySelector('#site').innerHTML = '<iframe id="ifr" src="'+url+'" width="'+w+'px" height="100%" frameborder="0" onload="loadIFR()"></iframe>';

        document.body.classList.add('loaded');
        window.real = document.body;

        window.loadIFR = function(){
            window.real.classList.add('halved');
        }
    }, false);


})();