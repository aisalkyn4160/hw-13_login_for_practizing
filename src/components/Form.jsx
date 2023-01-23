import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { useEffect, useState } from 'react';
import classes from './Form.module.css'

export const Form = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [userNameDirty, setUserNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [userNameError, setUserNameError] = useState ('Empty input')
    const [emailError, setEmailError] = useState ('Empty input')
    const [passError, setPassError] = useState ('Empty input')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(setUserNameError || setEmailError || setPassError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [userNameError, emailError, passError])

    const userNameChangeHandler = (e) => {
        setUserName(e.target.value)
        const validateUserName = RegExp(/[0-9]/)
        if(!validateUserName.test(e.target.value)){
            setUserNameError('Usename must have digits')
        } else {
            setUserNameError('')
        }       
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
        const validEmail = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
        if(!validEmail.test(e.target.value)){
            setEmailError('gmail is not valid')
        } else {
            setEmailError('')
        }       
    }

    const passChangeHandler = (e) => {
        setPass(e.target.value)
        const countSymbol = RegExp(/^.{5}$/)
        if(!countSymbol.test(e.target.value)){
            setPassError('Password must be more then 5 digits')
        } else {
            setPassError('')
        }       
    }

    const blurHandler = (e) => {
        if(e.target.id === 'name') {
            setUserNameDirty(true)
        } 
        if(e.target.id === 'email') {
            setEmailDirty(true)
        } 
        if(e.target.id === 'pass') {
            setPassDirty(true)
        } 

    }

    const submitHandler = (e) => {
        e.preventDefault()
            console.log(userName);   
            console.log(email);
            console.log(pass.split('').reverse().join('') + pass[0] + pass[1]);
    }

    return <Card>
        <form className={classes.form} onClick={submitHandler}>
            <div>
                {(userNameDirty && userNameError) && <label htmlFor="name" style={{color: 'red'}}>{userNameError}</label>}
                <input onChange={e=> userNameChangeHandler(e)} onBlur = {e => blurHandler(e)} type="text" id="name"  value={userName} placeholder = 'Your name'/>
            </div>
            <div>
                {(emailDirty && emailError) && <label htmlFor="email" style={{color: 'red'}}>{emailError}</label>}
                <input onChange={e=> emailChangeHandler(e)} onBlur = {e => blurHandler(e)} type="email" id="email" value={email} placeholder='Your email'/>
            </div>
            <div>
                {(passDirty && passError) && <label htmlFor="pass" style={{color: 'red'}}>{passError}</label>}
                <input onChange={e=> passChangeHandler(e)} onBlur = {e => blurHandler(e)} type="password" id="pass" value={pass} placeholder= 'Your password'/>
            </div>

            <Button disabled = {!formValid}>Sign up</Button>
        </form>
    </Card>
}