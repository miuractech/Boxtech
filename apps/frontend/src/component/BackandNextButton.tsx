import { Button } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
type BackbtnProps = {
  handelNextBtn: () => void;
  nextDisabled?:boolean
};

export default function BackandNextButton(props: BackbtnProps) {
  const { handelNextBtn, nextDisabled } = props;
  const navigate = useNavigate();
  return (
    <div className="flex  px-8 gap-6 justify-between">
      <Button
        leftIcon={<IconChevronLeft />}
        variant="outline"
        color="#228BE6"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Button disabled={nextDisabled} rightIcon={<IconChevronRight />} onClick={handelNextBtn}>
        Next
      </Button>
    </div>
  );
}
