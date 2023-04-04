import React, { useEffect, useState } from "react";
import './services.css';
import { FeaturesAsymmetrical } from "./featureCard";
import { Text, Transition } from "@mantine/core";
import { useInView } from "react-intersection-observer";

const Services = () => {

  const [first, setfirst] = useState(false)
  const [ref, inView] = useInView({
    /* Optional options */
    triggerOnce: true,
    rootMargin: '0px 0px',
  })

  useEffect(() => {
    if (inView) {
      setfirst(true)
    }
  }, [inView])

  return (
    <div className="w-full h-auto p-[5%] py-0" id="#products">
      <div className="p-[6%]">
        <div className="">
          <Transition mounted={first} transition="slide-left" duration={2000} timingFunction="ease">
            {(styles) => <div style={styles} className="px-14 mb-16">
              <h1>
                What <span style={{ color: "#ffbe23" }}>We Offer?</span>
              </h1>
              <Text className="text-gray-500 max-w-xl">
                Software that can manage packing and moving business. Let your
                customers select their valuables to be shifted and schedule a pickup
                and pay online.
              </Text>
            </div>}
          </Transition>
          <div ref={ref} />
          <div className="">
            <FeaturesAsymmetrical first={first} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
