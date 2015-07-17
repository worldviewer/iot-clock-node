$(document).ready(function() {
    // *** SLIDER ***
    $('#ex1').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    });

    // *** DAY SELECTOR ***
    $('.btn[type="button"]').click(function(){
        $(this).toggleClass('grey');
    });

    // *** SYNC BUTTON ***
    // $('#sync-btn').click(function() {

    // });

});
      