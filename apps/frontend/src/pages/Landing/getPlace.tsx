import {
  ActionIcon,
  Autocomplete,
  Button,
  Loader,
  Modal,
  SelectItemProps,
} from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Popover } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCurrentLocation, IconLocation, IconX } from '@tabler/icons';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from 'use-places-autocomplete';
import { GoogleMap } from '@react-google-maps/api';
import { Tooltip } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { forwardRef, useRef, useState } from 'react';
import MarkerIcon from '../../assets/img/marker.svg';
// import { masterFormType } from '.';
import * as yup from 'yup';
import { GooglePlacesType } from '.';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../environments/environment';
import { useDispatch } from 'react-redux';
import { setFrom, setTo } from '../../store/OrderReducer';
import LocationError from './locationError';

interface ItemProps extends SelectItemProps {
  data: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };
}

export const GetLocation = ({
  placeHolder,
  field,
}: {
  placeHolder: string;
  field: 'from' | 'to';
}) => {
  // const matches = useMediaQuery('(min-width: 1024px)');
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  const mapref = useRef<any>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locErr, setLocErr] = useState(false);
  const form = useForm<GooglePlacesType>({
    initialValues: {
      address1: '',
      address2: '',
      landmark: '',
      data: null,
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    validate: yupResolver(
      yup.object({
        coordinates: yup.object({
          lat: yup.number().required(),
          lng: yup.number().required(),
        }),
        address1: yup.string().required(),
        address2: yup.string().required(),
        landmark: yup.string().required(),
        data: yup.object().required(),
      })
    ),
  });
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'IN' } },
    debounce: 400,
  });
  const dispatch = useDispatch();
  // const getLL = async () => {
  //   console.log(data);

  //   const t = await getGeocode({ address: data[0].description });
  //   console.log(t[0].geometry.location.lat(), t[0].geometry.location.lng());

  //   return t;
  // };
  // console.log(data.length > 0 && getLL());

  if (!ready) return <Loader />;

  return (
    <div>
      <Autocomplete
        required
        autoComplete="new-password"
        name={field}
        autoFocus={field === 'from'}
        value={value}
        disabled={loading}
        placeholder={placeHolder}
        itemComponent={forwardRef<HTMLDivElement, ItemProps>(
          (
            {
              data: { structured_formatting, ...others },
              ...otherProps
            }: ItemProps,
            ref
          ) => (
            <div ref={ref} {...otherProps}>
              <span className="font-bold text-sm">
                {structured_formatting?.main_text}
              </span>
              <div className="text-xs">
                {structured_formatting?.secondary_text}
              </div>
            </div>
          )
        )}
        // classNames={{ input: 'rounded-r-none rounded-xl' }}
        size={'md'}
        onChange={(e) => setValue(e)}
        onItemSubmit={async (e) => {
          try {
            setLoading(true);
            form.setFieldValue('data', e['data']);
            setValue(e['data'].structured_formatting.secondary_text, false);
            clearSuggestions();
            const results = await getGeocode({
              address: e['data'].description,
            });
            const { lat, lng } = getLatLng(results[0]);
            form.setFieldValue('coordinates', { lat, lng });
            setOpen(true);
          } catch (err: any) {
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Error!',
              message: environment.production
                ? 'Unexpected error in saving information! Try again'
                : err.message,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          } finally {
            setLoading(false);
          }
        }}
        rightSection={
          <div className="flex items-center -ml-10">
            {loading ? (
              <Loader size={12} />
            ) : value ? (
              <ActionIcon
                onClick={() => {
                  setValue('');
                  form.reset();
                }}
              >
                <IconX />
              </ActionIcon>
            ) : (
              <>
                <div className="w-7 " />
                <Tooltip label="Detect current location">
                  <ActionIcon
                    onClick={async () => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          async (pos) => {
                            const lat = pos.coords.latitude;
                            const lng = pos.coords.longitude;
                            const newLocationResults = await getGeocode({
                              location: { lat, lng },
                            });
                            setValue(newLocationResults[0].formatted_address);
                            form.setFieldValue('data', newLocationResults[0]);
                            form.setFieldValue('coordinates', { lat, lng });
                            setOpen(true);
                          },
                          (err) => {
                            if (err.code === 1) {
                              setLocErr(true);
                            }
                          }
                        );
                      }
                    }}
                  >
                    <IconCurrentLocation color="#6A6E71" size={25} />
                  </ActionIcon>
                </Tooltip>
              </>
            )}
          </div>
        }
        data={data.map((d: google.maps.places.AutocompletePrediction) => ({
          label: d.structured_formatting.main_text,
          value: d.structured_formatting.main_text,
          data: d,
        }))}
      />

      <Modal
        opened={open}
        onClose={() => {
          form.reset();
          setValue('');
          setOpen(false);
        }}
        fullScreen={!mediaQuery}
        // size={mediaQuery?"400px":"100%"}
      >
        <form
          onSubmit={form.onSubmit((data) => {
            if (field === 'from') dispatch(setFrom(data));
            else dispatch(setTo(data));
            setOpen(false);
          })}
          className="bg-white flex-col flex gap-y-5"
        >
          <div className="w-80 h-80 mx-auto">
            {
              <GoogleMap
                zoom={18}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                center={
                  form.values.coordinates.lat && form.values.coordinates.lng
                    ? form.values.coordinates
                    : indiaCenter
                }
                mapContainerClassName="w-80 h-80 relative"
                ref={mapref}
                onDragEnd={async () => {
                  const lat = mapref.current.state.map.center.lat();
                  const lng = mapref.current.state.map.center.lng();
                  const newLocationResults = await getGeocode({
                    location: { lat, lng },
                  });
                  setValue(newLocationResults[0].formatted_address);
                  form.setFieldValue('data', newLocationResults[0]);
                  form.setFieldValue('coordinates', { lat, lng });
                }}
              >
                {form.values.data && (
                  <span
                    style={{ left: 'calc(50% - 4px', top: 'calc(50% - 4px' }}
                    className="absolute z-10 animate-ping h-2 w-2 rounded-full bg-green-800 opacity-75"
                  />
                )}
                {form.values.data && (
                  <img
                    src={MarkerIcon}
                    alt="map-marker"
                    className={'absolute top-[137px] left-[154px]'}
                  />
                )}
              </GoogleMap>
            }
          </div>
          <div>
            <TextInput
              placeholder="Door/Apartment no, Address,"
              {...form.getInputProps('address1')}
            />
          </div>
          <div>
            <TextInput
              placeholder="Street name / Area"
              {...form.getInputProps('address2')}
            />
          </div>
          <div>
            <TextInput
              placeholder="Landmark"
              {...form.getInputProps('landmark')}
            />
          </div>
          <div>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </Modal>
      <LocationError open={locErr} setOpen={setLocErr} />
    </div>
  );
};

const indiaCenter = {
  lat: 23.512,
  lng: 80.329,
};
