import React from 'react';
import { Primitive, theme } from '@opuscapita/oc-cm-common-layouts';
import styled, { ThemeProvider } from 'styled-components';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
// app imports
import ExampleComponent from '../components/example.component';
import GithubLogo from '../images/logo-github.svg';

const Container = styled.div`
  padding: ${props => props.theme.gutterWidth};
  > header {
    display: flex;
      padding: ${props => props.theme.gutterWidth} 0;
  }
`;

const Panel = styled.div`
  background: #fff;
  padding: 2rem;
`;

const Title = styled(Primitive.Title)`
  flex: 1;
`;
export default () => (
  <ThemeProvider theme={theme}>
    <Container>
      <header>
        <Title>Hierarchy selector</Title>
        <GithubLogo />
      </header>
      <Panel>
        <ExampleComponent />
      </Panel>
      <OCAlertsProvider />
    </Container>
  </ThemeProvider>
);
