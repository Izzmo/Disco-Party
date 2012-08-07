/**
 * Turntable.fm Disco Script
 * Created by Izzmo
 * 
 * If you have any questions or concerns,
 * please email me: me@izzmo.com, or find
 * me in http://tt.fm/dubstep
 */

$(document).ready(function() {
  //if(TURNTABLE_ROOMID != '4f19f8c6590ca21f66002102') return;
  window.partyOn = true;
  window.partyStarted = false;
  var startParty = function() {
    window.partyStarted = true;
    $('#disco-party').remove();
    $('#outer').prepend('<div id="disco-party" style="position:absolute;top:-140px;z-index:2000;left:181px;"><img src="http://izzmo.com/tt/disco/disco-ball-k8-5.gif" alt="Let\'s PARTY!!!!" style="width:160px;" /></div>');
    $('#disco-party').show().animate({
      top: '+=240px'
    }, 2000);
  }
  var endParty = function() {
    window.partyStarted = false;
    $('#disco-party').animate({
      top: '-=240px'
    }, 2000, function() {
      $('#disco-party').remove();
    });
  }
  
  var listener = function(d) {
    if(d.command == 'update_votes' && !window.partyStarted && window.turntable.buddyList.room.upvoters.length >= 15 && window.partyOn)
      startParty();
    if(d.command == 'newsong')
      endParty();
  }
  turntable.addEventListener("message", listener);
  
  var message = $('<div id="bot-message-disco">Izzmo\'s Disco Party. <a href="#" style="text-decoration: none; color: red; font-weight: bold;">Turn off</a></div>');
  message.css({
    position: 'fixed',
    color: 'white',
    top: '45px',
    zIndex: '5000',
    textAlign: 'left',
    paddingLeft: '2px',
    paddingTop: '2px',
    paddingRight: '3px',
    paddingBottom: '2px',
    fontSize: '10px',
    fontFace: 'Verdana'
  });
  message.find('a').on('click', function(e) {
    e.preventDefault();
    window.partyOn = false;
    message.remove();
  });
  $('.header').append(message);
});
