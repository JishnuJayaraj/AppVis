function loadAssignmentByTag(path) {
  var tag = document.URL.split("#")[1];

  //add error description to renderwindows:
  for (var r of document.getElementsByClassName("renderwindow"))
    if (!r.innerHTML)
      r.innerHTML =
        "<div class='description'>If you see this text, probably a module didn't load.<br>Some modules need some time.<br>If nothing happens, try reloading the page.<br>If the problem persists follow <a href='../../help.html'>this</a>.</div>";

  showSampleSolution = false; // this is really meant to be global !!
  if(tag){
    showSampleSolution = true; 
  }

  // load path
  var el = document.createElement("script");
  el.type = "module";
  el.src = path;
  document.body.appendChild(el);

  if (tag) {
    var R = document.getElementById("root");
    h = R.offsetHeight;
    el = document.createElement("div");
    // add some watermarks (named by tag) to the page
    for (var i = 0; i < h; i++) {
      //el.innerHTML += tag + '<br><br>';
      var a = document.createElement("div");
      a.innerText = tag;
      a.style.paddingTop = a.style.paddingBottom =
        Math.floor(0.25 * innerHeight) + "px";
      el.appendChild(a);
      i += innerHeight * 0.6;
    }
    el.classList.add("watermark");
    el.style.height = h + "px";
    document.body.appendChild(el);

    var back = document.createElement("a");
    back.href = document.URL.split("#")[0];
    back.classList.add("assignmentlinkback");
    back.appendChild(document.createTextNode("Back to Assignment"));
    //R.insertBefore(back, R.childNodes[0]);
    document.body.appendChild(back);
  }
}

// reload page on hash change
window.onhashchange = function() {
  window.location.reload();
};

// back to index.html link (fixed bottom left)
var toIndexLink = document.createElement("a");
toIndexLink.classList.add("indexlink");
toIndexLink.appendChild(document.createTextNode("Home"));
toIndexLink.href = "../../index.html";
document.body.appendChild(toIndexLink);

// setup answers for theoretic questions

{
  var A = document.getElementsByClassName("answer");
  for (var a of A) {
    if (a.classList.contains("hidden") || a.classList.contains("shown"))
      continue;
    a.classList.add("card");
    a.classList.add("card-body");
    a.classList.add("shown");
    var b = document.createElement("div");
    b.classList.add("hidden");
    b.classList.add("answer");
    b.classList.add("card");
    b.classList.add("card-body");
    b.innerHTML = "..." + a.title + "...";
    a.parentNode.insertBefore(b, a);
    a.classList.add("invisible");
    a.addEventListener(
      "click",
      ((a, b) => e => {
        a.classList.add("invisible");
        b.classList.remove("invisible");
      })(a, b)
    );
    b.addEventListener(
      "click",
      ((a, b) => e => {
        b.classList.add("invisible");
        a.classList.remove("invisible");
      })(a, b)
    );
  }
}
