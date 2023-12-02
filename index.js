:javascript
  var aws_wss = "ws://162.243.120.86:3010";
  window.socket = undefined;
  window.make_circle = function(remote_id) {
    return new paper.Path.Circle({
      radius: 50,
      fillColor: "red",
      position: paper.view.center,
      remote_id: remote_id,
      name: "DotC"
    });
  };

  $(function() {
    window.app = new PaperJSApp({
      canvas: $('canvas'),
      name: "MassControl"
    });
    alertify.set('notifier', 'position', 'bottom-left');
    console.log("calling start socket here")
    start_socket()
  });

  function start_socket() {
    WEBSOCKET_ADDRESS = "ws://162.243.120.86:3010"
    var connection = new WebSocket(WEBSOCKET_ADDRESS);
    connection.onopen = function(event){ 
        make_circle()
        $("button#connect").addClass("green-background");
        $("button#connect").prop('disabled',true);
        $("button#connect").removeClass("red-background");
    }
    connection.onclose = function(event){
      $("button#connect").prop('disabled',false);
      $("button#connect").removeClass("green-background");
      $("button#connect").addClass("red-background");
    }
    var itemsMine; 
    connection.onmessage = function(event){
      var unstringified = JSON.parse(event.data);
      console.log("hel",unstringified.remote_id)
      itemsMine = paper.project.getItems({
          name: "DotC"
        });
      console.log("itemsss inside onmessage is ",itemsMine)
      var cir = itemsMine[0]
      console.log("whoooooo",unstringified.remote_id)
      cir["remote_id"] = unstringified.remote_id
      console.log("remoteiddd issss", cir)      
      if (cir["remote_id"] = unstringified.remote_id)
      {
        cir.position.x = cir.position.x+10
      }
      newParsedObject = JSON.parse(event.data);
       console.log("Server >>",newParsedObject)
    }
    connection.onerror = function(event){
       alertify.error('Error message');
       alertify.error(event.message);
    }
    return connection;
  }

/ DO NOT MODIFY CODE UNDER THIS LINE      
:scss
  html, body, #sandbox{
    width: 100%;
    height: 100%;
    overflow:hidden;
  }
  canvas{
    border: 1px solid blue;
    background: lighten(blue, 40%);
  }


#sandbox
  %canvas{resize: "resize"}

