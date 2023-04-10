import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconChevronLeft } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function BackButton({}: Props) {
    const navigate = useNavigate()
    const mediaQuery = useMediaQuery('(min-width: 600px)');
  return (
    <Button variant='outline' onClick={()=>navigate(-1)} >
        <IconChevronLeft />  {mediaQuery?"back":""}
    </Button>
  )
}