import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/NavBar";




const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <Navbar/>
        {children}
        <Footer/>    
        </>
    );
};

export default CommonLayout;