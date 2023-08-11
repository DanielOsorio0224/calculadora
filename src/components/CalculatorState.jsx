import { createContext, useContext, useState } from "react"
import PropTypes from 'prop-types'

const AppContext = createContext({
    memory: null,
    operation: null,
    currentValue: 0,
    isDecimal: false,

    addNumber: () => { },
    addOperation: () => { },
    getResult: () => { },
    executeAction: () => { }
});

export default function CalculatorState({ children }) {

    const [memory, setMemory] = useState(null);
    const [operation, setOperation] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [isReset, setIsReset] = useState(true);
    const [isDecimal, setIsDecimal] = useState(false);

    function handleAddNumbre(value) {
        if (isReset) {
            if (value === '.') {
                setIsDecimal(true);
            } else {
                const point = isDecimal ? '.' : '';
                const newValue = currentValue.toString() + point + value.toString();
                setCurrentValue(parseFloat(newValue));
                setIsReset(false);
                setIsDecimal(false);
            }
        } else {
            if (value === '.') {
                setIsDecimal(true)
            }else{
                const point = isDecimal ? '.' : '';
                const newValue = currentValue.toString() + point + value.toString();
                setCurrentValue(parseFloat(newValue));                
                setIsDecimal(false);
            }
        }
    }
    function handleAddOperation(op) {
        if (currentValue) {
            if (operation) {
                handleGetResult();
                setOperation(op);
            } else {
                setOperation(op);
                setMemory(currentValue);
                setCurrentValue(0);
                setIsReset(true);
            }
        }
    }
    function handleGetResult() {
        let result = 0;
        if (currentValue && operation && memory) {
            switch (operation) {
                case '+':
                    result = parseFloat(currentValue) + parseFloat(memory);
                    break;
                case '-':
                    result = parseFloat(memory) - parseFloat(currentValue);
                    break;
                case '*':
                    result = parseFloat(currentValue) * parseFloat(memory);
                    break;
                case '/':
                    result = parseFloat(memory) / parseFloat(currentValue);
                    break;
                case '%':
                    result = (parseFloat(memory) / 100) * parseFloat(currentValue);
                    break;
                default:

            }
            setCurrentValue(result);
            setOperation(null);
            setMemory(result);
            setIsReset(true);
            setIsDecimal(false);
        }
    }

    function clean() {
        setCurrentValue(0);
        setOperation(null);
        setMemory(0);
        setIsReset(true);
        setIsDecimal(false);
    }

    function delet() {
        const index = currentValue.toString().indexOf('.');
        if(index > 0){
            const numberDecimal = currentValue.toString().slice(index + 1).length;
            if(numberDecimal == 1){
                const min = Math.floor(currentValue);
                setCurrentValue(min);
            }else{
                const newNumber = parseFloat(currentValue).toFixed(
                    numberDecimal - 1
                );
                setCurrentValue(newNumber)
            }
        }else{
            setCurrentValue(parseInt(currentValue / 10));
        }
    }

    function changeSin() {
        setCurrentValue(currentValue * -1)
    }

    function convertToFloat() {
        if (currentValue.toString().indexOf('.') < 0) {
            handleAddNumbre('.')
        }
    }

    function handleExecuteAction(action) {
        switch (action) {
            case '=':
                handleGetResult();
                break;
            case 'AC':
                clean();
                break;
            case '<==':
                delet();
                break;
            case '+/-':
                changeSin();
                break;
            case '.':
                convertToFloat();
                break;
            default:
        }
    }

    return (
        <AppContext.Provider value={{
            memory, operation, currentValue, isDecimal,
            addNumber: handleAddNumbre, addOperation: handleAddOperation, getResult: handleGetResult,
            executeAction: handleExecuteAction
        }} >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}

CalculatorState.propTypes = {
    children: PropTypes
}