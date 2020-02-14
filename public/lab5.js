const artistlist = document.getElementById("artist-container"),
      addform = document.getElementById("addform"),
      searchbox = document.getElementById("search-box"),
      searchfunc = document.getElementById("search-functionality");

let artists;

window.onload = () => {
  fetch('/aj').then((response) => {
    return response.json();
  })
  .then((myJson) => {
    artists = myJson;
    myJson.forEach(element => {
      AddElement(element);
    });
  });
}

searchfunc.addEventListener("keyup", () => {
  for(let j = 0; j < artistlist.childElementCount; j++){
    let name = artistlist.children[j].children[2].children[0].textContent;

    if((name.toLowerCase()).indexOf(searchfunc.value)==-1)
      artistlist.children[j].style.display = "none";
    else
      artistlist.children[j].style.display = "block";
  }
});

const Delete = (artist) => {
  let i = 0;

  for(;;++i)
    if(artistlist.children[i] == artist)
      break;

  i = artists.length - 1 - i;

  postData('/', {num: i})
  .then((i) => {
  });

  artists.splice(i, 1);
  //console.log(artists)
  artistlist.removeChild(artist)
};

const Add = () => {
  searchbox.style.height = "250px";
  addform.style.display = "block";
}
const AddArtist = (f) => {
  let data = {
    name: f.children[0].value,
    desc: f.children[1].value,
    img: f.children[2].value};

  postData('/aj', data)
  .then((data) => {
  });
  
  AddElement(data);
  artists.push(data);

  addform.style.display = "none";
  f.children[0].value = f.children[1].value = f.children[2].value = "";
  searchbox.style.height = "100px";
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response; // parses JSON response into native JavaScript objects
}

const AddElement = (element) => {
  let cont = document.createElement("div"),
      img = document.createElement("img"),
      btn = document.createElement("button"),
      indiv = document.createElement("div"),
      h3 = document.createElement("h3"),
      p = document.createElement("p");
  
  h3.innerHTML = element.name;
  p.innerHTML = element.desc;
  img.src = element.img;

  cont.className = "artist bordering";

  btn.className = "delete";
  btn.onclick = () => Delete(cont);
  btn.innerHTML = "Delete";

  indiv.className = "artist-info";

  indiv.appendChild(h3);
  indiv.appendChild(p);

  cont.appendChild(img);
  cont.appendChild(btn);
  cont.appendChild(indiv);

  //artistlist.appendChild(cont);
  artistlist.insertBefore(cont, artistlist.firstChild);
}

