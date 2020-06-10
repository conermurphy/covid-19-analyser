import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: space-between;
  width: 100%;
  background-color: ${props => (props.coloured ? props.theme.primary : props.theme.coloured)};
  padding: 2.5rem 0;
  padding-top: 1rem;
  box-shadow: ${props => props.theme.bs};
  position: relative;

  * {
    flex: 1 1 0;
  }

  ::before {
    content: '';
    display: ${props => (props.beforeEl ? 'flex' : 'none')};
    width: 100%;
    max-height: 300px;
    height: 30%;
    top: -30%;
    position: absolute;
    background: url("data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 300' fill='rgb(242,241,249)' preserveAspectRatio='none'>
      <path width='1920px' height='300px' d='
      M -100 300 
      C 200 50 300 0 600 200 
      S 800 0 1200 200 
      S 1500 -200 2000 300
      Z
      '/>
      </svg>")
      no-repeat;
    z-index: -1;
    filter: drop-shadow(0px -5px 15px rgba(12, 12, 12, 0.15));
  }
`;

const TextContent = styled.div`
  padding-left: ${props => (props.left ? '15rem' : 0)};
  padding-right: ${props => (props.right ? '15rem' : 0)};
  text-align: ${props => (props.right ? 'right' : 'left')};
  max-width: 40%;
`;

const HomeCanvas = styled.canvas`
  width: 50%;
  max-width: 70%;
  background-color: blue;
  margin: auto;
  z-index: 2;
`;

const CovidCanvas = styled.canvas`
  width: 400px;
  height: 400px;
  max-width: 400px;
  background-color: blue;
  margin: auto;
`;

const Home = props => (
  <PageContainer>
    <ContentSection>
      <HomeCanvas id="homeChart"></HomeCanvas>
    </ContentSection>
    <ContentSection coloured beforeEl>
      <TextContent left>
        <h2>COVID-19</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas ut
          laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum. Sed
          sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi. Sed tincidunt consequat felis, nec tristique nisl
          malesuada tincidunt. Morbi pretium turpis et dolor venenatis fermentum. In hac habitasse platea dictumst. Vestibulum posuere enim
          elit, id consectetur sem varius eget. In nunc nibh, vehicula ut purus eu, laoreet maximus dolor. Fusce suscipit elementum eros. In
          consequat vitae risus laoreet rhoncus. Donec placerat, nisl ut ornare vulputate, mauris felis congue turpis, in commodo metus
          mauris ut ligula. Suspendisse vitae tortor lacus. Suspendisse at sem ac arcu tristique scelerisque id vitae lorem.{' '}
        </p>
      </TextContent>
      <CovidCanvas id="covidChart"></CovidCanvas>
    </ContentSection>
    <ContentSection>
      <CovidCanvas id="covidChart"></CovidCanvas>
      <TextContent right>
        <h2>About</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas ut
          laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum. Sed
          sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi. Sed tincidunt consequat felis, nec tristique nisl
          malesuada tincidunt. Morbi pretium turpis et dolor venenatis fermentum. In hac habitasse platea dictumst. Vestibulum posuere enim
          elit, id consectetur sem varius eget. In nunc nibh, vehicula ut purus eu, laoreet maximus dolor. Fusce suscipit elementum eros. In
          consequat vitae risus laoreet rhoncus. Donec placerat, nisl ut ornare vulputate, mauris felis congue turpis, in commodo metus
          mauris ut ligula. Suspendisse vitae tortor lacus. Suspendisse at sem ac arcu tristique scelerisque id vitae lorem.{' '}
        </p>
      </TextContent>
    </ContentSection>
    <ContentSection coloured column beforeEl>
      <TextContent style={{ textAlign: 'center', width: '50%', margin: 'auto' }}>
        <h2>Examples</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas ut
          laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum. Sed
          sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi.
        </p>
      </TextContent>
      <div style={{ display: 'flex', flexDirection: 'row', width: '75%', margin: 'auto' }}>
        <CovidCanvas id="covidChart"></CovidCanvas>
        <CovidCanvas id="covidChart"></CovidCanvas>
        <CovidCanvas id="covidChart"></CovidCanvas>
      </div>
    </ContentSection>
  </PageContainer>
);

export default Home;
