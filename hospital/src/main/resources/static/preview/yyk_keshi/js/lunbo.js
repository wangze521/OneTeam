
$(document).ready(function(){

    $('#slider').cycle({
        fx:      'scrollHorz',
        timeout:  0,
        prev:    '#prev',
        next:    '#next',
		speed: 800,
		timeout: 6000, 
		cleartype:  true,
		slideExpr: '.item',
        pagerAnchorBuilder: pagerFactory
    });
	
	$('#ques_slider').cycle({
        fx:      'scrollHorz',
        timeout:  0,
        prev:    '#prev_a',
        next:    '#next_a',
		speed: 800,
		timeout: 6000, 
		cleartype:  true,
		slideExpr: '.professor_ques_main_a',
        pagerAnchorBuilder: pagerFactory
    });

	$('#slider1').cycle({
        fx:      'scrollHorz',
        timeout:  0,
        prev:    '#prev_b',
        next:    '#next_b',
		speed: 800,
		timeout: 6000, 
		cleartype:  true,
		slideExpr: '.item1',
        pagerAnchorBuilder: pagerFactory
    });

    function pagerFactory(idx, slide) {
        var s = idx > 2 ? ' style="display:none"' : '';
        return '<li'+s+'><a href="#"  class="nav_button"><span>'+(idx+1)+'</span></a></li>';
    };
    
});

