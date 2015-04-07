var socket;
$(document).ready(function($) {
    $(document).on("click","article#main .edit",function (event) {
        var eid = event.target.id;
        var etag = event.target.tagName;
        var evalue = $( "#"+eid ).html();
        if (etag == "P") {
            $("#"+eid).replaceWith( '<form id="'+eid+'" class="edit-form">'
                +'<textarea rows="5" cols="35" class="edit-input"></textarea>'
                +'<input type="hidden" name="etag" value="'+etag+'" class="etag">'
                +'<input type="submit" value="Edit">'
                +'</form>' ); 
            $("#"+eid+" .edit-input").trigger( "focus" );
            $("#"+eid+" .edit-input" ).html(evalue);
        } else {
            $("#"+eid).replaceWith( '<form id="'+eid+'" class="edit-form">'
                +'<input type="text" size="20" class="edit-input" value="">'
                +'<input type="hidden" name="etag" value="'+etag+'" class="etag">'
                +'<input type="submit" value="Edit">'
                +'</form>' );
            $("#"+eid+" .edit-input").trigger( "focus" );
            $("#"+eid+" .edit-input").val(evalue)
        }
    });
    $(document).on("submit", "article#main form.edit-form", function (event) {
        var eid = event.target.id;
        var etag = $("form#"+eid+" .etag").val();
        //send to server
        var sendData = {
            eid : eid,
            etag : etag,
            val : $("form#"+eid+" .edit-input").val()
        };
        console.log("Sending data");
        socket.send( JSON.stringify(sendData) );
        // set pending gif
        // later
        // sleep and check if updated
        // later
        event.preventDefault();
    });
    
    socket = new WebSocket("ws://127.0.0.1:8081");
    
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
        var data = JSON.parse(event.data);
        var eid = data.eid;
        var etag = data.etag;
        var val = data.val;
        $("#"+eid).replaceWith ( '<'+etag+' id="'+eid+'" class="edit">'+val+'</'+etag+'>' );
        event.preventDefault();
    };
});

