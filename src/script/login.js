let _loading = document.getElementsByClassName('loading')[0]
async function load() {
    const _file = await fetch('src/data/login.json')
    if (!_file.ok) {
        _loading.classList.add('load-work')
    } else {
        _loading.classList.remove('load-work')
    }
    let _data = await _file.json()
    return _data
}
let userVal
let passVal
let _flag = 1
load().then(_data => {
    userVal = document.getElementById('userName')
    passVal = document.getElementById('passWord')
    document.getElementById('enter').addEventListener('click', function () {
        for (i = 0; i < _data.results.length; i++) {
            if (userVal.value == _data.results[i].login.username) {
                _flag = i
            }
        }

        _userName = _data.results[_flag].login.username
        _passWord = _data.results[_flag].login.password
        if ((userVal.value == _userName) && (passVal.value == _passWord)) {
            alert('Congratulation.You are entered ')
            // window.location = "index2.profile.html"
            document.getElementById('success').classList.add('work')
            document.getElementById('result').classList.add('resultWork')

            EnterData(_data, _flag)
            function remove1() {
                document.getElementById('success').classList.remove('work')
            }
            setTimeout(remove1, 3000)
        } else {
            if ((userVal.value != _userName) || (passVal.value != _passWord) || (userVal.value == '') || (passVal.value == '')) {
                document.getElementById('error').classList.add('work')
                function remove2() {
                    document.getElementById('error').classList.remove('work')
                }
            }
            setTimeout(remove2, 3000)
        }
    })
})
document.getElementById('back').addEventListener('click', function () {
    let uservalue = confirm('want to leave ?')
    if (uservalue == true) {
        document.getElementById('result').classList.remove('resultWork')
        userVal.value = null
        passVal.value = null
        userVal.focus()
    }

})

function EnterData(_data, x) {
    document.getElementById('userImg').innerHTML = ` <img src="${_data.results[x].picture.large}" alt="">`

    document.getElementById('name').innerHTML = `<i class="bi bi-person-fill"></i><b> User's name :</b> ${_data.results[x].name.first} ${_data.results[x].name.last}`

    document.getElementById('gend').innerHTML = `<i class="bi bi-person-hearts"></i><b> User's Gender :</b> ${_data.results[x].gender}`

    document.getElementById('age').innerHTML = `<i class="bi bi-hourglass"></i><b> User's Age :</b> ${_data.results[x].dob.age}`

    document.getElementById('email').innerHTML = `<i class="bi bi-envelope-paper"></i><b> User's Email :</b> ${_data.results[x].email}`

    document.getElementById('phone').innerHTML = `<i class="bi bi-telephone"></i><b> User's Phone :</b> ${_data.results[x].phone}`

    document.getElementById('country').innerHTML = `<i class="bi bi-patch-exclamation"></i><b> User's Country :</b> ${_data.results[x].location.country}`

    document.getElementById('address').innerHTML = `<i class="bi bi-pencil-square"></i><b> User's Address :</b> ${_data.results[x].location.state}, ${_data.results[x].location.city}, ${_data.results[x].location.street.name}, ${_data.results[x].location.street.number}`
}
