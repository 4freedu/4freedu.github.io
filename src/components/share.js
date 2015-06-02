var React = require('react'),
    { State } = require('react-router');

var DataStore = require('../stores/data_store');

var Share = React.createClass({
  getInitialState: () => ({ show: false }),
  toggleShow() {
    this.setState({ show: !this.state.show });
  },
  render() {
    return (
      <div className='col'>
        <div className='border border-blue' onClick={this.toggleShow}>Share search results!</div>
        {this.state.show && <input type='text' className='field-light' value={DataStore.getUrl()} readOnly={true}/>}
      </div>
    );
  }
});

module.exports = Share;
