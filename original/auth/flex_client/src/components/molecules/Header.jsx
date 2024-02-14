import { React, useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import ApiService from '../../helpers/ApiServices';
import { UserContext } from '../states/contexts/UserContext';
import { useCookies } from 'react-cookie';
import { TokenService } from '../../helpers/StorageServices';

const Header = () => {
    const { dispatch, user } = useContext(UserContext)
    const [cookies, setCookie] = useCookies([]);




    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand >PCT Flex</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Logging in as: <strong> {user?.email}</strong>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Header;
