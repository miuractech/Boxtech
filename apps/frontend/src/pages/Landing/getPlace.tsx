import {
    ActionIcon,
    Autocomplete,
    Button,
    Loader,
  } from '@mantine/core';
  import { useMediaQuery } from '@mantine/hooks';
  import { IconCurrentLocation, IconX } from '@tabler/icons';
  import usePlacesAutocomplete from 'use-places-autocomplete';

  export const GetLocation = (
//     {
//     // form,
//     field,
//   }: {
//     form: UseFormReturnType<{
//       from: string;
//       to: string;
//       config: string;
//     }>;
//     field: string;
//   }
  ) => {
    const matches = useMediaQuery('(min-width: 1024px)');
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({ requestOptions: {componentRestrictions:{country:"IN"}}, debounce: 400 });
    // console.log(data);
    //   console.log(value);
    //   console.log(status, data);
    if (!ready) return <Loader />;
    return (
      <Autocomplete
        required
        // label={`Moving ${field.at(0)?.toUpperCase() + field.substring(1)}`}
        name="pincode"
        // className="col-span-12 "
        value={value}
        placeholder="Search here"
        // classNames={{ input: 'rounded-r-none rounded-xl' }}
        size={matches ? 'md' : 'sm'}
        onChange={(e) => setValue(e)}
        // onItemSubmit={(e) => form.setFieldValue(field, e['data'])}
        rightSection={
          <div className="flex items-center -ml-10">
            {value ? (
              <ActionIcon onClick={() => setValue('')}>
                <IconX />
              </ActionIcon>
            ) : (
              <div className="w-7 " />
            )}
            {!value ? (
              <Button
                classNames={{ root: 'rounded-l-none rounded-xl' }}
                className="col-span-2"
                size={matches ? 'md' : 'sm'}
              >
                <IconCurrentLocation />
              </Button>
            ) : (
              ''
            )}
          </div>
        }
        data={data.map((d) => ({
          label: d.description,
          value: d.description,
          data: d,
        }))}
      />
    );
  };
  