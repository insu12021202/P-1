export default function createDom(elementName,className,innerText){
    const element= document.createElement(elementName);
    element.className = className;
    if(innerText){
        element.innerText = innerText;
    }
    return element;
};