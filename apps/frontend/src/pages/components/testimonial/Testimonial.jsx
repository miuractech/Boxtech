import React from "react";
import './testimonial.css';

const Testimonial = () => {
  const details = [
    {
      words:
        "“I had great experience with moving solutions. Moving Solutions they offered best deal at affordable prices.”",
      author: "Rakesh Reddy,",
      company: 'Storehouse'
    },
    {
      words:
        "“ We are extremely happy with the service provided by boxtech.”",
      author: "Tomar Singh,",
      company: 'Parkmerced'
    },
    {
      words:
        "“I would recommend Home Packers and Movers to take away all your worries and sit back and relax while they do all the hard work and take care of transporting all your precious stuff in a very professional way with reasonable pricing.”",
      author: "Ajay Gowda,",
      company: 'Transter'
    },
  ];

  return (
    <div className="md:h-[90vh] w-full h-auto pb-20">
      <div className="p-[5%]">
        <h1 className="text-[30px]">
          What Our <span style={{ color: "#ffbe23" }}>Clients</span> Say?
        </h1>
      </div>
      <div className="flex justify-evenly items-center flex-wrap ">
        {
          details.map(
            (item) => <div id="test-card" className="w-[240px] h-[320px] my-[12px]">
              <div>
                {/** boxes */}
                <div>
                  <span className="small-btns"></span>
                  <span className="small-btns"></span>
                  <span className="small-btns"></span>
                </div>
              </div>
              <div className="h-[200px] " id="words">
                <p className="p-[15px] text-[12px] tracking-[1px] text-justify leading-[22px]">
                  {item['words']}
                </p>
              </div>
              <div id="" className="float-right pr-3">
                <div className="font-semibold">{item['author']}</div>
                <div className="">{item['company']}</div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Testimonial;
