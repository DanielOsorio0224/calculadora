import { useAppContext } from "./CalculatorState"
import PropTypes from 'prop-types'

export default function Button({type, value}) {
  
    const calculator = useAppContext();

    function handleClick(){
        switch(type){
            case 'number': 
                calculator.addNumber(parseInt(value))
            break;

            case 'operator':
                calculator.addOperation(value)
            break;

            case 'action':
                calculator.executeAction(value)
            break;
            
            default:
        }
    }
    
    return (
    <button onClick={handleClick} className="calculatorButton">{value}</button>
  )
}

Button.propTypes = {
    type: PropTypes,
    value: PropTypes
}