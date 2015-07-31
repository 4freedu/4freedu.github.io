var React = require('react'),
    actions = require('../actions/actions');

var Product = React.createClass({

  findTag(tag) {
    actions.toggleTag(tag);
  },

  render() {
    return (
      <div className='clearfix mb3 p3 col'>

        <div className='mb2'>
          <a
            className=''
            href={this.props.href}
            target='_blank'
          >
            {this.props.name}
          </a>

          <span className='h6'>
            {`, ${this.props.price}` +
            `${this.props.duration !== 'forever' && this.props.duration}`}
          </span>
        </div>


        <div className='clearfix'>
          {this.props.tags.sort().map((t, i) =>
            <div
              key={i}
              className={'border border-blue bg-white px1 blue ' +
                        'rounded col clearfix mr1 mb1 tag-container'}
              onClick={this.findTag.bind(this, t)}
            >
              {t}
            </div>
          )}
        </div>

      </div>
    );
  }

});

module.exports = Product;
