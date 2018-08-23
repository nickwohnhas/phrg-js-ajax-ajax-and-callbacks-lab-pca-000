$(document).ready(function (){
});
function searchRepositories() {
  let searchTerm = $("#searchTerms").val()
  let repoUrl = `https://api.github.com/search/repositories?q=${searchTerm}`
  $.get(repoUrl, function(response) {
    const repoCollection = response.items.map(function(r){ return( "<p>" + r.name + "</p>"
      + "<p>" + '<a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '" onclick="showCommits(this)">Get Commits</a>'  + "</p>")}).join("")


    $("#results").html(repoCollection)
  }).fail(function(error){
    displayError()
  })
  }
  function showCommits(el) {
    const repo = el.dataset.repository
    const owner = el.dataset.owner
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`

    $.get(url,function(response) {
      console.log(response)
      const commitCollection = response.map(function(r) {
        return(
          `<p> ${r.sha} </p>`
        )
      }).join("")
      debugger
      $("#details").html(commitCollection)
    })
  }
  function displayError(error) {

    $("#errors").html(`I'm sorry, there's been an error. Please try again.`)
  }



  // const req = new XMLHttpRequest()
  // req.addEventListener("load", displayRepositories);
  // req.open("GET", `https://api.github.com/search/repositories?q=${searchTerm}`)
  // req.send()



// function displayRepositories(event, data) {
//   let repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = repos.map(function(r) {
//
//   })
// }
