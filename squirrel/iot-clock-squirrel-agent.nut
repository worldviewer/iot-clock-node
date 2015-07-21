// Log the URLs we need
server.log("Turn LED On: " + http.agenturl() + "?seconds=1436936985&snooze=540&onoff=false&week=0000001");
 
function requestHandler(request, response) {
  try {
    alarm <- {
        snooze=540
        seconds=0
        onoff=false
        week="0000000"
    }

    // check if the user sent epochtime as a query parameter
    if ("seconds" in request.query) {
        // convert the query parameter to an integer
        alarm.seconds = request.query.seconds.tointeger() || 0;
        alarm.snooze = request.query.snooze.tointeger() || 540;
        alarm.onoff = request.query.onoff || false;
        alarm.week = request.query.week || "0000000";

        // send "sync" message to device, and send alarm as the data
        device.send("sync", alarm); 
    }
 
    // send a response back saying everything was OK.
    response.send(200, "OK");
  } catch (ex) {
    response.send(500, "Internal Server Error: " + ex);
  }
}
 
// register the HTTP handler
http.onrequest(requestHandler);