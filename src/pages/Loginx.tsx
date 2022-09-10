import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { logout, setCredentials } from '../api/authSlice'
import { useLoginMutation } from '../api/authApiSlice'
interface Focusable {
    focus(): void;
}

const Login = () => {
    const userRef = useRef<Focusable>()
    const errRef = useRef<Focusable>()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const userData = await login({ username:user, password:pwd }).unwrap()
            dispatch(setCredentials({ ...userData}))
            setUser('')
            setPwd('')
            navigate('/tracks')
        } catch (err: any) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: React.FormEvent<HTMLInputElement>) => setUser(e.currentTarget.value)

    const handlePwdInput = (e: React.FormEvent<HTMLInputElement>) => setPwd(e.currentTarget.value)

    const handleLogout = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        logout()
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={() => errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={() => userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <button onClick={handleLogout}>Sign Out</button>
            </form>
        </section>
    )

    return content
}
export default Login