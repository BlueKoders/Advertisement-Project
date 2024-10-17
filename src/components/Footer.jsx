

const Footer = () => {
  return (
    <div className="flex font-sans mt-7 w-full">
      <div className="bg-gray-300">
        <h3 className="mt-4">Shop at shop Online for a seamless and convient buying experience</h3>
        <h2 className="mt-6">NEED HELP?</h2>
        <div className="mt-2 ">
          <img src="./src/assets/images/icon_contact.png" alt="image" />
          <div className="ml-7"> 
            <h5 className="mt-2 font-bold">+233 59 236 1232(8am -5pm)</h5>
            <h5 className="mt-2 font-bold">+233 54 456 9999(5pm till 8am)</h5>
          </div>
        </div>
        <div className="flex mt-9 ml-3">
          <img src="./src/assets/images/insta.png" alt="image" />
          <img src="./src/assets/images/facebook.png" alt="image" />
          <img src="./src/assets/images/linked.png" alt="image" />
          <img src="./src/assets/images/twitter.png" alt="image" />
        </div>
      </div>
      <div className="bg-gray-400">
        <h2 className="text-xl font-bold mb-6">Information</h2>
        <div>
          <h2 className="mt-2">Privacy Policy</h2>
          <h2 className="mt-2">Return & Warranty Policy</h2>
          <h2 className="mt-2">Terms and Conditions</h2>
        </div>
      </div>
      <div className="bg-gray-400">
        <h2 className="text-xl font-bold mb-6"> Company</h2>
        <div className="">
        <h4 className="mt-2">About us</h4>
        <h4 className="mt-2">Corporate Website</h4>
        <h4 className="mt-2">Store Finder</h4>
        </div>

        <div className="mt-56">
          <img src="/src/assets/images/viisa.png" alt="image" />
          
        </div>
      </div>

    </div>
  )
}

export default Footer;