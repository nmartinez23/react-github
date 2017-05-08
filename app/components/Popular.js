var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// stateless functional component to render some UI
function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' }: null}
            // when any item is clicked the updateLanguage function runs and
            // updates the selectedLanguage. 'null' is passed in since the
            // bind context has already been set.
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  // initial state of the component
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    // bind function sets the context of 'this' to
    // always reflect the specific component instance
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }
  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular;
