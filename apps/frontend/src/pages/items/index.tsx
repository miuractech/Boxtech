import { Container, Text } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackandNextButton from '../../component/BackandNextButton';
import { RootState } from '../../store';
import CategoryBar from './CategoryBar';

export default function Items() {
    const { selectedItems, from, to } = useSelector((state:RootState)=>state.order)
    const navigate = useNavigate();
    const params = useParams()
    console.log(from, to);
    
  return <Container fluid className="max-w-screen-2xl py-6 lg:p-6">
  <Text color={'#222629'} weight={'bolder'} className="text-2xl text-center ">
    Choose Your Items
  </Text>
  <div className=" w-full mt-1 md:w-3/5 mx-auto">
    <CategoryBar />
    {/* <MyList /> */}
  <div className="mt-5">
    <BackandNextButton nextDisabled={selectedItems.length === 0} handelNextBtn={()=>{
        navigate(`/${params['clientId']}/list`);
    }} />
  </div>
  </div>
</Container>
}
