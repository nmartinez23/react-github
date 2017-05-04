var React = require('react');

class Popular extends React.Component {
  // initial state of the component
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    // bind function sets the context of 'this' to
    // always reflect the specific component instance
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    });
  }
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li
              style={lang === this.state.selectedLanguage ? { color: '#d0021b' }: null}
              // when any item is clicked the updateLanguage function runs and
              // updates the selectedLanguage. 'null' is passed in since the
              // bind context has already been set above.
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          )
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular;
