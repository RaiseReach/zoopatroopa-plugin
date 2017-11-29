function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
 
  if ( path )
        cookie_string += "; path=" + escape ( path );
 
  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
Share = {
  vkontakte: function(purl, ptitle, text, pimg) {
    url  = 'http://vkontakte.ru/share.php?';
    url += 'url='          + encodeURIComponent(purl);
    url += '&title='       + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&image='       + encodeURIComponent(pimg);
    url += '&noparse=true';
    Share.popup(url);
  },
  odnoklassniki: function(purl, text) {
    url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
    url += '&st.comments=' + encodeURIComponent(text);
    url += '&st._surl='    + encodeURIComponent(purl);
    Share.popup(url);
  },
  fb: function(purl, ptitle, text, pimg) {
    url  = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]='     + encodeURIComponent(ptitle);
    url += '&p[summary]='   + encodeURIComponent(text);
    url += '&p[url]='       + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    Share.popup(url);
  },
  twitter: function(purl, ptitle) {
    url  = 'http://twitter.com/share?';
    url += 'text='      + encodeURIComponent(ptitle);
    url += '&url='      + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    Share.popup(url);
  },
  mailru: function(purl, ptitle, text, pimg) {
    url  = 'http://connect.mail.ru/share?';
    url += 'url='          + encodeURIComponent(purl);
    url += '&title='       + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&imageurl='    + encodeURIComponent(pimg);
    Share.popup(url)
  },
  pinterest: function(purl, text, pimg) {
    url  = 'https://www.pinterest.com/pin/create/button/?';
    url += 'media='          + encodeURIComponent(pimg);
    url += '&url='       + encodeURIComponent(purl);
    url += '&description=' + encodeURIComponent(text);
    Share.popup(url)
  },
  blogger: function(purl, text) {
    url  = 'https://blogger.com/blog-this.g?';
    url += 't='          + encodeURIComponent(text);
    url += '&u='       + encodeURIComponent(purl);
    Share.popup(url)
  },
  reddit: function(purl, text) {
    url  = 'http://reddit.com/submit?';
    url += 'title='          + encodeURIComponent(text);
    url += '&url='       + encodeURIComponent(purl);
    Share.popup(url)
  },
  tumblr: function(purl, text) {
    url  = 'https://tumblr.com/share?s=&v=3&';
    url += 't='          + encodeURIComponent(text);
    url += '&u='       + encodeURIComponent(purl);
    Share.popup(url)
  },
  linkedin: function(purl, text) {
    url  = 'https://www.linkedin.com/shareArticle?mini=true&';
    url += 'title='          + encodeURIComponent(text);
    url += '&url='       + encodeURIComponent(purl);
    url += '&source='       + encodeURIComponent(purl);
    Share.popup(url)
  },
  stumbleupon: function(purl, text) {
    url  = 'https://www.stumbleupon.com/submit?';
    url += 'title='          + encodeURIComponent(text);
    url += '&url='       + encodeURIComponent(purl);
    Share.popup(url)
  },
  gp: function(purl) {
    url  = 'https://plus.google.com/share?';
    url += 'url='          + encodeURIComponent(purl);
    Share.popup(url)
  },
  skype: function(purl) {
    url  = 'https://web.skype.com/share?';
    url += 'url='          + encodeURIComponent(purl);
    Share.popup(url)
  },

  popup: function(url) {
    chrome.windows.create({'url': url, 'type': 'popup'}, function(window) {});
  }
};

jQuery(function($){
  $('#logout').on('click', function() { 
    delete_cookie ( email );
    delete_cookie ( pass );
    $('#take_info').css('display','none');
    $('#login').css('display','block');
  });
  token = '3VFKpqF>Z3OFB>eF(W0,CWZyp{?]kLMLaKE7^Tl7A_z-F91P[T';
  email = get_cookie('email');
  pass = get_cookie('pass');
  if (get_cookie('email')) {
  	$('#take_info').css('display','block');
  } else {
  	$('#login').css('display','block');
  }
  $('#login_button').on('click', function() { 
  	$('#login .load').css('display', 'block');
  	$('#login_text').html('');
    	email = $('#login_in').val();
    	pass = $('#password_in').val();
    	$.post( "http://pimboo.com/wp-plugin.php", { action: 'login', email:email, pass:pass, device: token})
    	.done(function( data ) {
    		console.log(data);
    		data = JSON.parse(data);
    		if (data['success']) {
    			$('#login').css('display','none');
    			$('#take_info').css('display','block');
    			set_cookie('email',email,2018,01,01);
  			  set_cookie('pass',pass,2018,01,01);
    		} else {
    			$('#login_text').html('Incorrect login or password');
          $('#login .load').css('display', 'none');
    		}
    	});	
  	
  });
  $('#button_scrape').on('click', function() {  
  	$('#button_scrape').css('display', 'none');
  	$('#take_info .load').css('display', 'block');
  	chrome.tabs.query({ currentWindow: true, active: true}, function (tabs) { 
    	$('#take_info_text').text('Wait until we get content');
      $('#textarea iframe').attr('src','http://pimboo.com/iframe.php?&url='+tabs[0].url);
    	$.post( "http://pimboo.com/wp-plugin.php", { action: 'take_info', url: tabs[0].url, email:email, pass:pass})
    	.done(function( data ) {
    		console.log(data);
  			data = JSON.parse(data);
    		$('.pimboo_main2').removeClass('load');
    		if (data['success']) {
    			$('#scrape_info_text').html(data['success']);
          $('#textarea_scraped').val(data['success']);
          content = data['success'];
          $('#take_info').css('display','none');
          $('#scrape').css('display','block');
    		} else {
    			$('#take_info_text').html('We cant find content on this page. Please try another page');
          $('#take_info .load').css('display', 'none');
          $('#button_scrape').css('display', 'block');
    		}
    	});
  	});
  });
  $('#edit').on('click', function() { 
    $('#scrape').css('display','none'); 
    $('#textarea').css('display','block');
  });
  $('#button_post_from_textarea, #button_post_from_scrape').on('click', function() {
  	$('#textarea .load, #scrape .load').css('display', 'block');
    $('#textarea_text, #scrape_text').html('');
  	chrome.tabs.query({ currentWindow: true, active: true}, function (tabs) {
    	$.post( "http://pimboo.com/wp-plugin.php", { action: 'post', url: tabs[0].url, content: content, email:email, pass:pass})
    	.done(function( data ) {
    		console.log(data);
  			data = JSON.parse(data);
    		$('#textarea .load, #scrape .load').css('display', 'none');
    		if (data['success']) {
          $('#textarea').css('display','none'); 
          $('#scrape').css('display','none'); 
          $('#share').css('display','block'); 
          share_url = data['success']['url'];
          share_title = data['success']['title'];
          share_img = data['success']['title'];
          $('#share_url').val(data['success']['url']);
          
    		} else {
          $('#textarea_text, #scrape_text').html('Something went wrong, try again');
    		}
    	});
  	});
  });
  $('#forgot_pass').on('click', function() {  
    chrome.tabs.create({windowId: window.id, url: "http://pimboo.com/wp-login.php?action=lostpassword"});
  });

  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  eventer(messageEvent,function(e) {
    content = e.data;
  },false);

  $('#fb').on('click', function() {  
    Share.fb(share_url,share_title);
  });
  $('#tw').on('click', function() {
    Share.twitter(share_url,share_title);
  });
  $('#gp').on('click', function() {  
    Share.gp(share_url,share_title);
  });
  $('#blogger').on('click', function() {  
    Share.blogger(share_url,share_title);
  });
  $('#reddit').on('click', function() {  
    Share.reddit(share_url,share_title);
  });
  $('#tumblr').on('click', function() {  
    Share.tumblr(share_url,share_title);
  });
  $('#linkedin').on('click', function() {  
    Share.linkedin(share_url,share_title);
  });
  $('#pinterest').on('click', function() {  
    Share.pinterest(share_url,share_title,share_img);
  });
  $('#some').on('click', function() {  
    Share.stumbleupon(share_url,share_title);
  });
  $('#skype').on('click', function() {  
    Share.skype(share_url,share_title);
  });
});