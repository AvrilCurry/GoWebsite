window.onload = function() {
   
};

// Firefox, 
function OnInput(event) {
    var tagId = event.target.id;
    var Value = event.target.value;
    var errorElement = event.target.nextElementSibling;

    switch (tagId) {
        case 'username':
            VerifyUserName(errorElement, Value);
            break;
        case 'password':
            VerifyPassword(errorElement, Value);
            break;
        case 'email':
            VerifyEmail(errorElement, Value);
            break;
        case 'telephone':
            VerifyTelephone(errorElement, Value);
            break;
    }
}

function OnPropertyChange(event) {
    if (event.propertyName.toLowerCase() == 'value') {
        var tagId = event.srcElement.id;
        var Value = event.srcElement.value;
        var errorElement = event.srcElement.nextElementSibling;

        switch (tagId) {
            case 'username':
                VerifyUserName(errorElement, Value);
                break;
            case 'password':
                VerifyPassword(errorElement, Value);
                break;
            case 'email':
                VerifyEmail(errorElement, Value);
                break;
            case 'telephone':
                VerifyTelephone(errorElement, Value);
                break;
        }
    }
}

function OnFocus(event) {
    if (event.target) {
        event.target.style.setProperty('border', '2px solid pink');
    } else {
        event.srcElement.style.setProperty('border', '2px solid pink');
    }
}

function OnBlur(event) {
    if (event.target) {
        event.target.style.setProperty('border', '1px solid grey');
    } else {
        event.srcElement.style.setProperty('border', '1px solid grey');
    }
}

function VerifyUserName(element, username) {
    var usernameElement = document.getElementById('username');
    var regExp = /^[a-zA-Z0-9\u4e00-\u9f5a]*$/;

    if (username != '' && regExp.test(username) == false) {
        usernameElement.style.setProperty('border', '2px solid red');
        element.innerHTML = '用户名由6-20个汉字、字母、数字组成';
    } else {
        usernameElement.style.setProperty('border', '2px solid pink');
        element.innerHTML = '';
    }
}

function VerifyPassword(element, password) {
    var passwordElement = document.getElementById('password');
    var regExp = /^[a-zA-Z0-9_]*$/;

    if (password != '' && regExp.test(password) == false) {
        passwordElement.style.setProperty('border', '2px solid red');
        element.innerHTML = '密码由6-20个字母、数字和\'_\'组成';
    } else {
        passwordElement.style.setProperty('border', '2px solid pink');
        element.innerHTML = '';
    }
}

function VerifyEmail(element, email) {
    var emailElement = document.getElementById('email');
    var regExp = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;

    if (email != '' && regExp.test(email) == false) {
        emailElement.style.setProperty('border', '2px solid red');
        element.innerHTML = `邮箱名由字母、数字和'_'组成，邮箱后缀只能由字母和数字组成`;
    } else {
        emailElement.style.setProperty('border', '2px solid pink');
        element.innerHTML = '';
    }
}

function VerifyTelephone(element, telephone) {
    var telephoneElement = document.getElementById('telephone');
    var regExp = /^1[0-9]{10}$/;

    if (telephone != '' && regExp.test(telephone) == false) {
        telephoneElement.style.setProperty('border', '2px solid red');
        element.innerHTML = `电话号码由11位数字组成,以1开头`;
    } else {
        telephoneElement.style.setProperty('border', '2px solid pink');
        element.innerHTML = '';
    }
}

function SentData() {
    /*var xhr;
    
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    
    var formData = new FormData();
    formData.append('username', Username);
    formData.append('password', Password);
    formData.append('email', Email);
    formData.append('telephone', Telephone);

    xhr.onreadystagechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("success");
            }
        } else if (xhr.readyState == 0) {
            alert(0);
        } else if (xhr.readyState == 1) {
            alert(1);
        } else if (xhr.readyState == 2) {
            alert(2);
        } else {
            alert(3);
        }
    }

    xhr.open("POST", "http://localhost:8181/", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.setRequestHeader("charset","gb2312");
    xhr.send("username":Username, );*/

    var Username = document.getElementById('username').value;
    var Password = document.getElementById('password').value;
    var Email = document.getElementById('email').value;
    var Telephone = document.getElementById('telephone').value;

    var data = {
        username: Username,
        password: Password,
        email: Email,
        telephone: Telephone
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8181/",
        contentType: "application/x-www-form-urlencoded;charset=gb2312",
        data: data,
        success: function(msg) {
            alert(msg);
            console.log(msg);
        }
    });

}

function Reset() {
    var inputElement = document.getElementsByTagName('input');
    inputElement.forEach(function(elem) {
        elem.value = '';
    });
}