import React from 'react';
// import { ErrorMessage, useField } from 'formik';
export default function InputUserInfo(props: any) {
  // const [field, meta] = useField(props);
  const { type } = props;
  return (
    <div className={` items-center align-middle justify-center my-5`}>
      <div className="capitalize mb-1  text-sm md:text-md font-bold text-[##212529] ">
        {props?.title} : 
      </div>
      {/* <div className={`flex-1  `}>
        <input
          className={` text-primary w-full pr-3 border h-12 rounded-md outline-none bg-[#F8F9FA] pl-5  focus:border-blue-color focus:border-[#1876f2] ${
            meta.touched && meta.error ? 'border-[#F03E3E] text-[#F03E3E]' : ''
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && (
          <div className="text-sm   text-[#F03E3E]">
            <ErrorMessage name={field.name} />
          </div>
        )}
      </div> */}
    </div>
  );
}
