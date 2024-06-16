import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../Categories/Categories";
import DatePicker from "./DatePicker";
import PriceRangePicker from "./PriceRangePicker";
import { format, isBefore } from 'date-fns';
import { places } from "../Cards/PlacesData";
import CardPage from "../Cards/CardPage";
import logo from "../../assets/logo.webp";
import user from "../../assets/user.jpg";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
  const [showPriceRangePicker, setShowPriceRangePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  const navigate = useNavigate();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    if(inputValue === ""){
      setSuggestions([]); 
    } 
    else{
      const filteredSuggestions = [...new Set(
        places
            .map(place => place.region)
            .filter((region) =>
                region.toLowerCase().includes(inputValue.toLowerCase())
            )
      )];
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]); 
  };

  const handleSelectCheckInDate = (date) => {
    setCheckInDate(format(date, 'MM/dd/yyyy'));
    setShowCheckInDatePicker(false);
    setError("");
  };

  const handleSelectCheckOutDate = (date) => {
    const formattedDate = format(date, 'MM/dd/yyyy');
    if(checkInDate && isBefore(date, new Date(checkInDate))){
      setError("Check-out date must be after check-in date");
      setShowErrorPopup(true);
      setShowCheckOutDatePicker(false);
    } 
    else{
      setCheckOutDate(formattedDate);
      setShowCheckOutDatePicker(false);
      setError("");
      setShowErrorPopup(false);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleSearchClick = () => {
    if (search || priceRange.min !== 0 || priceRange.max !== 1000) {
      const filtered = places.filter((item) => {
        return (
          (item.region.toLowerCase().includes(search.toLowerCase())) &&
          (item.price >= priceRange.min &&
          item.price <= priceRange.max)
        );
      });
      setSearch("");
      setCheckInDate("");
      setCheckOutDate("");
      setPriceRange({ min: 0, max: 1000 });
      setSuggestions([]);
      setFilteredPlaces(filtered);
      setShowPriceRangePicker(false);
    }
  };

  const handlePriceRangeSubmit = (minPrice, maxPrice) => {
    setPriceRange({ min: parseInt(minPrice), max: parseInt(maxPrice) });
    setShowPriceRangePicker(false);
  };

  const handleResetClick = () => {
    setFilteredPlaces(places);
    setSearch("");
    setCheckInDate("");
    setCheckOutDate("");
    setPriceRange({ min: 0, max: 1000 });
    setSuggestions([]);
    setShowPriceRangePicker(false);
  };
  
  const labels = isLoggedIn ?
    [
      { name: "My favorite", onClick: () => navigate("/favorites") },
      { name: "Logout", onClick: handleLogout },
    ] :
    [
      { name: "Login", onClick: () => navigate("/login") },
      { name: "Signup", onClick: () => navigate("/signup") },
    ]

  return (
    <div className="py-4">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <img
            src={logo}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="100"
            width="100"
          />
          <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="Destination"
                className="text-sm font-semibold text-neutral-400 px-6 outline-none"
               />
               <div
                className="text-sm hidden text-neutral-400 sm:block font-semibold border-x-[1px] flex-1 text-center px-3"
                onClick={() => setShowCheckInDatePicker(!showCheckInDatePicker)}
                >
                {checkInDate || "Check-in"}
               </div>
               <div
                className="text-sm hidden text-neutral-400 sm:block font-semibold border-x-[1px] text-center px-3"
                onClick={() => setShowCheckOutDatePicker(!showCheckOutDatePicker)}
                >
                {checkOutDate || "Check-out"}
              </div>
              {showErrorPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                  <div className="flex flex-col items-center justify-center bg-white border rounded-lg shadow-lg p-4">
                    <p className="text-red-500 text-sm">{error}</p>
                    <button
                      className="px-4 py-2 bg-rose-500 text-white rounded mt-2"
                      onClick={handleCloseErrorPopup}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              )}
              <div className="text-sm pl-6 pr-2 font-semibold flex flex-row items-center gap-3">
                <div onClick={() => setShowPriceRangePicker(true)}
                  className="hidden sm:block text-neutral-400 cursor-pointer relative"
                >
                  Price
                </div>
                <div onClick={handleSearchClick} className="p-2 bg-rose-500 rounded-full text-white">
                  <BiSearch size={18} />
                </div>
              </div>
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute mt-2 w-auto bg-white rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {showCheckInDatePicker && <DatePicker onSelectDate={handleSelectCheckInDate} />}
            {showCheckOutDatePicker && <DatePicker onSelectDate={handleSelectCheckOutDate} />}
            {showPriceRangePicker && (
                  <div>
                    <PriceRangePicker onSubmit={handlePriceRangeSubmit} />
                  </div>
                )}
          </div>
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={() => {}}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
              >
                Airbnb your home
              </div>
              <div
                onClick={toggleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center rounded-full hover:shadow-md transition cursor-pointer"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  <img
                    src={user}
                    alt="User"
                    className="rounded-full"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                  <>
                    {labels.map((label, index) => (
                      <div
                        key={index}
                        onClick={label.onClick}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        {label.name}
                      </div>
                    ))}
                  </>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    <Categories />
    <div className="mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pb-10 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
        {filteredPlaces.map((item) => (
          <CardPage
            key={item.place}
            image={item.image}
            region={item.region}
            country={item.country}
            place={item.place}
            price={item.price}
            weather={item.weather}
          />
        ))}
      </div>
    </div>
    {filteredPlaces.length !== places.length && (
      <div className="flex items-center justify-center">
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded mt-2 md:mt-0 ml-2"
          onClick={handleResetClick}
        >
          <ImCross />
        </button>
      </div>
    )}
  </div>
  );
};

export default Navbar;
