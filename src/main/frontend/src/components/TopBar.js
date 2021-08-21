import React, {useEffect, useState} from "react";
import {Dropdown, Icon, Nav, Navbar} from "rsuite";
import {Link, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequest} from "../action/authActions";
import './css/TopBar.css'
import Avatar from "react-avatar";

const TopBar = () => {
    const { authenticated, principals } = useSelector(state => state.authState.toJS())
    const location = useLocation()
    const [ activeTab, setActiveTab ] = useState(location.pathname);
    const [ userRole, setUserRole ] = useState(undefined)
    const dispatch = useDispatch();
    let { path, url } = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        if (principals && principals.role) {
            setUserRole(principals.role)
        }
    }, [])

    const handleSelect = (activeKey) => {
        setActiveTab(activeKey)
    }

    const logout = () => {
        dispatch(logoutRequest())
        history.push('/')
    }

    return (
        <Navbar className='gradient fixed-top'>
            <Navbar.Header>
                <img src='logo.png' alt='logo' width='65' className='navbar-brand ms-3'/>
            </Navbar.Header>
            <Navbar.Body>
                <Nav appearance="subtle" activeKey={activeTab} onSelect={handleSelect}>
                    <NavLink href={`${path}`} eventKey={userRole === 'ROLE_ADMIN' ? '/admin' : '/'} icon={<Icon icon='dashboard' />}>Anasayfa</NavLink>

                    {authenticated && userRole === 'ROLE_ADMIN' &&
                        (<NavLink href={`${url}/categories`} eventKey="/admin/categories" icon={<Icon icon='list-alt' />}>Kategoriler</NavLink>)}
                    {authenticated && userRole === 'ROLE_ADMIN' &&
                        (<NavLink href={`${url}/mentors`} eventKey="/admin/mentors" icon={<Icon icon='book2' />}>Mentor</NavLink>)}
                    {authenticated && userRole === 'ROLE_USER' &&
                        (<NavLink href={`${url}search`} eventKey="/search" icon={<Icon icon='search' />}>Mentor Bul</NavLink>)}
                    {authenticated && userRole === 'ROLE_USER' &&
                        (<NavLink href={`${url}application-form`} eventKey="/application-form" icon={<Icon icon='order-form' />}>Mentor Ol</NavLink>)}
                    {authenticated && userRole === 'ROLE_USER' &&
                        (<NavLink href={`${url}applications`} eventKey="/applications" icon={<Icon icon='wpforms' />}>Başvurularım</NavLink>)}
                </Nav>
                <Nav pullRight>
                {
                    authenticated ? (
                        <>
                            <Dropdown title={principals.name} placement='bottomEnd'
                                      icon={<Avatar name={principals.name} round size='25' className='me-2' />}>
                                <Dropdown.Item icon={<Icon icon='profile' />}>Profil</Dropdown.Item>
                                <Dropdown.Item icon={<Icon icon='cog' />}>Ayarlar</Dropdown.Item>
                                <Dropdown.Item icon={<Icon icon='sign-out' />} onSelect={logout}>Çıkış</Dropdown.Item>
                            </Dropdown>
                        </>
                    ) : (
                        <NavLink href={`${url}login`} icon={<Icon icon='sign-in'/>}>GİRİş</NavLink>
                    )
                }
                </Nav>
            </Navbar.Body>
        </Navbar>
    )
}

const MyLink = React.forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
        <Link to={href} as={as} ref={ref} {...rest}/>
    );
})

const NavLink = props => <Nav.Item componentClass={MyLink} {...props} />

export default TopBar;