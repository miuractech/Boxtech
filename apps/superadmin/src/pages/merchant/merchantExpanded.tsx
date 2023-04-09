import { KYCType, generalInfo } from '@boxtech/shared-constants';
import {
  Avatar,
  Card,
  Collapse,
  Divider,
  LoadingOverlay,
  Title,
} from '@mantine/core';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { db } from '../../configs/firebaseconfig';
import { IconLink } from '@tabler/icons';

type Props = {
  data: generalInfo;
};

export default function MerchantExpanded({ data }: Props) {
  const [kycData, setKycData] = useState<KYCType | null | undefined>(undefined);
  const fetchData = useCallback(async () => {
    if (data.clientId) {
      const kycDoc = doc(collection(db, 'kyc'), data.clientId);
      const kycSnapshot = await getDoc(kycDoc);
      if (kycSnapshot.exists()) setKycData(kycSnapshot.data() as KYCType);
      else setKycData(null);
    }
  }, [data.clientId]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Collapse in={true}>
      <div className="grid gap-3 md:grid-cols-2 grid-cols-1">
        <LeftColumn data={data} />
        <RightColumn data={kycData} />
      </div>
      <Divider />
    </Collapse>
  );
}

const LeftColumn = ({ data }: Props) => {
  return (
    <div className="flex flex-col h-full col-span-1">
      <div className="h-full rounded-2xl">
        <div className="h-full py-10 ">
          <Card shadow="md">
            <Avatar
              className="mx-auto"
              src={data.logo}
              alt="Company Logo"
              size={90}
            />
            <h1 className="text-base font-semibold mt-4 text-center text-[#0A2540]">
              {data.corporateName}
            </h1>
            <p className="text-lg mt-2 text-center">{data.brandName}</p>
            <div className="flex mt-4 items-center">
              <p className={fieldClassname}>Phone</p>
              <p className={valueClassname}>{data.phone}</p>
            </div>
            <div className="flex mt-2 items-center">
              <p className={fieldClassname}>Whatsapp</p>
              <p className={valueClassname}>{data.phone}</p>
            </div>
            <div className="flex mt-2 items-center">
              <p className={fieldClassname}>Email</p>
              <p className={valueClassname}>{data.officialMail}</p>
            </div>
            <div className="flex mt-2 items-center">
              <p className={fieldClassname}>Address</p>
              <p className={valueClassname}>{data.address}</p>
            </div>
            <div className="flex mt-2 items-center">
              <p className={fieldClassname}>Pincode</p>
              <p className={valueClassname}>{data.pincode}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const RightColumn = ({ data }: { data: KYCType | null | undefined }) => {
  if (data === undefined) return <LoadingOverlay visible={true} />;
  else if (!data)
    return (
      <div className="col-span-1 flex flex-col h-full px-4 py-10 rounded-2xl">
        KYC not completed
      </div>
    );
  return (
    <div className="col-span-1 flex flex-col h-full">
      <div className="h-full rounded-2xl">
        <div className="h-full py-10 ">
          <Card shadow="md">
            <a
              href="https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do"
              target="_blank"
              rel="noreferrer"
            >
              <div className="text-xl font-semibold mt-4 text-center text-[#0A2540]">
                {' '}
                <IconLink />
                COI Details
              </div>
            </a>
            <br />
            <div className={itemClassName}>
              <p className={fieldClassname}>Legal Name</p>
              <p className={valueClassname}>{data.legalName}</p>
            </div>
            <div className={itemClassName}>
              <p className={fieldClassname}>CIN/LLP IN No.</p>
              <p className={valueClassname}>{data.cinOrLlpinNo}</p>
            </div>
            <div className=" shadow-md rounded-2xl mx-auto border-gray-300 max-w-xs">
              <img
                className=" w-full rounded-2xl"
                src={data.cinOrLlpinProof}
                alt="Company Logo"
                // size={90}
              />
              <h1 className="text-base pb-4 font-semibold mt-4 text-center text-[#0A2540]">
                {data.cinOrLlpinNo}
              </h1>
            </div>
            <div className={itemClassName}>
              <p className={fieldClassname}>SAC No</p>
              <p className={valueClassname}>{data.sacNumber}</p>
            </div>
            <Divider variant="dashed" />
            <div className="text-xl font-semibold mt-4 text-center text-[#0A2540]">
              PAN Details
            </div>
            <br />
            <div className={itemClassName}>
              <p className={fieldClassname}>PAN No.</p>
              <p className={valueClassname}>{data.panNumber}</p>
            </div>

            <div className=" shadow-md rounded-2xl mx-auto border-gray-300 max-w-xs">
              <img
                className=" w-full rounded-2xl"
                src={data.panProof}
                alt="Company Logo"
                // size={90}
              />
              <h1 className="text-base pb-4 font-semibold mt-4 text-center text-[#0A2540]">
                {data.panNumber}
              </h1>
            </div>
            <Divider variant="dashed" />
            <div className="text-xl font-semibold mt-4 text-center text-[#0A2540]">
              GST Details
            </div>
            <br />
            <div className={itemClassName}>
              <p className={fieldClassname}>GST No.</p>
              <p className={valueClassname}>{data.gstNumber}</p>
            </div>

            <div className=" shadow-md rounded-2xl mx-auto border-gray-300 max-w-xs">
              <img
                className=" w-full rounded-2xl"
                src={data.gstProof}
                alt="Company Logo"
                // size={90}
              />
              <h1 className="text-base pb-4 font-semibold mt-4 text-center text-[#0A2540]">
                {data.gstNumber}
              </h1>
            </div>
            <Divider variant="dashed" />
            <div className="text-xl font-semibold mt-4 text-center text-[#0A2540]">
              Bank Details
            </div>
            <br />
            <div className={itemClassName}>
              <p className={fieldClassname}>Name in Bank</p>
              <p className={valueClassname}>{data.bankName}</p>
            </div>
            <div className={itemClassName}>
              <p className={fieldClassname}>Acc/no.</p>
              <p className={valueClassname}>{data.bankAccountNo}</p>
            </div>
            <div className={itemClassName}>
              <p className={fieldClassname}>IFSC</p>
              <p className={valueClassname}>{data.ifscCode}</p>
            </div>
            <div className=" shadow-md rounded-2xl mx-auto border-gray-300 max-w-xs">
              <img
                className=" w-full rounded-2xl"
                src={data.bankStatement}
                alt="Company Logo"
                // size={90}
              />
              <h1 className="text-base pb-4 font-semibold mt-4 text-center text-[#0A2540]">
                {data.bankAccountNo}
              </h1>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const textColor = ' text-[#4A4A68]';

const fieldClassname = 'w-28 font-semibold' + textColor;
const valueClassname = 'ml-2' + textColor;

const itemClassName = 'flex items-center max-w-xs mx-auto';
