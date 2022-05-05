function cmp_time(time1, time2) {
    /* 
    Compare 2 time spots (yyyy/mm/dd)
    
    Returns true if time1 is later
    */

    time1 = time1.split("/");
    time2 = time2.split("/");

    if (time1[0] == time2[0]){
        if (time1[1] == time2[1]){
            return (time1[2] >= time2[2]);
        }
        else
            return (time1[1] > time2[1]);
    }
    else
        return (time1[0] > time2[0]);
}

function new_year(time1, time2) {
    /*
    Compare the years of two time spots (yyyy/mm/dd)

    Returns:
        0 if the years are the same
        later year if the years are not the same
    */

    time1 = time1.split("/");
    time2 = time2.split("/");
    if (time1[0] > time2[0]) {
        return time1[0];
    }
    else
        return 0;
}

$.get('https://chiayi-fu-658101.middle2.me/sheet.php?type=g0vnews', function(content) {
    var ret_dmst = $.csv.toArrays(content);
    $.get('https://chiayi-fu-658101.middle2.me/sheet.php?type=g0vnewsintl', function(content) {
        var ret_intl = $.csv.toArrays(content);
        var cnt_dmst = 8, cnt_intl = 4;
        let prev_time = "0/0/0";
        
        $('#list').append($('<a href="#year2022">2022</a>')); // Link for testing
        
        // Sort the news according to publish time
        while(cnt_dmst < ret_dmst.length || cnt_intl < ret_intl.length) {
            if (cnt_intl == ret_intl.length) {
                time = ret_dmst[cnt_dmst];
                direction = "left";
                cnt_dmst += 1;              
            }
            else if (cnt_dmst == ret_dmst.length) {
                time = ret_intl[cnt_intl];
                direction = "right";
                cnt_intl += 1;
            }
            else if (cmp_time(ret_dmst[cnt_dmst][1], ret_intl[cnt_intl][1])) {
                time = ret_dmst[cnt_dmst];
                direction = "left";
                cnt_dmst += 1;   
            }
            else {
                time = ret_intl[cnt_intl];
                direction = "right";
                cnt_intl += 1;
            }

            if (year = new_year(prev_time, time[1]))
                $('#list').append($('<div class="container left"><div class="content"><p style="font-size:250%" id="year' + year + '"><span>' + year + '</span></p></div></div>'));
            prev_time = time[1];
            $('#list').append($('<div class="container ' + direction + '"><div class="content"><a href="' + time[4] + '" target="_blank">' + time[0] + '</p></a><p>' + time[1] + ' ' + time[2] + ' ' + time[3] +  '</p></div></div>'));
        }

        //$('#list').append($('<a href="#year2022">2022</a>'));  // Link for testing

    }, 'text')
}, 'text')
