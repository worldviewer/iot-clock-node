// create a global variabled called led, 
// and assign pin9 to it
led <- hardware.pin9;
 
// configure led to be a digital output
led.configure(DIGITAL_OUT);

state <- 0;
blinks <- 6;
currentAlarm <- {
    snooze=540
    seconds=0
    onoff=false
    week="0000000"
}

// function to set Alarm
function setAlarm(alarm) {
  currentAlarm = alarm;
    
  server.log("Set Alarm to Time: " + currentAlarm.seconds);
  server.log("Set Snooze to: " + currentAlarm.snooze);
  server.log("Alarm State is " + currentAlarm.onoff);
  server.log("Week settings are " + currentAlarm.week);
  server.log("Current epoch time on device is " + time());

  diff <- currentAlarm.seconds - time();

  server.log("Difference between alarm and current time is " + diff + " seconds.");
  server.log("That is around " + diff/3600 + " hours.");
  server.log("");
  
  alarmConfirm();
}

// Our confirmation blinks should be blocking, so that we
// get 3 perfect blinks every time; nothing else can happen
// during this time, or the blinks will be interrupted
function alarmConfirm() {
    for (blinks = 6; blinks > 0; blinks--) {
        state = 1-state;

        server.log("Blinks: "+blinks);
        server.log("State: "+state);
        
        led.write(state);
        imp.sleep(0.5);
    }
    
    blinks = 6;
    state = 0;
    led.write(state);
    server.log("");
}
 
// register a handler for "sync" messages from the agent
agent.on("sync", setAlarm);

function checkAlarm() {
  server.log("Checking alarm");
  // Check if current time equals alarm time ...
  
  // If it does, then set the LED to ON for 10 seconds
  if (time() == currentAlarm.seconds && currentAlarm.onoff == "true") {
      led.write(1);
      imp.wakeup(10, checkAlarm);

  // Otherwise, set the LED to OFF
  } else {
      diff <- currentAlarm.seconds - time();
      server.log("Seconds to alarm: "+diff)
      led.write(0);
      imp.wakeup(0.5, checkAlarm);
  }
}
 
// start the loop
checkAlarm();