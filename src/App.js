import './App.scss';
// import Body from './components/body/body';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Table from "../src/components/body/table";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./redux/actions";


function App(props) {
  useEffect(() => {
    props.getFish();
  });

  const { fishData, addFish } = props;

  return (
    <div className="App">
      <Header />
      {/* <Body /> */}
      <Table data={fishData} addFishData={addFish} />
      <Footer />

    </div>
  );
}

const mapStateToProps = (state) => ({
  fishData: state.fishData,
});

export default connect(mapStateToProps, actions)(App);
