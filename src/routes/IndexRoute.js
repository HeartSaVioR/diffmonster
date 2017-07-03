import React from 'react';
import g from 'glamorous';
import { Link } from 'react-router-dom';
import { Button, Intent, Colors } from '@blueprintjs/core';
import { isAuthenticated, startAuth } from '../lib/GithubAuth';
import Nav from '../ui/Nav';

const Container = g.div({
  maxWidth: '50em',
  width: '100%',
  margin: '40px auto',
  padding: '0 2em',
});

const Title = g.h1({
  marginBottom: '20px'
});

const Cards = g.div({
  marginTop: '30px',

  '& h5': {
    marginBottom: '20px'
  },

  '& p': {
    lineHeight: 1.6,
    margin: '5px 0',
  }
});

const ButtonContainer = g.div({
  textAlign: 'center',
  marginTop: '20px',
});

export default class IndexRoute extends React.Component {
  render() {
    return (
      <g.Div flex="1" overflow="auto" background={Colors.DARK_GRAY3} className="pt-dark">
        <Container>
          <Title>Welcome</Title>

          <p className="pt-running-text">
            <strong>Diff Monster</strong> is a tool for reviewing GitHub Pull Requests,
            especially big ones.
          </p>

          <Cards>
            <div className="pt-card">
              <h5><span className="pt-icon-large pt-icon-locate" /> Open pull request by GitHub URL</h5>
              <form className="pt-control-group" onSubmit={this._onSubmit}>
                <input
                  type="text"
                  className="pt-input pt-fill"
                  placeholder="https://github.com/owner/repo/pull/123 OR owner/repo#123"
                  ref={el => this._urlInput = el}
                />
                <Button type="submit" intent={Intent.PRIMARY} text="Go" />
              </form>

              <p className="pt-text-muted">
                or, try some{' '}
                <Link to="/facebook/react/pull/9580">example</Link>{' '}
                <Link to="/kubernetes/kubernetes/pull/46669">pull</Link>{' '}
                <Link to="/square/okhttp/pull/3207">requests</Link>.
              </p>
            </div>
          </Cards>

          <Cards>
            <div className="pt-card">
              <h5><span className="pt-icon-large pt-icon-inbox" /> Use Inbox</h5>
              <p>See PRs you need to review in one place. (requires login)</p>
              <ButtonContainer>
              {isAuthenticated() ?
                <Button
                  intent={Intent.SUCCESS}
                  iconName="inbox"
                  text="Open Inbox"
                  onClick={() => Nav.isInboxOpen.next(true)}
                /> :
                <div>
                  <Button
                    intent={Intent.PRIMARY}
                    iconName="log-in"
                    text="Login with GitHub"
                    onClick={startAuth}
                  />
                  <p className="pt-text-muted">
                    We never send or store your GitHub access token to server!<br />
                    <a href="https://github.com/dittos/diffmonster/blob/716396c/src/lib/GithubAuth.js#L47" target="_blank" rel="noopener noreferrer">
                      It'll be stored inside <code>localStorage</code>.
                    </a>
                  </p>
                </div>
              }
              </ButtonContainer>
            </div>
          </Cards>
        </Container>
      </g.Div>
    );
  }

  _onSubmit = event => {
    event.preventDefault();
    const url = this._urlInput.value;
    const urlMatch = /https?:\/\/github\.com\/(.+?)\/(.+?)\/pull\/([0-9]+)/.exec(url);
    if (urlMatch) {
      const [, owner, repo, number] = urlMatch;
      this.props.history.push(`/${owner}/${repo}/pull/${number}`);
    } else {
      const shorthandMatch = /(.+?)\/(.+?)#([0-9]+)/.exec(url);
      if (shorthandMatch) {
        const [, owner, repo, number] = shorthandMatch;
        this.props.history.push(`/${owner}/${repo}/pull/${number}`);
      } else {
        alert('Invalid format :(');
      }
    }
  };
}
