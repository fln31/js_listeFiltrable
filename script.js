const resultsTag = document.querySelector('.table-results')

const userApiCall = async () => {
  try {
    const r = await fetch('https://randomuser.me/api/?nat=fr&results=50')
    const data = await r.json()
    if (!r.ok) {
      throw new Error('Erreur de call API')
    }
    // Display results
    populateUI(data.results)

    // Handle filtering results
    search.addEventListener('input', (e) => {
      e.preventDefault();
      let filteredData = data.results.filter(el => {
        let fullName = el.name.first + el.name.last
        return fullName.toLowerCase().includes(e.target.value.toLowerCase().replace(/\s/g, ""))
      })
      populateUI(filteredData)
    })

  } catch(err) {
    console.log('Il y a une erreur API')
  }
}

const populateUI = (datas) => {
  resultsTag.innerHTML = ''
  datas
  .sort((a, b) => a.name.first.localeCompare(b.name.first))
  .forEach(data => {
    resultsTag.innerHTML += `
    <li class="table-item">
      <p class="main-info">
        <img src="${data.picture.thumbnail}" alt="avatar picture">
        <span>${data.name.first} ${data.name.last}</span>
      </p>
      <p class="email">${data.email}</p>
      <p class="phone">${data.cell.replaceAll('-', ' ')}</p>
    </li>
    `
  });
}

userApiCall();
