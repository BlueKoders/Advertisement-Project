import React from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const About = () => {
    return (
        <div>
            <Navbar />
            <div>
                <h2 className='font-bold text-3xl text-indigo-800 mt-16 ml-9'>About Us</h2>
                <p className="font-medium text-pretty text-xl text-indigo-300 mt-6 mb-9 leading-loose">
                    BlueKoders is Ghana's largest website developer group. Established in 2024 with skilled professionals ready to deliver just-in-time services to clients nationwide. Our Head Office is located at 2nd Palace Link Road, North Industrial Area, Accra-Ghana. EduExpress, (subsidiary of BlueKoders) an educational advertisement website where business owners, schools, and individuals can purchase educational materials at an affordable price and on-time delivery function. This website is flexible and consists of products from:
                    <br />
                    - Stationery
                    <br />
                    - Play toys
                    <br />
                    - Electronics
                    <br />
                    - Supermarkets
                    <br />
                    - Cleaning materials
                    <br />
                    - And many more.............
                </p>
                <div className="font-medium text-pretty text-xl text-indigo-300 mb-9 leading-loose">
                <h4>Great service with a smile</h4>
                <h4>Unbeatable value for money</h4>
                <h4>Quality merchandise</h4>
                <h4> The largest variety of goods under one roof.</h4>       
                </div>
                
                <div>
                    <h1 className='font-bold text-4xl text-indigo-800 mb-11 ml-96' >Our Professionals</h1>
                    <div className='font-bold text-2xl text-indigo-300'>
                        <h1>UI/UX Designers/FRONT-end Developers </h1>
                        <div className='flex'>
                            <img src="/src/assets/images/E.png" alt="image" />
                            <img src="/src/assets/images/Te.png" alt="image" />
                            <img src="/src/assets/images/kor.png" alt="image" />
                        </div>
                    </div>

                    <div className='font-bold text-2xl text-indigo-300'>
                        <h1>BACK-end Developers </h1>
                        <div className='flex ml-64'>
                            <img src="/src/assets/images/dela.png" alt="image" />
                            <img src="/src/assets/images/davida.png" alt="image" />
                        
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default About;