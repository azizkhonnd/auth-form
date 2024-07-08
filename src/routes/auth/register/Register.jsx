/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import Button from '../../../utils';
import './Register.scss';
import axios from '../../../api';
import { toast } from 'react-toastify';
import AppConext from '../../../context/store';


const Register = () => {
    const [state, dispatch] = useContext(AppConext);
    const [passwordErrors, setPasswordErrors] = useState({
        uppercase: true,
        lowercase: true,
        length: true,
        validChars: true
    });

    const [usernameErrors, setUsernameErrors] = useState({
        length: true,
        capitalLetter: true
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        setPasswordErrors({
            lowercase: !/[a-z]/.test(password),
            uppercase: !/[A-Z]/.test(password),
            length: password.length < 8,
            validChars: !/^[a-zA-Z0-9]*$/.test(password)
        });
    }, [password]);

    useEffect(() => {
        setUsernameErrors({
            capitalLetter: !/^[A-Z]/.test(username),
            length: username.trim().length < 2
        });
    }, [username]);

    const handleRegisterUser = async (e) => {
        e.preventDefault();

        try {
            if (
                Object.values(passwordErrors).every((check) => !check) &&
                Object.values(usernameErrors).every((check) => !check)
            ) {
                const response = await axios.post('/users/', {
                    email,
                    password,
                    name: username,
                    avatar: url
                });
                delete response.data.password

                dispatch({ type: 'LOADING', loading: true });
                toast.success(`Siz muvaffaqiyatli ro'yxatdan o'tdingiz!`);

            } else {
                throw new Error('Login yoki username xato!');
            }
        }
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error);
            }
        }
        finally {
            dispatch({ type: 'LOADING', loading: false });
        }
    };

    return (
        <div className='form__wrapper'>
            <h1 className='textRegister'>Register</h1>
            <form className='auth-form' onSubmit={handleRegisterUser}>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <ul>
                    {usernameErrors.capitalLetter && <li>First character should be an uppercase letter</li>}
                    {usernameErrors.length && <li>At least 2 characters</li>}
                </ul>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ul>
                    {passwordErrors.uppercase && <li>At least one uppercase letter</li>}
                    {passwordErrors.lowercase && <li>At least one lowercase letter</li>}
                    {passwordErrors.length && <li>At least 8 characters</li>}
                    {passwordErrors.validChars && <li>Only letters and numbers are allowed</li>}
                </ul>
                <input
                    type='email'
                    placeholder='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='url'
                    placeholder='avatar URL'
                    value={url}
                    required
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button btnType='submit' loading={state.loading}>Register</Button>
            </form>
        </div>
    );
};

export default Register;
