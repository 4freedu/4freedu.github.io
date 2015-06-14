var React = require('react');

var schools = [];
var req = new XMLHttpRequest();
req.open('GET', 'http://4freedu.github.io/data/schools.json', false);
req.send(null);
if (req.status === 200) schools = JSON.parse(req.responseText);

var Submit = React.createClass({
  getInitialState() {
    return {
      school: 'all',
      service: '',
      duration: '',
      link: ''
    };
  },
  selectSchool(e) { this.setState({ school: e.target.value }); },
  updateService(e) { this.setState({ service: e.target.value }); },
  updateDuration(e) { this.setState({ duration: e.target.value }); },
  updateLink(e) { this.setState({ link: e.target.value }); },
  submit(e) {
    e.preventDefault();
    if (!this.state.service || !this.state.link) {
      alert('You must supply the school, service, and link fields');
      return;
    }
    /*
    // The pull request
    req = new XMLHttpRequest();
    req.open()
    */
  },
  render() {
    return (
      <div className='clearfix mxn2'>
        <div className=' col-8 mx-auto'>
          <form>
            <legend className='mx-auto mb2 h2 bold'>Submit</legend>
            <select onChange={this.selectSchool} className='block full-width mb1 field-light'>
              {schools.map((s, i) => <option key={i + s} value={s}>{s}</option> )}
            </select>
            <input type='text' className='block full-width mb1 field-light' onChange={this.updateService} placeholder='Service' />
            <input type='text' className='block full-width mb1 field-light' onChange={this.updateDuration} placeholder='Duration' />
            <input type='text' className='block full-width mb1 field-light' onChange={this.updateLink} placeholder='Link' />
            <input type='text' className='block full-width mb1 field-light' onChange={this.updateLink} placeholder='Tags' />
            <input type='submit' className='button' onClick={this.submit} />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Submit;
