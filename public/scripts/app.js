$(document).ready(function() {
    var onoff = false;
    var hours;
    var minutes;
    var ampm;

    $('.container').bind('custom-event', function(e){
        $("#sync-btn").prop('value', 'Please Sync!');
        $("#sync-btn").removeClass('active');
        console.log("button changed");
    });



    // *** SNOOZE SLIDER ***
    $('#ex1').slider({
        formatter: function(value) {
            $('.container').trigger('custom-event');
            return value + " Minutes";
        }
    });

    // *** DAY SELECTOR ***
    $('.btn[type="button"]').click(function(){
        $('.container').trigger('custom-event');
        $(this).toggleClass('grey');
    });

    // *** ON/OFF BUTTON ***
    (function () {
        $(function () {
            return $('.icon').on('click', function () {
                if ($(this).hasClass('on')) {
                    $('.container').trigger('custom-event');
                    onoff = false;
                    return $(this).removeClass('on');
                } else {
                    $('.container').trigger('custom-event');
                    onoff = true;
                    return $(this).addClass('on');
                }
            });
        });
    }.call(this));

// *** SYNC BUTTON ***
    $('#sync-btn').on('click', function() {

        $(this).prop('value', 'Synced');
        $(this).toggleClass('active');




        var seconds = parseInt((new Date()).getTime()/1000);

        // Get the current date
        var objToday = new Date(),
            weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
            dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
            curMonth = months[objToday.getMonth()],
            curYear = objToday.getFullYear(),
            curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
            curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
            curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
            curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
        var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        // Grab days of the week
        var monday = $('#monday').hasClass('grey');
        var tuesday = $('#tuesday').hasClass('grey');
        var wednesday = $('#wednesday').hasClass('grey');
        var thursday = $('#thursday').hasClass('grey');
        var friday = $('#friday').hasClass('grey');
        var saturday = $('#saturday').hasClass('grey');
        var sunday = $('#sunday').hasClass('grey');

        // Convert day settings to a binary sequence, to simplify http request object
        var week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
        var weekBinary = '';
        week.forEach(function(element, index){
            weekBinary += (element ? '1' : '0');
        });

        // Check conversion to binary
        console.log('');
        console.log('Day settings, in array form:');
        console.log(week);

        console.log('Day settings, in binary string form: '+weekBinary);

        // Snooze Time
        var snooze = $('#ex1').val()*60;

        // The problem is that we can get current time in "Epoch UNIX seconds to 1970",
        // but we are setting our alarm relative to the last midnight.  So, we need to
        // send the imp the number of seconds to the alarm, since 1970.

        console.log('');
        console.log("Seconds from 1970 to now: "+seconds);
        console.log("Seconds from midnight to hours: "+curHour*60*60);
        console.log("Seconds from midnight to minutes: "+curMinute*60);

        // To get seconds from 1970 to last midnight, subtract hours, minutes and seconds
        // (in seconds)
        var midnight = seconds - curHour*3600 - curMinute*60 - curSeconds;
        midnight = (curMeridiem == "AM") ? midnight : (midnight - 43200);
        console.log("Seconds from 1970 to today's midnight: "+ midnight);

        // alarmSeconds is number of seconds since midnight to alarm
        // Note that if it is not defined, and the alarm is nevertheless synced,
        // it will assume the default alarm clock time of noon
        var alarmSeconds = hours*3600 + minutes*60 || 0;
        alarmSeconds = (ampm === "am") ? alarmSeconds : alarmSeconds + 43200;
        console.log("Alarm seconds from last midnight: "+alarmSeconds);

        // The value we want to send to the imp is the sum of our alarm seconds
        // with seconds since 1970 to last midnight
        var impSeconds = midnight + alarmSeconds;
        console.log("impSeconds, Seconds to midnight since 1970 + Alarm seconds since midnight: "+impSeconds);
        console.log('');

        // var dataString = 'onoff='+onoff+'&monday='+monday+'&tuesday='+
        //     tuesday+'&wednesday='+wednesday+'&thursday='+thursday+'&friday='+
        //     friday+'&saturday='+saturday+'&sunday='+sunday+'&seconds='+
        //     impSeconds+'&snooze='+snooze;

        var dataString = 'onoff='+onoff+'&week='+weekBinary+'&seconds='+impSeconds+'&snooze='+snooze;

        console.log('URL parameters to send to imp:');
        console.log(dataString);
        console.log('');

        $.ajax({
            type: "POST",
            url: 'led',
            data: dataString,
            success: function() {

            }
        })
    });


    $(".knob.hour").knob({
        change : function (value) {

            hours = Math.round(value % 12);
            hours = (hours === 0) ? 12 : hours;

            $("#hour-label").text(hours);

            // var hr = Math.floor(hours);

            ampm = value >= 12.0 ? "pm": "am";

            $("#am-pm").text(ampm);

            console.log(Math.floor(value/2))
            console.log(value);


        },
        release : function (value) {
            $('.container').trigger('custom-event');
            hours = parseInt(value % 12);

        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
            return value + '%';
        },*/
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

    $(".knob.minute").knob({
        change : function (value) {
            minutes = Math.round(value);
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            $("#min-label").text(minutes);

            console.log("mins: " + minutes);
        },
        release : function (value) {
            $('.container').trigger('custom-event');
            console.log("release : " + value);
        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
            return value + '%';
        },*/
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

});
      