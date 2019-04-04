
function getGameData() {
    // var year = document.getElementById("year").value;
    // var game = document.getElementById("game").value;
    var url = "https://api.mysportsfeeds.com/v1.0/pull/"+game+"/"+year+"/full_game_schedule.json"
    $.ajax
    ({
      type: "GET",
      url: "https://api.mysportsfeeds.com/v1.0/pull/nhl/2017-2018-regular/full_game_schedule.json",
      dataType: 'json',
      async: false,
      headers: {
    
        "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
      },
      success: function (data){
        var datatab = document.getElementById("data")
        datatab.innerHTML = JSON.stringify(data);
      }
    });

}

function nhlDailyUpdate() {
    // var year = document.getElementById("year").value;
    // var game = document.getElementById("game").value;
    var url = "https://api.mysportsfeeds.com/v1.0/pull/"+game+"/"+year+"/full_game_schedule.json"
    $.ajax
    ({
      type: "GET",
      url: "https://api.mysportsfeeds.com/v1.0/pull/nhl/2018-2019-regular/daily_game_schedule.json?fordate=20190404",
      dataType: 'json',
      async: false,
      headers: {
    
        "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
      },
      success: function (data){
        var datatab = document.getElementById("data")
        datatab.innerHTML = JSON.stringify(data);
      }
    });

}

function nflDailyUpdate() {
    var year = document.getElementById("year").value;
    var game = document.getElementById("game").value;
    var url = "https://api.mysportsfeeds.com/v1.0/pull/"+game+"/"+year+"/full_game_schedule.json"
    $.ajax
    ({
      type: "GET",
      url: "https://api.mysportsfeeds.com/v1.0/pull/nfl/2019-playoff/daily_game_schedule.json?fordate=20190112",
      dataType: 'json',
      async: false,
      headers: {
    
        "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
      },
      success: function (data){
        var datatab = document.getElementById("data")
        datatab.innerHTML = JSON.stringify(data);
      }
    });}

    function nbaDailyUpdate() {
        var year = document.getElementById("year").value;
        var game = document.getElementById("game").value;
        var url = "https://api.mysportsfeeds.com/v1.0/pull/"+game+"/"+year+"/full_game_schedule.json"
        $.ajax
        ({
          type: "GET",
          url: "https://api.mysportsfeeds.com/v1.0/pull/nba/2018-2019-regular/daily_game_schedule.json?fordate=20181229",
          dataType: 'json',
          async: false,
          headers: {
        
            "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
          },
          success: function (data){
            var datatab = document.getElementById("data")
            datatab.innerHTML = JSON.stringify(data);
          }
        });}

        function mlbDailyUpdate() {
            var year = document.getElementById("year").value;
            var game = document.getElementById("game").value;
            var url = "https://api.mysportsfeeds.com/v1.0/pull/"+game+"/"+year+"/full_game_schedule.json"
            $.ajax
            ({
              type: "GET",
              url: "https://api.mysportsfeeds.com/v1.0/pull/mlb/2019-regular/daily_game_schedule.json?fordate=20181110",
              dataType: 'json',
              async: false,
              headers: {
            
                "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
              },
              success: function (data){
                var datatab = document.getElementById("data")
                datatab.innerHTML = JSON.stringify(data);
              }
            });}

// curl -X "GET" "https://api.mysportsfeeds.com/v1.0/pull/nhl/2018-2019-regular/daily_game_schedule.json?fordate=20190404" -u "b69e1225-b643-44e2-be88-eb221b:ucla19" --compress


// function nhlDailyUpdate() {
//     //
    
//     $.ajax
// ({
//   type: "GET",
//   url: "https://api.mysportsfeeds.com/v1.0/pull/nhl/2018-2019-regular/daily_game_schedule.json?fordate=20190404,
//   dataType: 'json',
//   async: false,
//   headers: {

//     "Authorization": "Basic " + btoa("b69e1225-b643-44e2-be88-eb221b"+":"+ "ucla19")
//   },
//   success: function (data){
//     alert(data.fullgameschedule.lastUpdatedOn); 
//   }
// });}
