$(document).ready(function() {
    // *** SNOOZE SLIDER ***
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

(function () {
    $(function () {
        return $('.icon').on('click', function () {
            if ($(this).hasClass('on')) {
                return $(this).removeClass('on');
            } else {
                return $(this).addClass('on');
            }
        });
    });
}.call(this));

});
      