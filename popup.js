function click(e) {
  chrome.windows.getAll({populate:true},function(windows){
    var urls = [];
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){      //Collecting all the urls.
        if(tab.url.toString().substring(0, 9) === 'chrome://'){    //checking if it's a chrome:// address, to avoid an error an bad behavior flag
          return;     //Go to the next iteration
        } else {
          urls.push(tab.url + "\n");      //adding to the array with a line break
        }
      });
    });
    copy(urls.join(""));    //join() removes the comma between array items
  });
}

function copy(text) {
  var el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

document.addEventListener('DOMContentLoaded', function() {  //Needed to access the extension html
  document.getElementById("geturls").addEventListener("click", click);
});
