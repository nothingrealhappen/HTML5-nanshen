$(function() {

  var doctitle = '那些年的春晚小鲜肉 - 凤凰娱乐';

  var namehash = {
    feixiang: '费翔',
    pananbang: '潘安邦',
    xiexiaodong: '解晓东',
    caiguoqing: '蔡国庆',
    xiaohudui: '小虎队',
    maoning: '毛宁',
    linyilun: '林依轮',
    luozhongxu: '罗中旭',
    xietingfeng: '谢霆锋',
    chenxiaodong: '陈晓东',
    wanglihong: '王力宏',
    hangeng: '韩庚',
    liminhao: '李敏镐',
    luhan: '鹿晗',
    wuyifan: '吴亦凡',
    chenweiting: '陈伟霆'
  };

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

        if(index < 3) {
          $('#arrowdown').addClass('on');
        } else {
          $('#arrowdown').removeClass('on');
        }
      }
    })

    $('#golist').on('click', function() {
      mySwiper.slideTo(3);
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
        imgurl = 'assets/images/user/',
        $img = $root.find('#infoimg'),
        $btns = $root.find('#userinfo-btn');
        $loading = $root.find('.loading');

    $root.data('name', username);
    // ajust img height
    $img.attr('src', imgurl + username + '.png');
    $img.hide();
    $loading.show();
    $btns.hide();
    $img.load(function() {
      if($img.height() < 330) {
        $img.css('width', '80%');
        if($img.height() < 280) {
          $img.css('margin', '10% auto');
        }
      } else {
        $img.css('width', '70%');
      }
      $loading.hide();
      $img.show();
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
    });

    $('#userinfo #share').on('click', function () {
      $('#sharemask').addClass('show');
      var name = $('#userinfo').data('name'),
          sharepicurl = 'assets/images/user/';
      document.title = '我吃掉了'+ namehash[name] +'，你也来选一款春晚小鲜肉尝尝吧！';
    });

    $('#sharemask').on('click', function () {
      $(this).removeClass('show');
      document.title = doctitle;
    });

  })(mySwiper);

});
