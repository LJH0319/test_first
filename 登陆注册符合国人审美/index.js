const container = document.querySelector('#container');
const signInButton = document.querySelector('#signIn');
const signUpButton = document.querySelector('#signUp');

signUpButton.addEventListener('click',() => container.classList.add('right-panel-active'))
signInButton.addEventListener('click',() => container.classList.remove('right-panel-active'))

function checkLogin(event){
    event.preventDefault()
    var name = document.getElementById('name').value
    var password = document.getElementById('password').value
    if(!name){
        alert('请输入您的用户名')
    }else if(name !=='ljh'){
        alert('用户名不正确')
        return
    }else if(password !=='123456'){
        alert('密码不正确')
        return
    }else{
        window.location.href = '../index.html'
        alert('登录成功')
    }

}