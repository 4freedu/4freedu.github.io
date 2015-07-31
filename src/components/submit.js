var React = require('react'),
    DataStore = require('../stores/data_store');

var Submit = React.createClass({

  getInitialState() {
    return {
      schools: DataStore.getSchools(),
      school: 'all',
      service: '',
      duration: '',
      link: '',
      tag: '',
      tags: []
    };
  },

  update(prop, e) {
    this.setState({ [prop]: e.target.value });
  },

  onKeyDown(e) {
    if (e.target.tagName === 'INPUT' && e.keyCode === 13) {
      if (this.state.tag && !this.state.tags.some(t => t === this.state.tag)) {
        var tags = this.state.tags;
        tags.push(this.state.tag);
        this.setState({ tags: tags, tag: '' }, () => {
          React.findDOMNode(this.refs.tagInput).value = '';
        });
      }
    }
  },

  removeTag(tag) {
    var tags = this.state.tags;
    tags = tags.filter(t => t !== tag);
    this.setState({ tags: tags });
  },

  submit(e) {
    e.preventDefault();
    if (!this.state.school || !this.state.service || !this.state.link)
      return alert('You must supply the school, service, and link fields');
    actions.submit(this.state);
  },

  render() {
    let inputClass = '';//'block full-width mb2 field-light';

    return (
      <div className={''/*'clearfix mxn2'*/}>
        <div className={''/*'col-8 mx-auto'*/}>
          <div>

            <legend className={''/*'mx-auto mb2 h2 bold'*/}>Submit</legend>

            {/* select school */}
            <select onChange={this.update.bind(this, 'school')} className={inputClass}>
              {this.state.schools.map((s, i) => <option key={i + s} value={s}>{s}</option> )}
            </select>

            {/* input school */}
            {this.state.school === 'other' && <input
              type='text'
              className={inputClass}
              onChange={this.update.bind(this, 'school')}
              placeholder='School'
            />}

            {/* product */}
            <input
              type='text'
              className={inputClass}
              onChange={this.update.bind(this, 'service')}
              placeholder='Service'
            />

            {/* duration */}
            <input
              type='text'
              className={inputClass}
              onChange={this.update.bind(this, 'duration')}
              placeholder='Duration'
            />

            {/* url */}
            <input
              type='text'
              className={inputClass}
              onChange={this.update.bind(this, 'link')}
              placeholder='Link'
            />

            {/* tags */}
            <div className={''/*'block full-width clearfix tag-input-div mb2 p1'*/}>
              {this.state.tags.map(tag => <div
                className={''/*'border rounded bg-fuchsia white col clearfix mr1 tag-container white'*/}
                onClick={this.removeTag.bind(this, tag)}
              >
                {tag}
                <div className={''/*'ml1 fa fa-times'*/}></div>
              </div>)}
              <input type='text'
                ref='tagInput'
                className={''/*'col tag-input'*/}
                onChange={this.update.bind(this, 'tag')}
                onKeyDown={this.onKeyDown}
                placeholder='Tags - hit enter after each tag'
              />
            </div>

            {/* submit button */}
            <button className={''/*'button block full-width'*/} onClick={this.submit}>Submit</button>

          </div>
        </div>
      </div>
    );
  }

});

module.exports = Submit;
