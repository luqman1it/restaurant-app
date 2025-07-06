import './header.css'
import CartIcon from '../carticon/CartIcon'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    return (
        <div className='header'>
            <p className="back"
                onClick={() => navigate('/')}
            >Back</p>


            <p className='room'>In Room Dining</p>

            <CartIcon />

        </div>
    )
}
export default Header