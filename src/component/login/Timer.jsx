import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  render () {
    const {count} = this.state
    return (
      <div>
        <h3>{count} sec</h3>
      </div>
    )
  }
  // setInterval
  // clearInterval
  componentDidMount () {
    const {startCount} = this.props
    this.setState({
      count: startCount
    })
    this.doIntervalChange()
  }
  doIntervalChange = () => {
      this.myInterval = setInterval(() => {
      if(this.state.count>0){
        this.setState(prevState => ({ count: prevState.count - 1}))
      }
    }, 1000)
  }
  componentWillUnmount () { clearInterval(this.myInterval) }
}

export default Timer