import Logo from '../../assets/logo.svg';
import './header.styles.scss'

const Header = () => {
    return <>
        <header className="header">
            <div className="header__logo">
                <img src={Logo} alt="Logo" />
            </div>
        </header>
    </>
}

export default Header;