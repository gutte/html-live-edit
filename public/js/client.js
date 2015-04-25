var socket;
$(document).ready(function($) {

    $(document).on("focus","article#main .editable",function (event) {
        var ee = {
            id: event.target.id,
            tagName: event.target.tagName,
            oldHTML: $( event.target ).html(),
            newHTML: ""
        };
        //console.log('focus '+ee.id);
        
        //lock element globally
        //later

        // listener for blur event
        $(document).on("blur",".editable",function (event) {
            //console.log('blur '+ee.id);
            ee.newHTML = $( "#"+ee.id ).html();
            if (ee.oldHTML == ee.newHTML) {
                
            } else {
                //Sending
                console.log('Sending..');
                socket.send( JSON.stringify(ee) );
            };
        });
        
    });
    
    $('.editable').on('keydown', function(event) {
        if (event.which == 13) { //Enter
            // open up new paragraph
            $(event.target).trigger('blur'); // temporary
            return false; // prevents default action
        }
        if (event.which == 27) { //Esc
            // blur focus
            $(event.target).trigger('blur');
            return false; // prevents default action
        }
        
        // Do some arrow keys
    });
    
    

    socket = new WebSocket("ws://localhost:8081");
    
    socket.onopen = function() {
        console.log("Connection opened");
        //load current values from server
    };
    socket.onclose = function() {
        console.log("Connection closed");
    };
    socket.onerror = function() {
        console.error("Connection error");
    };
    socket.onmessage = function(event) {
        console.log("Received data");
        var ee = JSON.parse(event.data);
        $("#"+ee.id).html ( ee.newHTML );
        event.preventDefault();
    };
});

