import React,{useState} from 'react'
import { Button, Divider, Modal, Text, Title } from '@mantine/core'
import { AddButton } from '../../../utils/AddButton'
import { useMediaQuery } from '@mantine/hooks';
import { AddTrasportationCost } from './AddTrasportationCost';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AddVehicleCost } from './AddVehicleCost';
import { AddCostPerKM } from './AddCostPerKM';


export const TransportContent = ({ activeTab }: { activeTab: string }) => {
    const mediaQuery = useMediaQuery('(min-width: 640px)');
    const [modal, setModal] = useState(false)
    const [editDetails, setEditDetails] = useState<any>(null)
    const { cost } = useSelector((state: RootState) => state.category)
        console.log(cost);
        
    return (
        <div className='pt-5 sm:p-5 bg-white sm:mb-5 space-y-10 rounded-2xl min-h-[70vh]'>
            <div className='grid grid-cols-3'>
                <div></div>
                <Title className='self-center text-sm sm:text-xl' align='center' color="#0A2540" order={3}>Transportation</Title>
                <div className='justify-self-center'>
                    <AddButton size={!mediaQuery ? "xs" : "md"} onClick={() => setModal(true)} icon={true} text={!mediaQuery ? "Add" : "Add Cost"} />
                </div>
            </div>
            <div>

            </div>
            <Modal
                opened={modal}
                onClose={() => {
                    setModal(false)
                    setEditDetails(null)
                }}
            >
                {activeTab === "Labour cost" && <AddTrasportationCost editDetails={editDetails} activeTab={activeTab} setModal={setModal} />}
                {activeTab === "Vehicle cost" && <AddVehicleCost editDetails={editDetails} activeTab={activeTab} setModal={setModal} />}
                {activeTab === "Cost per km" && <AddCostPerKM editDetails={editDetails} activeTab={activeTab} setModal={setModal} />}
            </Modal>
        </div>
    )
}
