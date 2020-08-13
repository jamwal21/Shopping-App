import * as React from 'react'

const If = (props) => {
return <>{props.show ? props.children : null}</>
}

export default If
