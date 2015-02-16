$(function() {

  var doctitle = '那些年的春晚男神 - 凤凰娱乐';

  var namehash = {
    feixiang: '费翔',
    pananbang: '潘安邦',
    xiexiaodong: '解晓东',
    caiguoqing: '蔡国庆',
    liudehua: '刘德华',
    xiaohudui: '小虎队',
    maoning: '毛宁',
    linyilun: '林依轮',
    luozhongxu: '罗中旭',
    liming: '黎明',
    xietingfeng: '谢霆锋',
    chenxiaodong: '陈晓东',
    wanglihong: '王力宏',
    zhoujielun: '周杰伦',
    hangeng: '韩庚',
    liminhao: '李敏镐'
  };

  (function() {
    // Fix Andorid top Bug .
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
      $('body').addClass('android');
    }
  })();

  // page slider
  var mySwiper = (function() {
    $('.swiper-container').css('height', $(document).height());

    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'vertical',
      loop: false,
      onSlideChangeEnd: function(swiper) {
        var index = swiper.activeIndex;
        // If user doesn't select ,Don't allow slide
        if(index == '4') {
          if(!$('#userinfo').data('name')) {
            swiper.slideTo(3);
          }
        }

        if(index == '3') {
          if(!$('#page4').data('clicked')) {
            swiper.slideTo(2);
          }
        }

        if(index < 2) {
          $('#arrowdown').addClass('on');
        } else {
          $('#arrowdown').removeClass('on');
        }
      }
    })

    $('#golist').on('click', function() {
      mySwiper.slideTo(3);
      $('#page4').data('clicked','1');
    });

    // mySwiper.slideTo(4);

    return mySwiper;
  })();

  // anim delay setting
  $('.page .order').each(function() {
    var $this = $(this),
        index = $this.index();

    $this.css('transition-delay', (index+1)*0.6 + 's');
  });

  // lazy load img
  $('.js-lazyimg').each(function() {
    var imgurl = $(this).data('lazy');
    $(this).attr('src', imgurl);
  });

  var changeInfo = function(username) {
    var $root = $('#userinfo'),
        $img = $root.find('#infoimg'),
        $btns = $root.find('#userinfo-btn');
        $loading = $root.find('.loading'),
        imgurl = $('#imgurl').attr('src');

    $root.data('name', username);
    // ajust img height
    $img.attr('src', imgurl.replace('dot', username));
    $loading.show();
    $btns.hide();
    $img.load(function() {
      var imgH = $img.height(),
          adjustH;
      if(imgH > 350) adjustH = '60%';
      else if(imgH > 320) adjustH = '70%';
      else if(imgH > 280) adjustH = '80%';
      else $img.css('margin', '10% auto');

      $img.css('width', adjustH);

      $loading.hide();
      $img.addClass('show');
      $btns.show();
    });
  };

  // user list image sprite page4
  (function(mySwiper) {
    var $root = $('#userlist'),
        spriteW = 140,
        spriteH = 184,
        zoom = 0.5;

    $root.find('a').each(function() {
      var index = $(this).index(),
          bgx = -(index%4)*spriteW*zoom,
          bgy = -parseInt(index/4)*spriteH*zoom

      $(this).css('background-position', bgx + "px " + bgy + "px");
    }).click(function() {
      var name = $(this).data('name');
      mySwiper.slideTo(4);
      changeInfo(name);
    });

    // userinfo goback btn
    $('#userinfo #goback').on('click', function () {
      mySwiper.slideTo(3);
      $('#infoimg').removeClass('show')
    });



    $('#userinfo #share').on('click', function () {
      $('#sharemask').addClass('show');
      var name = $('#userinfo').data('name');
      document.title = '我吃掉了'+ namehash[name] +'，你也来吃掉你的男神吧！';
    });

    $('#sharemask').on('click', function () {
      $(this).removeClass('show');
      document.title = doctitle;
    });

  })(mySwiper);

});
