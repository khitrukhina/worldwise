import Button from './Button.jsx';
import {useNavigate} from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();

    return <Button onClick={(e) => {
        e.preventDefault();
        navigate(-1);
    }} type='back'>&larr; Back</Button>;
}
