const init = () => {
    const inputEmail = document.querySelector('#input-email');
    const inputPassword = document.querySelector('#input-password');
    const submitbutton = document.querySelector('#input-button')

    const validateEmail = (element) => {
        const input = element.currentTarget;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emailTest = regex.test(input.value);

        if(!emailTest) {
            submitbutton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            submitbutton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        };
    };

    inputEmail.addEventListener('input', validateEmail);

    const validatePassword = (element) => {
        const input = element.currentTarget;

        if(input.value.length < 8) {
            submitbutton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            submitbutton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }; 
    };

    inputPassword.addEventListener('input', validatePassword);

    const errorHandler = () => {
        submitbutton.classList.remove('success');
        submitbutton.classList.add('error');
        submitbutton.textContent = 'Error';
    };

    const successHandler = () => {
        submitbutton.classList.remove('error');
        submitbutton.classList.add('success');
        submitbutton.textContent = 'Enviado';
    };

    if(submitbutton) {
        submitbutton.addEventListener('click', (element) => {
            element.preventDefault();

            submitbutton.textContent = '...Loading';

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if(response.status !== 200) {
                   return errorHandler(); 
                }
                successHandler(); 
            }).catch(() => {
                errorHandler();
            })
        });
    }
};

window.onload = init;