import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';

function App() {
  return (
    <>
      <Header
        title="My title"
        descr="Some description"
      />
      <Layout
        title="Layout 1 title"
        descr="Layout 1 description"
        urlBg={bg1}
      />
      <Layout
        title="Layout 2 title"
        descr="Layout 2 description"
        colorBg="#e2e2e2"
      />
      <Layout
        title="Layout 3 title"
        descr="Layout 3 description"
        urlBg={bg3}
      />
      <Footer />
    </>
  );
}

export default App;
