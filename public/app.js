// const user_btn = document.querySelector('#user_btn')

// const user_output = document.querySelector('#user_output')

// loadEventListeners()

// function loadEventListeners() {
//     user_btn.addEventListener('click', getData)
// }

// async function getData() {
//     const result = await fetch('http://localhost:4000/api/users')
//     const data = await result.json()
//     console.log(data)
//     for(let i = 0; i < data.length; i++) {
//         let current = data[i]
//         const div = document.createElement('div')
//         div.className = 'item'
//         div.textContent = current.name
//         user_output.appendChild(div)
//     }
// }

//jquery
const getUserName = () => {
    $('#user_output').empty()
    $('#country_output').empty()
    $.get('http://localhost:4000/api/users', (data) => {
        for (let i of data) {
            const div = $('<div></div>')
            div.addClass('user_data')
            div.text(i.name)
            $('#user_output').append(div)
        }
    })
}

const getCountryName = () => {
    $('#user_output').empty()
    $('#country_output').empty()
    $.get('http://localhost:4000/api/countries', (data) => {
        for (let i of data) {
            const div = $('<div></div>')
            div.addClass('country_data')
            div.text(i.country_name)
            $('#country_output').append(div)
        }
    })
}

$('#user_btn').click(getUserName)
$('#country_btn').click(getCountryName)