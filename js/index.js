document.addEventListener('DOMContentLoaded', () => {
const main = document.querySelector('#main')
const form = document.querySelector('form')
const userList = document.getElementById('user-list')
const reposList = document.getElementById('repos-list')

const userSearch = (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${form.search.value}`)
  .then(function (response) {
    return response.json();
  })
  .then(data => {
      renderUsers(data)
      form.reset()
    })
  }

  const fetchRepos = (e) => {
        debugger
        fetch(`https://api.github.com/users/${e.currentTarget.children[0].textContent}/repos`)
        .then(function (response) {
            return response.json();
        })
        .then(data => renderRepos(data))
  }

  const renderRepos = (repos) => {
            reposList.innerHTML = ''
            let h2 = document.createElement('h2')
            h2.classList.add('repo-title')
            h2.textContent = `Repo List For ${repos[0].owner.login}`
            reposList.appendChild(h2)
            console.log(repos)
            repos.forEach((repo) => {
                let li = document.createElement('li')
                let a = document.createElement('a')
                li.classList.add('repo')
                a.textContent = repo.html_url
                a.href = repo.html_url
                a.target = '_blank'
                reposList.appendChild(li)
                li.appendChild(a)
            })    
  }

  const renderUsers = (users) => {
      userList.innerHTML = ''
      reposList.innerHTML = ''
      console.log(users.items)
      users.items.forEach(element => {
            console.log(element)
            let div = document.createElement('div')
            let repoLinkContainer = document.createElement('div')
            let h2 = document.createElement('h2')
            let p = document.createElement('p')
            let img = document.createElement('img')
            div.classList.add('user')
            // a.href = renderRepos()
            repoLinkContainer.classList.add('link-container')
            repoLinkContainer.addEventListener('click', fetchRepos)
            img.src = element.avatar_url
            h2.textContent = `${element.login}`
            p.textContent = 'Show My Repos!'
            userList.appendChild(div)
            div.appendChild(img)
            div.appendChild(repoLinkContainer)
            repoLinkContainer.appendChild(h2)
            repoLinkContainer.appendChild(p)
      });
  }

  form.addEventListener('submit', userSearch)
})