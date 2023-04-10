import { Button } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons';
type BackbtnProps = {
  handelNextBtn?: () => void;
  nextDisabled?: boolean,
  backButton?: () => void
};

export default function BackandNextButton(props: BackbtnProps) {
  const { handelNextBtn, nextDisabled, backButton } = props;
  return (
    <div className="flex  px-8 gap-6 justify-between">
      <Button
        leftIcon={<IconChevronLeft />}
        variant="outline"
        color="#228BE6"
        onClick={backButton}
      >
        Back
      </Button>
      <Button disabled={nextDisabled} rightIcon={<IconChevronRight />} onClick={handelNextBtn} type='submit'>
        Next
      </Button>
    </div>
  );
}
