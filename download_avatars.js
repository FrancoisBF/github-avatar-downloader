var request = require('request');
console.log("welcome to the GitHub Avatar Downloader!");


function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://api.github.com/repos/jquery/jquery/contributors', cb);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
