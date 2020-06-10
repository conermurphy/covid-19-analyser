import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.section`
  display: grid;
  grid-template-rows: repeat(${props => (props.rowNum ? props.rowNum : 1)}, auto);
  grid-template-columns: repeat(${props => (props.colNum ? props.colNum : 1)}, 1fr);
  justify-content: center;
  width: 100%;
  background-color: ${props => (props.coloured ? props.theme.primary : props.theme.coloured)};
  padding: 2rem 0;
  box-shadow: ${props => props.theme.bs};
`;

const TextContent = styled.div`
  padding-left: ${props => (props.left ? '25%' : 0)};
  padding-right: ${props => (props.right ? '25%' : 0)};
  text-align: ${props => (props.right ? 'right' : 'left')};
`;

const HomeCanvas = styled.canvas`
  width: 75%;
  background-color: blue;
  margin: auto;
`;

const CovidCanvas = styled.canvas`
  width: 400px;
  height: 400px;
  background-color: blue;
  margin: auto;
`;

const Home = props => (
  <PageContainer>
    <ContentSection colNum="1">
      <HomeCanvas id="homeChart"></HomeCanvas>
    </ContentSection>
    <ContentSection coloured colNum="2">
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
    <ContentSection colNum="2">
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
    <ContentSection coloured rowNum="2">
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
