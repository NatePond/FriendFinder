// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");



// // ===============================================================================
// // ROUTING
// // ===============================================================================

module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------

  app.get("/", function(req, res) {
    console.log(friendsData);

  });

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);

  });


  app.post("/api/friends", function(req, res) {

    var currentUser = friendsData[friendsData.length-1];
    var splicedArray = friendsData.slice(0, friendsData.length-1);


    for(var i=0; i<splicedArray.length; i++){
    var totalDifference = [] //array for total differences of each person
    var totDifofI = Math.abs(currentUser.scores[1]-splicedArray[i].scores[1])+
    Math.abs(currentUser.scores[2]-splicedArray[i].scores[2])+
    Math.abs(currentUser.scores[3]-splicedArray[i].scores[3])+
    Math.abs(currentUser.scores[4]-splicedArray[i].scores[4])+
    Math.abs(currentUser.scores[5]-splicedArray[i].scores[5])+
    Math.abs(currentUser.scores[6]-splicedArray[i].scores[6])+
    Math.abs(currentUser.scores[7]-splicedArray[i].scores[7])+
    Math.abs(currentUser.scores[8]-splicedArray[i].scores[8])+
    Math.abs(currentUser.scores[9]-splicedArray[i].scores[9])+
    Math.abs(currentUser.scores[10]-splicedArray[i].scores[10]); //total differnce per index
    totalDifference.push(totDifofI);

    var rearray = []; //array for sorting person based off total differences
    rearray.push({
      compositeScore: totalDifference[i],
      person: splicedArray[i]
    })
    rearray.sort(function(a, b){
      return a.compositeScore-b.compositeScore;
    }); //sort based off of total difference
    var matchData = rearray[0].person; //object-person with lowest total difference
    }
    console.log(matchData)

    // res.json(matchData.name + matchData.photo);
    res.json(matchData);


  });


};
