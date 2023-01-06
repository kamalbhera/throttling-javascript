
function fetchJoke() {
    let limit = 15
    let searchText = document.getElementById('search').value;
    fetch(`https://icanhazdadjoke.com/search?term=${searchText}&limit=${limit}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
    }).then(response => response.json())
      .then(json => {
        const jokes = json.results;
        let list = document.getElementById('list');
        jokes.forEach(element => {
            list.innerHTML += `<li>${element.joke}</li>` 
        });
        document.appendChild(list);
        // setResult(jokes)
      });
}

const throttling = (callback, dealy) => {
    let lastTime = new Date().getTime();
    return function(...args) {
        
        let currentTime = new Date().getTime();
        if (currentTime-lastTime < dealy) {
            return;
        }
        callback.apply(...args);
        lastTime = currentTime;
    }
}

let throttlingFun = throttling(fetchJoke, 2000);