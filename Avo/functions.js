$.getJSON("get-data.php?dat=driver",function(data){
    var stringToAppend = "";
    $.each(data,function(key,val) {

       stringToAppend += "<option value='" + val.id + "'>" + val.id + "</option>";

    });

    $("#night_Shift_text").html(stringToAppend);
});