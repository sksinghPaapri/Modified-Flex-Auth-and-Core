import { React, useContext, useState, useEffect } from 'react';
import './logout.css';
import { Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../components/states/contexts/UserContext';
import ApiService from '../../helpers/ApiServices';
import { TokenService } from '../../helpers/StorageServices';


export default function Logout() {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [errorShow, seterrorShow] = useState("Your email or password is incorrect! Please try again.");
    const { dispatch, isFetching } = useContext(UserContext)




    const isLogged = async () => {

        ApiService.setHeader();
        try {

            const response = await ApiService.get('accessControl/logout', {});

            console.log("response", response);
            if (response.data.isSuccess) {

                TokenService.removeToken();
                dispatch({ type: "LOGOUT_USER" });
                navigate('/')

            } else {
                // setShow(true)
                // dispatch({ type: "LOGIN_FAILURE" });
                navigate('/accounts')
            }

        } catch (error) {
            dispatch({ type: "LOGOUT_USER" });
            navigate('/')
        }

    }



    useEffect(() => {
        isLogged();
    }, []);



    return (
        <div className="logoutPage">
            <Container className="logoutForm">

                <div className="loading-text">
                    Securely logging you out of all Flex Accounts
                    <span className="logout-icon">...</span>
                </div>

            </Container>
        </div>
    )
}

