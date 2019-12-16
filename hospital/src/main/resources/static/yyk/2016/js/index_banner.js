//banner
var banner = function(opt){
  var that = this;
  that.now = 0;
  that.image = opt.image || [];
  that.color = opt.color || [];
  that.links = opt.links || [];
  that.size = that.image.length;
  that.timer = {};
  that.auto = 4000;
  that.page = $('.banner-page').html(function(size){
    var html = [];
    for(var i = 0; i < size; i++){
      html.push('<span' + (!i ? ' class="now"' : '') + '></span>');
    };
    return html.join('');
  }(that.size)).find('span').click(function(){
    that.show($(this).index())
  });
  that.box = $('.index-top').prepend('<a class="index-link" target="_blank"></a>').mouseover(function(event) {
    clearTimeout(that.timer);
  }).mouseleave(function(event) {
    that.timer = setTimeout(function(){
      that.show(++that.now % that.size);
    }, that.auto);
  });;
  that.link = that.box.find('.index-link');
  that.show(0);
};
banner.prototype.show = function(n) {
  var that = this;
  clearTimeout(that.timer);
  that.now = n;
  that.box.css({
    'background-image': 'url(' + that.image[n] + ')',
    'background-color': that.color[n]
  });
  that.link.attr('href', that.links[n]).toggle(that.links[n] == '' ? !1 : !0);
  that.page.removeClass('now').eq(n).addClass('now');
  that.timer = setTimeout(function(){
    that.show(++that.now % that.size);
  }, that.auto);
};




