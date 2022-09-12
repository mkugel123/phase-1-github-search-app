document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form')
    
    const removeAllChildren = function(parent){
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
    
    form.addEventListener('submit', fetchName)

    //searches  and renders names to dom
    function fetchName(e){
        e.preventDefault()
        const nameInput = document.getElementById('search').value
        fetch(`https://api.github.com/search/users?q=${nameInput}`)
        .then(response => response.json())
        .then(data => {
            const names = data.items
            displayName(names)
            form.reset()
        })
    }

    function displayName(names){
        const userList = document.getElementById('user-list')
        removeAllChildren(userList)
        removeAllChildren(document.getElementById('repos-list'))
        names.forEach((name) => {
            const li = document.createElement('li')
            li.addEventListener('click', fetchRepos)
            li.innerHTML = `
                <p class = name>Username: ${name.login}</p>
                <p>
                <a href = ${name.html_url}>Profile<a/><br>
                <a href = ${name.avatar_url}>Avatar<a/>
                </p>
                <button id = ${name.login}>Repos</button>
                <hr>
                `
                userList.appendChild(li)
        })
    }

    function fetchRepos(e) {
        const userName = e.target.id
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => response.json())
        .then(repos => displayRepos(repos))
    }

    function displayRepos(repos){
        const repoList = document.getElementById('repos-list')
        removeAllChildren(repoList)
        repos.forEach((repo) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href = ${repo.html_url}>${repo.name}</a>
                `
            repoList.appendChild(li)
        })
    }
})





