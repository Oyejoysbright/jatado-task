import { useEffect, useState } from 'react'

function Dropdown({contentType = DropContentType.standard, id, title, content, children, className, style, titleClassName, titleStyle, onTitleFocus, onTitleBlur, dropdownClassName, dropdownStyle, src, minWidth = "200px", type = DropType.hover, status = DropStatus.close, onChange}) {

    const [thisStatus, setStatus] = useState(status);

    const show = () => {
        setStatus(DropStatus.open);
        if (onChange) {
            
            onChange(DropStatus.open);
        }
    }

    const hide = () => {
        setStatus(DropStatus.close);
        if (onChange) {
            onChange(DropStatus.close);            
        }
    }

    useEffect(() => {
        if (thisStatus !== status) {
            setStatus(status);
        }
    }, [status])
    
    switch (type) {
        case DropType.focus:
            return (
                <div style={style} id={id} className={"jpc dropdown focus " + thisStatus + " " +className} >
                    <div id="dropdown-monitor" style={{zIndex: thisStatus === DropStatus.open? 10000 : -1}} onClick={hide}></div>
                    <span style={{...titleStyle, width: '100%', background: "#e9eaeb"}} onFocus={onTitleFocus} onBlur={onTitleBlur} onClick={show} className={titleClassName}>{title}</span>
                    {src? <span>{src}</span> : null}
                    <div onClick={() => {if(contentType === DropContentType.standard) setStatus(DropStatus.close)}} className={dropdownClassName + " content"} style={{minWidth: minWidth, zIndex: thisStatus === DropStatus.open? 10001 : 'unset', ...dropdownStyle}}>{content || children}</div>
                </div>
            );
        default:
            return (
                <div id={id} className={"jpc dropdown "+className}>
                    <span className={titleClassName}>{title}{src}</span>
                    <div className={dropdownClassName} style={{minWidth: minWidth}}>{content || children}</div>
                </div>
            );
    }
}

export default Dropdown

export const DropType = {
    hover: "hover",
    focus: "focus"
}
export const DropStatus = {
    open: "content-open",
    close: "content-close"
}
export const DropContentType = {
    standard: "standard",
    flexible: "flexible"
}