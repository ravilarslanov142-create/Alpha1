import React, { Component } from "react"


/* Component Picture */
class Picture extends Component {

    constructor() {
        super()

        this.state = {
            visible: false
        }
    }

    render = () => {

        const { visible } = this.state
        const { ...props } = this.props

        const opacity = visible ? 1 : 0
        
        return <img {...props} onLoad={() => this.setState({ visible: true })} style={{ opacity, transition: 'opacity 0.3s' }} />
    }
}

export default Picture