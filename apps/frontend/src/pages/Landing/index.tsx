import {
  CatergoryType,
  HouseType,
  HouseTypes,
  houseConfigNames,
} from '@boxtech/shared-constants';
import {
  Button,
  Center,
  Divider,
  Image,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import HeroImg from '../../assets/img/Hero.jpg';
import { costDetailsType } from '../../store/OrderReducer';
import { GetLocation } from './getPlace';
import { db } from '../../configs/firebaseconfig';
import india from '../../assets/img/india.png';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getDoc } from 'firebase/firestore';
import { QuotationDataType } from '../Quoatation/priceCalculation';
import truck1BHK from '../../assets/img/1bhk-truck.png';
import truck2BHK from '../../assets/img/2bhk-truck.png';
import truck3BHK from '../../assets/img/3bhk-truck.png';
import truck4BHK from '../../assets/img/4bhk-truck.png';
const schema = yup
  .object()
  .shape({
    from: yup.object().required('Requried'),
    to: yup.object().required('Requried').typeError('Select a valid address'),
    config: yup.string().min(1).required('Requried'),
    phoneNumber: yup
      .number()
      .positive()
      .integer()
      .min(6000000000, 'Invalid mobile number')
      .max(9999999999, 'Invalid mobile number')
      .test('len', 'Must be exactly 10 characters', (val) => {
        if (val) return val.toString().length === 10;
        return false;
      })
      .required('Mobile number cannot be empty'),
  })
  .required();

export default function Landing({ setClientData }: { setClientData: any }) {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const form = useForm<{
    from: string | GooglePlacesType;
    to: string | GooglePlacesType;
    config: houseConfigNames | '';
    phoneNumber: string;
  }>({
    validate: yupResolver(schema),
    initialValues: {
      from: '',
      to: '',
      config: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    (async () => {
      if (clientId) {
        const res = await getDoc(doc(db, 'clients', clientId));
        if (res.exists()) setClientData(res.data());
        else {
          navigate(`/`);
          showNotification({
            id: `reg-err-${Math.random()}`,
            autoClose: 5000,
            title: 'Error',
            message: 'Invalid Link',
            color: 'red',
            icon: <IconX />,
            loading: false,
          });
        }
      }
    })();
  }, [clientId]);

  return (
    <div
      style={{
        background: `url(${HeroImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="w-full h-[650px] sm:min-h-screen"
    >
      <div className="w-full md:w-1/2 h-full">
        <div className="pb-10 md:py-10 flex items-end md:items-center justify-center h-full text-center">
          <div className="w-full">
            <Title order={1} className="text-white text-shadow mb-4">
              Moving Your Valuables!
            </Title>
            <form>
              <div className="bg-white rounded-2xl w-11/12 md:w-96 p-8 mx-auto ">
                <GetLocation
                  placeHolder="Enter Pickup Location"
                  field="from"
                  landingForm={form}
                />
                <Divider
                  orientation="vertical"
                  color={'dark'}
                  className="h-9 w-1 ml-8 border-l-2"
                />
                <GetLocation
                  placeHolder="Enter Drop Location"
                  field="to"
                  landingForm={form}
                />
                <Select
                  className={form.values.config ? 'mt-10 mb-5' : 'my-10'}
                  placeholder="Select Configuration"
                  data={HouseTypes.map((config) => ({
                    value: config,
                    label: config,
                  }))}
                  {...form.getInputProps('config')}
                />
                <div>
                  {form.values.config && (
                    <div className="bg-gray-100 p-4 flex flex-wrap text-center rounded-lg mb-4">
                      <div>
                        <Image
                          width={180}
                          height={120}
                          src={vehicleType[form.values.config].truckImg}
                          alt="With default placeholder"
                          withPlaceholder
                        />
                      </div>
                      <Center className='flex-grow' >
                        <div>
                          <Text size={14} weight={700}>
                            {form.values.config}
                          </Text>
                          <Text size={14}>
                            {vehicleType[form.values.config].name}
                          </Text>
                          <Text size={20}>
                            {vehicleType[form.values.config].size}
                          </Text>
                        </div>
                      </Center>
                    </div>
                  )}
                </div>
                <TextInput
                  placeholder="Enter Phone Number"
                  type="number"
                  name="phone"
                  icon={<img src={india} alt="in" className="w-full px-2" />}
                  {...form.getInputProps('phoneNumber')}
                />
                <Button
                  className="mt-10"
                  fullWidth
                  onClick={async () => {
                    try {
                      if (form.validate().hasErrors) {
                        const keys = Object.keys(form.errors);
                        if (keys.length === 0) return;
                        showNotification({
                          id: `reg-err-${Math.random()}`,
                          autoClose: 5000,
                          title: 'Error',
                          message: form.errors[keys[0]],
                          color: 'red',
                          icon: <IconX />,
                          loading: false,
                        });
                      } else {
                        if (!clientId) return;
                        await addDoc(collection(db, 'Orders'), {
                          directions: form.values,
                          status: 'geoDetected',
                          phoneNumber: `+91${form.values.phoneNumber}`,
                          clientId: clientId,
                          createdAt: serverTimestamp(),
                        }).then((doc) => {
                          navigate(`/order/${doc.id}`);
                        });
                      }
                    } catch (error) {
                      showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Error',
                        message: 'Something went wrong try again',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                      });
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export type GooglePlacesType = {
  [x: string]: any;
  coordinates: {
    lat: null | number;
    lng: null | number;
  };
  placeId: null | string;
  addressLine: string;
  address1: string;
  address2: string;
  landmark: string;
};

export type masterFormType = {
  from: GooglePlacesType;
  to: GooglePlacesType;
  config: string;
  // selectedItems: categoryItemType[];
  hasLiftFacility: boolean;
  floorNumber: number;
  transportationCost: number;
  costDetails: costDetailsType;
  insurance: number | null;
  userInfo: userInfoType;
  quotation: QuotationDataType | null;
};

export type userInfoType = {
  name: string;
  phone: string;
  email: string;
};
export interface categoryItemType extends CatergoryType {
  quantity: number;
  total: number;
}

const vehicleType = {
  '1 BHK': { truckImg: truck1BHK, size: '6ft - 8ft', name: 'Small Tempo' },
  '2 BHK': { truckImg: truck2BHK, size: '12ft - 16ft', name: 'Medium Carrier' },
  '3 BHK': { truckImg: truck3BHK, size: '22ft - 24ft', name: 'Truck' },
  '4 BHK & more': {
    truckImg: truck4BHK,
    size: '32ft - 40ft',
    name: 'Large Truck',
  },
};
