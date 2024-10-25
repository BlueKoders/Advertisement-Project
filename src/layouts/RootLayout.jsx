import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const RootLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;