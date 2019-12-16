// yyk_header_location
if($("#yyk_header_location").length > 0) {
    $("#yyk_header_location").find(".xuan").click(function () {
        $("#yyk_header_location").find(".city").fadeIn(300);
    })
    $(document).bind("click",function(e){
        var target  = $(e.target);
        if(target.closest(".city,#yyk_header_location").length == 0){
            $(".city").hide();
        };
        e.stopPropagation();
    })
}
