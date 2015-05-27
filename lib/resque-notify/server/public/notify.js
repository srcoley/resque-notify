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
      //notifyFailed(newFailedCount, failedTd);
      getFailed();
    } else if ( newFailedCount < failedCount) {
      failedCount = newFailedCount;
    }
  }

  function notifyFailed(failedClassText, failedError) {
    var failedLink = $('td.queue.failed').find('a').attr('href');
    var notification = new Notification(failedClassText + ' Failed', {
      icon: 'https://pbs.twimg.com/profile_images/456473652515463169/xXR95uqW_normal.png',
      body: "Exception Raised: " + failedError
    });
    clearInterval(checkFailedInterval);
    startInterval();

    notification.onclick = function(){
      window.open(failedLink);
    }
  }

  function getFailed(){
    $.ajax({
      dataType: 'text',
      type: 'get',
      url: "http://mobi.mobi.dev/resque/failed.poll",
      success: function(data) {
        parseFailed($(data));
      }
    });
  }

  function parseFailed(failedData){
    var failedLi = failedData.filter('.failed').find('li:first');
    var failedClass = failedLi.find("dt:contains('Class')").next();
    var failedClassText = failedClass.find('a code').text();
    var failedError = failedLi.find("dd.error .backtrace").text();
    notifyFailed(failedClassText, failedError);
  }

  function startInterval(){
    checkFailedInterval = setInterval(checkFailedCount, 2000);
  }

  function startMonitoring(){
    getNotificationPrivileges();
    startInterval();
  }

  $(function(){
    var pollLink = $('a[rel=poll]');
    if( pollLink.length != 0) {
      pollLink.click(function(){
        startMonitoring();
      });

      var pollEvent = pollLink.data("events").click[3]
      pollLink.data("events").click[3] = pollLink.data("events").click[4]
      pollLink.data('events').click[4] = pollEvent;
    }
  });
})();
