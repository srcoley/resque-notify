/*jQuery(document).ready(function($) {
	$('input:checkbox.pause').click( function(){
		var queue = $(this);
		var data = {'queue_name': queue.val(), 'pause': queue.is(':checked')};
		$.ajax({
		  type: 'POST',
		  url: location.href,
		  data: data,
		  async: false,
		  cache: false,
		  success: function() { return true; },
		  error: function() { return false; },
		  dataType: 'json'
		});

	});
});*/

(function(){
  var failedCount = null;
  var checkFailedInterval;

  function getNotificationPrivileges(){
    if (Notification.permission !== "granted")
      Notification.requestPermission();
  }

  function checkFailedCount(){
    var failedTd = $('td.queue.failed');
    var newFailedCount = parseInt(failedTd.next().text());
    if( failedCount === null ) {
      failedCount = newFailedCount;
    } else if ( newFailedCount > failedCount ) {
      failedCount = newFailedCount;
      notifyFailed(newFailedCount, failedTd);
    } else if ( newFailedCount < failedCount) {
      failedCount = newFailedCount;
    }
  }

  function notifyFailed(newFailedCount, failedTd) {
    var failedLink = failedTd.find('a').attr('href');
    var notification = new Notification('Resque Job Failed', {
      icon: 'https://pbs.twimg.com/profile_images/456473652515463169/xXR95uqW_normal.png',
      body: "A Resque Job has failed. Count: " + newFailedCount
    });
    clearInterval(checkFailedInterval);
    startInterval();

    notification.onclick = function(){
      window.open(failedLink);
    }
  }

  function startInterval(){
      checkFailedInterval = setInterval(checkFailedCount, 2000);
  }

  function startMonitoring(){
    getNotificationPrivileges();
    startInterval();
  }

  startMonitoring();
})();
