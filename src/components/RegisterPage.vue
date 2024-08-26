<template>
    <main>
        <header>
            <h1 class="logo"> KONA APP</h1>
            <h2>Register</h2>
            <p>Login or create an account</p>
        </header>

        <form @submit.prevent="Register">

            <label>
                <span>Enter your Email</span>
                <input type="email" v-model="email" placeholder="exemple@domaine.com"/>
            </label>

            <label>
                <span>Enter your password</span>
                <input type="password" v-model="password" placeholder="***********"/>
            </label>

            <label>
                <span>Confirm your password</span>
                <input type="password" v-model="passwordConfirmation" placeholder="***********"/>
            </label>
            
            <button type="submit" value="Register">Register</button>
        </form>

        <footer>
            <p>Already have an account? <router-link to="/LoginPage">Login</router-link></p>
        </footer>

    </main>
</template>
<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const router = useRouter();

const Register = async() => {
    if(!email.value || !password.value || !passwordConfirmation.value){
        return alert('Please fill in the fields')
    }

    if(password.value !== passwordConfirmation.value){
        return alert('your password and its confirmation do not match')
    }

    const res = await fetch('http://localhost:3333/RegisterPage', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then(res => res.json())

    if (res.success) {
        localStorage.setItem('token', res.token)
        router.push('/')
    } else {
        alert(res.message)
    }
}

</script>
<style scoped>
main{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
    background-color: var(--primary);
    color:#FFF;
}

header{
    padding: 1.5rem;
}
footer{
    background-color: #FFF;
    width: 100%;
    color: var(--dark);
    text-align: center;
    padding: 1.5rem;
    padding-bottom: 3rem;
}
h2{
    font-size: 2.125rem;
    margin-bottom: 1rem;
}
h2 ~ p{
    font-weight: 500;
    font-size: 1rem;
}
form{
    flex: 1 1 0%;
    display: block;
    border-radius: 1.5rem 1.5rem 0 0;
    background-color: #FFF;
    box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 16);
    color:var(--dark);
    padding: 4rem 1.5rem;
    width: 100%;
}
label{
    display: block;
    margin-bottom: 1.5rem;
}
label span{
    display: block;
    color: var(--gray);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}
input{
    display: block;
    width: 100%;
    border: 1px solid var(--gray);
    border-radius: .5rem;
    padding: 1.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--dark);
    background-color: var(--light);
}
input::placeholder{
    color: var(--gray);
    font-style: italic;
}
button{
    display: block;
    width: fit-content;
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    background-color: var(--primary);
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: .2s eaase;
}
button:hover{
    background-color: var(--primary-dark);
}
</style>