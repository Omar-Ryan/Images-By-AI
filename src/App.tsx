import { useState } from "react"; 
import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

function App() {
  const api = "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";
  const [data, setData] = useState({ data: [] }); 
  const [searchInput, setSearchInput] = useState("");

  const getImages = async () => {
    try {
      const methods = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`,
        },
        body: JSON.stringify({
          prompt: searchInput,
          n: 4,
          size: "256x256",
        }),
      };
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        methods
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await res.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    getImages();
    setSearchInput("");
  };
  
  const listImg = data.data || []; 
  console.log(listImg);
  
  return (
    <div className="app">
      <h1>{">>"} AI Images Generator :</h1>
      <Swiper
        className="container"
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        pagination={{ clickable: true }}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          // 996: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {listImg.map((ele , i) => (
          <SwiperSlide key={i} className="box-img">
            <img src={ele.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="box-search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default App;
